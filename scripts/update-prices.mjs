/* =========================================================
   Vun Vén — tự cập nhật giá & link affiliate
   ---------------------------------------------------------
   Đọc link sản phẩm gốc trong data/nguon-gia.json, lấy giá mới qua API,
   ghi ra assets/prices.js (trang web đọc file này để hiện giá).

   Biến môi trường (đặt trong GitHub → Settings → Secrets and variables → Actions):
     ACCESSTRADE_TOKEN   (secret)  Access key AccessTrade — pub.accesstrade.vn/accounts/profile
     SHOPEE_APP_ID       (secret)  tuỳ chọn — Shopee Affiliate Open API
     SHOPEE_APP_SECRET   (secret)  tuỳ chọn
     AT_CAMPAIGN_SHOPEE  (variable) tuỳ chọn — campaign_id Shopee trên AccessTrade (bỏ trống: tự tìm)
     AT_CAMPAIGN_LAZADA  (variable) tuỳ chọn — campaign_id Lazada trên AccessTrade (bỏ trống: tự tìm)
   Chạy thử trên máy:  ACCESSTRADE_TOKEN=xxx node scripts/update-prices.mjs --dry
   ========================================================= */
import fs from "node:fs";
import crypto from "node:crypto";

const DRY = process.argv.includes("--dry");
const ONLY = (process.argv.find(a => a.startsWith("--only=")) || "").slice(7);
const env = process.env;
const AT = "https://api.accesstrade.vn";
const SRC = JSON.parse(fs.readFileSync("data/nguon-gia.json", "utf8"));
const OUT = "assets/prices.js";
const prev = (() => { try { const t = fs.readFileSync(OUT, "utf8"); return JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1)); } catch { return { items: {} }; } })();

const sleep = ms => new Promise(r => setTimeout(r, ms));
const num = v => { const n = Math.round(Number(String(v ?? "").replace(/[^\d.]/g, ""))); return n > 0 ? n : null; };
const log = (...a) => console.log(...a);

/* ---------- AccessTrade ---------- */
let lastAt = 0;
async function at(path, { method = "GET", body } = {}) {
  if (!env.ACCESSTRADE_TOKEN) throw new Error("thiếu ACCESSTRADE_TOKEN");
  const wait = 2100 - (Date.now() - lastAt); if (wait > 0) await sleep(wait); // giới hạn ~30 request/phút
  lastAt = Date.now();
  const r = await fetch(AT + path, { method, headers: { Authorization: `Token ${env.ACCESSTRADE_TOKEN}`, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const text = await r.text();
  let j; try { j = JSON.parse(text); } catch { throw new Error(`AccessTrade ${r.status}: ${text.slice(0, 160)}`); }
  if (!r.ok) throw new Error(`AccessTrade ${r.status}: ${text.slice(0, 160)}`);
  return j;
}
const campaignCache = {};
async function campaignId(shop) {
  const fixed = shop === "shopee" ? env.AT_CAMPAIGN_SHOPEE : env.AT_CAMPAIGN_LAZADA;
  if (fixed) return fixed;
  if (campaignCache[shop] !== undefined) return campaignCache[shop];
  const j = await at("/v1/campaigns?approval=successful&limit=100");
  const c = (j.data || []).find(c => `${c.merchant} ${c.name}`.toLowerCase().includes(shop) && c.status === 1);
  campaignCache[shop] = c ? c.id : null;
  log(`  · campaign ${shop}: ${c ? `${c.name} (${c.id})` : "KHÔNG tìm thấy — kiểm tra đã được duyệt chiến dịch chưa"}`);
  return campaignCache[shop];
}
async function atLink(shop, url) {
  const cid = await campaignId(shop); if (!cid) return null;
  const j = await at("/v1/product_link/create", { method: "POST", body: { campaign_id: cid, urls: [url], utm_source: "vunven" } });
  const s = j.data && j.data.success_link && j.data.success_link[0];
  return s ? (s.short_link || s.aff_link) : null;
}
async function atDatafeedPrice(domain, ids) {
  for (const sku of ids.filter(Boolean)) {
    const j = await at(`/v1/datafeeds?domain=${domain}&sku=${encodeURIComponent(sku)}&limit=1`);
    const d = j.data && j.data[0];
    if (d) return { price: num(d.discount) || num(d.price), old: num(d.price) };
  }
  return null;
}

/* ---------- Shopee Affiliate Open API (tuỳ chọn) ---------- */
async function shopeeOpenApi(shopId, itemId) {
  const query = `{productOfferV2(shopId:${shopId},itemId:${itemId},limit:1){nodes{itemId productName price priceMin priceMax offerLink}}}`;
  const payload = JSON.stringify({ query });
  const ts = Math.floor(Date.now() / 1000);
  const sig = crypto.createHash("sha256").update(env.SHOPEE_APP_ID + ts + payload + env.SHOPEE_APP_SECRET).digest("hex");
  const r = await fetch("https://open-api.affiliate.shopee.vn/graphql", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `SHA256 Credential=${env.SHOPEE_APP_ID}, Timestamp=${ts}, Signature=${sig}` }, body: payload });
  const j = await r.json();
  if (j.errors) throw new Error("Shopee API: " + JSON.stringify(j.errors).slice(0, 160));
  const n = j.data && j.data.productOfferV2 && j.data.productOfferV2.nodes[0];
  return n ? { price: num(n.priceMin) || num(n.price), link: n.offerLink } : null;
}

/* ---------- từng sàn ---------- */
const PROVIDERS = {
  async shopee(url, old) {
    const m = url.match(/-i\.(\d+)\.(\d+)/) || url.match(/product\/(\d+)\/(\d+)/);
    if (!m) throw new Error("không đọc được shopId/itemId trong link Shopee (cần link đầy đủ dạng ...-i.123.456)");
    const [, shopId, itemId] = m;
    if (env.SHOPEE_APP_ID && env.SHOPEE_APP_SECRET) {
      const r = await shopeeOpenApi(shopId, itemId);
      if (r) return r;
    }
    const p = await atDatafeedPrice("shopee.vn", [itemId, `${shopId}_${itemId}`]);
    return { ...p, link: old && old.src === url && old.link ? old.link : await atLink("shopee", url) };
  },
  async lazada(url, old) {
    const m = url.match(/-i(\d+)(?:-s(\d+))?/);
    const p = await atDatafeedPrice("lazada.vn", m ? [m[2], m[1]] : []);
    return { ...p, link: old && old.src === url && old.link ? old.link : await atLink("lazada", url) };
  },
  async tiktok(url) {
    const j = await at("/v2/tiktokshop_product_feeds/create_link", { method: "POST", body: { product_url: url, utm_source: "vunven" } });
    const d = j.data || {};
    return { price: num(d.product_price && d.product_price.amount), link: d.aff_short_url || d.aff_url };
  }
};

/* ---------- chạy ---------- */
const items = {};
let ok = 0, fail = 0, kept = 0;
for (const [id, s] of Object.entries(SRC)) {
  if (id.startsWith("_") || (ONLY && id !== ONLY)) continue;
  for (const shop of ["shopee", "lazada", "tiktok"]) {
    const url = (s[shop] || "").trim(); if (!url) continue;
    const old = prev.items && prev.items[id] && prev.items[id][shop];
    try {
      const r = await PROVIDERS[shop](url, old);
      if (!r || !r.price) throw new Error("API không trả về giá");
      (items[id] ||= {})[shop] = { price: r.price, ...(r.old && r.old > r.price ? { old: r.old } : {}), link: r.link || (old && old.link) || url, src: url };
      ok++; log(`✓ ${id} · ${shop}: ${r.price.toLocaleString("vi-VN")}₫`);
    } catch (e) {
      fail++;
      if (old && old.src === url) { (items[id] ||= {})[shop] = old; kept++; }
      log(`✗ ${id} · ${shop}: ${e.message}${old ? " (giữ giá cũ)" : ""}`);
    }
  }
}
log(`\nXong: ${ok} giá mới, ${fail} lỗi (${kept} giữ giá cũ).`);
if (ONLY) { for (const [k, v] of Object.entries(prev.items || {})) if (!(k in items)) items[k] = v; }
if (JSON.stringify(items) === JSON.stringify(prev.items || {})) { log("Giá không đổi — không ghi file."); process.exit(0); }
const now = new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 16) + "+07:00";
const out = `/* File này do script scripts/update-prices.mjs tự tạo — KHÔNG cần sửa tay. */\nwindow.LIVE_PRICES = ${JSON.stringify({ updatedAt: now, items })};\n`;
if (DRY) log("\n[--dry] Không ghi file. Nội dung sẽ ghi:\n" + out.slice(0, 1500));
else { fs.writeFileSync(OUT, out); log(`Đã ghi ${OUT}`); }
