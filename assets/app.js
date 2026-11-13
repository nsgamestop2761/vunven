/* =========================================================
   Vun Vén — giao diện dùng chung (header, footer, thẻ sản phẩm)
   ========================================================= */
const ICON = {
  search: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  heart: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-9.3-9.2C1.4 7.4 3.6 4 7 4c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8C19.5 15.4 12 20 12 20z"/></svg>',
  menu: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  mail: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  check: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  user: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  shield: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3z"/><path d="m8.5 12 2.5 2.5 4.5-5" stroke-linecap="round"/></svg>',
  book: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M4 21a2 2 0 0 1 2-2h13v2H6"/><path d="M9 7h6M9 11h6" stroke-linecap="round"/></svg>',
  tag: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>',
  filter: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>'
};

/* ---------- helpers ---------- */
const fmt = n => n.toLocaleString("vi-VN") + "₫";
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const imgSrc = name => /^https?:|\//.test(name) ? name : `assets/img/${name}.jpg`;
const kfmt = n => n >= 1000 ? (n / 1000).toFixed(1).replace(".", ",").replace(",0", "") + "k" : String(n);
const off = p => p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
const starHTML = (r, cls = "") => `<span class="stars ${cls}" aria-label="${r} trên 5 sao"><i style="width:${r / 5 * 100}%"></i></span>`;
const ALL = PERSONAS.flatMap(per => per.products.map(p => ({ ...p, persona: per.id })));
const productById = id => ALL.find(p => p.id === id);
const personaById = id => PERSONAS.find(p => p.id === id);
const reviewById = id => REVIEWS.find(r => r.id === id);
const shopsOf = p => Object.keys(SHOPS).filter(k => p.link && p.link[k]);
const mainHref = p => p.review ? `review.html?id=${p.review}` : (p.link[shopsOf(p)[0]] || "#");
const isExternal = p => !p.review;
const EXT = 'target="_blank" rel="nofollow sponsored noopener"';

/* ---------- saved (yêu thích) ---------- */
const Saved = {
  get() { try { return JSON.parse(localStorage.getItem("vv-saved") || "[]"); } catch { return []; } },
  set(a) { try { localStorage.setItem("vv-saved", JSON.stringify(a)); } catch {} },
  has(id) { return this.get().includes(id); },
  toggle(id) { const a = this.get(); const i = a.indexOf(id); i < 0 ? a.push(id) : a.splice(i, 1); this.set(a); return i < 0; }
};
function syncSavedCount() { document.querySelectorAll("[data-saved-count]").forEach(el => el.textContent = Saved.get().length || ""); }
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
}
document.addEventListener("click", e => {
  const h = e.target.closest("[data-save]"); if (!h) return;
  e.preventDefault();
  const on = Saved.toggle(h.dataset.save);
  document.querySelectorAll(`[data-save="${h.dataset.save}"]`).forEach(x => { x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
  syncSavedCount();
  toast(on ? "Đã lưu vào mục yêu thích" : "Đã bỏ khỏi mục yêu thích");
});

/* ---------- product card ---------- */
function productCard(p) {
  const shops = shopsOf(p);
  const d = off(p);
  return `
  <article class="pcard">
    <a class="pimg" href="${mainHref(p)}" ${isExternal(p) ? EXT : ""}>
      <img src="${imgSrc(p.img)}" alt="${esc(p.name)}" loading="lazy" width="640" height="640">
      ${p.review ? `<span class="rv-flag">Có bài review</span>` : ""}
    </a>
    <button class="heart ${Saved.has(p.id) ? "on" : ""}" data-save="${p.id}" aria-pressed="${Saved.has(p.id)}" aria-label="Lưu ${esc(p.name)}">${ICON.heart}</button>
    <div class="pbody">
      <a class="ptitle" href="${mainHref(p)}" ${isExternal(p) ? EXT : ""}>${esc(p.name)}</a>
      <div class="rate">${starHTML(p.rating)} <span>(${kfmt(p.reviews)})</span></div>
      <div class="price"><b>${fmt(p.price)}</b>${p.oldPrice ? `<s>${fmt(p.oldPrice)}</s><em>(-${d}%)</em>` : ""}</div>
      <div class="pmeta">${esc(p.shop)}</div>
      ${(p.badge || p.freeship) ? `<div class="badges">${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}${p.freeship ? `<span class="badge ship">Freeship</span>` : ""}</div>` : ""}
      <div class="shopline">Mua tại: ${shops.map(k => `<a href="${esc(p.link[k])}" ${EXT}>${SHOPS[k].name}</a>`).join(" · ")}</div>
    </div>
  </article>`;
}

/* ---------- header & footer ---------- */
function renderChrome(active) {
  const hdr = document.getElementById("site-header");
  if (hdr) hdr.innerHTML = `
  <header class="hdr">
    <div class="wrap hdr-main" style="position:relative">
      <a href="./" class="logo">Vun Vén</a>
      <button class="cat-btn" id="catBtn" aria-expanded="false">${ICON.menu} Danh mục</button>
      <div class="megamenu" id="megamenu">
        ${PERSONAS.map(p => `<a href="danh-muc.html?nhom=${p.id}"><img src="${imgSrc(p.img)}" alt="">${esc(p.name)}</a>`).join("")}
      </div>
      <form class="search" action="danh-muc.html" role="search">
        <label class="sr" for="q">Tìm sản phẩm</label>
        <input id="q" name="q" placeholder="Tìm máy hút sữa, ghế công thái học, tai nghe…" autocomplete="off">
        <button type="submit" aria-label="Tìm">${ICON.search}</button>
      </form>
      <nav class="hdr-act">
        <a href="danh-muc.html?saved=1" aria-label="Đã lưu">${ICON.heart}<span class="lbl">Đã lưu</span><span class="count" data-saved-count></span></a>
        <a href="#nl" aria-label="Nhận deal">${ICON.mail}<span class="lbl">Nhận deal</span></a>
      </nav>
    </div>
    <nav class="navrow"><ul class="wrap">
      <li><a href="danh-muc.html" class="${active === "all" ? "on" : ""}">Tất cả</a></li>
      ${PERSONAS.map(p => `<li><a href="danh-muc.html?nhom=${p.id}" class="${active === p.id ? "on" : ""}">${esc(p.name)}</a></li>`).join("")}
      <li><a href="./#review">Review</a></li>
    </ul></nav>
  </header>`;

  const ftr = document.getElementById("site-footer");
  if (ftr) ftr.innerHTML = `
  <section class="newsletter" id="nl">
    <div class="wrap">
      <h2>Nhận deal hời & review mới mỗi tuần qua email</h2>
      <form class="nl-form" id="nlForm"><input type="email" placeholder="Nhập email của bạn" required aria-label="Email"><button>Đăng ký</button></form>
    </div>
  </section>
  <footer class="ftr">
    <div class="wrap">
      <div class="fcols">
        <div><a href="./" class="logo">Vun Vén</a><p class="about">Gợi ý đồ dùng theo đúng nhu cầu của từng người — từ mẹ bỉm sữa, dân văn phòng đến founder. Chọn kỹ, review thật.</p></div>
        <div><h4>Mua theo nhu cầu</h4><ul>${PERSONAS.slice(0, 5).map(p => `<li><a href="danh-muc.html?nhom=${p.id}">${esc(p.name)}</a></li>`).join("")}</ul></div>
        <div><h4>&nbsp;</h4><ul>${PERSONAS.slice(5).map(p => `<li><a href="danh-muc.html?nhom=${p.id}">${esc(p.name)}</a></li>`).join("")}</ul></div>
        <div><h4>Vun Vén</h4><ul><li><a href="./#review">Bài review</a></li><li><a href="./#cach-chon">Cách tụi mình chọn đồ</a></li><li><a href="danh-muc.html?saved=1">Đồ đã lưu</a></li><li><a href="#nl">Nhận deal qua email</a></li></ul></div>
      </div>
      <div class="disclose">
        <span>Một số liên kết là link tiếp thị liên kết (affiliate): Vun Vén có thể nhận hoa hồng khi bạn mua, bạn không trả thêm đồng nào. Giá mang tính tham khảo.</span>
        <span>© 2026 Vun Vén · Ảnh minh hoạ: Unsplash</span>
      </div>
    </div>
  </footer>`;

  const btn = document.getElementById("catBtn"), mm = document.getElementById("megamenu");
  if (btn) {
    btn.addEventListener("click", e => { e.stopPropagation(); const o = mm.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
    document.addEventListener("click", e => { if (!mm.contains(e.target)) { mm.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });
  }
  const q = new URLSearchParams(location.search).get("q");
  if (q) document.getElementById("q").value = q;
  const nl = document.getElementById("nlForm");
  if (nl) nl.addEventListener("submit", e => { e.preventDefault(); e.target.reset(); toast("Cảm ơn bạn! Deal hời sẽ sớm tới hộp thư."); });
  syncSavedCount();
}

/* =========================================================
   TRANG CHỦ
   ========================================================= */
function initHome() {
  renderChrome("home");
  document.getElementById("circles").innerHTML = PERSONAS.map(p => `
    <a class="circle" href="danh-muc.html?nhom=${p.id}"><span class="ph"><img src="${imgSrc(p.img)}" alt="" loading="lazy"></span>${esc(p.name)}</a>`).join("");

  let cur = PERSONAS[0].id;
  const tabs = document.getElementById("tabs");
  const draw = () => {
    const p = personaById(cur);
    tabs.innerHTML = PERSONAS.map(x => `<button class="tab ${x.id === cur ? "on" : ""}" data-id="${x.id}" role="tab" aria-selected="${x.id === cur}">${esc(x.name)}</button>`).join("");
    document.getElementById("needIntro").innerHTML = `<span><b>${esc(p.name)}:</b> ${esc(p.desc)}</span><a href="danh-muc.html?nhom=${p.id}">Xem tất cả →</a>`;
    document.getElementById("needGrid").innerHTML = ALL.filter(x => x.persona === cur).map(productCard).join("");
  };
  tabs.addEventListener("click", e => { const b = e.target.closest(".tab"); if (b) { cur = b.dataset.id; draw(); } });
  draw();

  const best = [...ALL].filter(p => p.badge === "Bán chạy").sort((a, b) => b.reviews - a.reviews).slice(0, 10);
  document.getElementById("bestGrid").innerHTML = best.map(productCard).join("");

  const deals = [...ALL].filter(p => p.oldPrice).sort((a, b) => off(b) - off(a)).slice(0, 5);
  document.getElementById("dealGrid").innerHTML = deals.map(productCard).join("");

  document.getElementById("posts").innerHTML = REVIEWS.map(r => {
    const p = productById(r.product), per = personaById(p.persona);
    return `<a class="post" href="review.html?id=${r.id}">
      <div class="ph"><img src="${imgSrc(p.img)}" alt="" loading="lazy"></div>
      <div class="b"><span class="kicker">Review · ${esc(per.name)}</span><h3>${esc(r.title)}</h3><p>${esc(r.summary.slice(0, 130))}…</p>
      <div class="m"><span class="score-chip">${r.score}/10</span><span>${r.readTime} phút đọc · ${r.date}</span></div></div></a>`;
  }).join("");
}

/* =========================================================
   TRANG DANH MỤC
   ========================================================= */
function initListing() {
  const params = new URLSearchParams(location.search);
  const st = { nhom: personaById(params.get("nhom")) ? params.get("nhom") : "all", q: (params.get("q") || "").trim(), saved: params.get("saved") === "1", price: "all", shops: [], top: false, ship: false, sale: false, sort: "rel" };
  renderChrome(st.saved ? "" : st.nhom);

  const PRICES = [["all", "Mọi mức giá"], ["lt500", "Dưới 500.000₫"], ["500-2tr", "500.000₫ – 2.000.000₫"], ["gt2tr", "Trên 2.000.000₫"]];
  const priceOk = (v, p) => v === "all" || (v === "lt500" ? p < 5e5 : v === "gt2tr" ? p > 2e6 : p >= 5e5 && p <= 2e6);
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");

  document.getElementById("filters").innerHTML = `
    <div class="fgroup"><h3>Nhu cầu</h3>
      <label><input type="radio" name="nhom" value="all" ${st.nhom === "all" ? "checked" : ""}> Tất cả</label>
      ${PERSONAS.map(p => `<label><input type="radio" name="nhom" value="${p.id}" ${st.nhom === p.id ? "checked" : ""}> ${esc(p.name)}</label>`).join("")}
    </div>
    <div class="fgroup"><h3>Giá</h3>${PRICES.map(([v, l]) => `<label><input type="radio" name="price" value="${v}" ${v === "all" ? "checked" : ""}> ${l}</label>`).join("")}</div>
    <div class="fgroup"><h3>Sàn</h3>${Object.entries(SHOPS).map(([k, s]) => `<label><input type="checkbox" name="shop" value="${k}"> ${s.name}</label>`).join("")}</div>
    <div class="fgroup"><h3>Tuỳ chọn</h3>
      <label><input type="checkbox" name="sale"> Đang giảm giá</label>
      <label><input type="checkbox" name="ship"> Freeship</label>
      <label><input type="checkbox" name="top"> Từ 4,7 sao trở lên</label>
    </div>`;

  const draw = () => {
    const per = personaById(st.nhom);
    const head = document.getElementById("listHead");
    let title = per ? `Đồ cho ${per.name}` : "Tất cả sản phẩm", desc = per ? per.desc : "Toàn bộ sản phẩm được Vun Vén chọn lọc cho 10 nhóm nhu cầu.";
    if (st.q) { title = `Kết quả cho “${st.q}”`; desc = per ? `Trong nhóm ${per.name}.` : "Tìm trong tất cả nhóm."; }
    if (st.saved) { title = "Đồ bạn đã lưu"; desc = "Bấm vào trái tim trên mỗi sản phẩm để lưu lại xem sau. Danh sách lưu trên trình duyệt này."; }
    head.innerHTML = `${per && !st.q && !st.saved ? `<img src="${imgSrc(per.img)}" alt="">` : ""}
      <div><h1>${esc(title)}</h1><p>${esc(desc)}</p>${per && !st.q && !st.saved ? `<div class="chips">${per.needs.map(n => `<span class="chip">${esc(n)}</span>`).join("")}</div>` : ""}</div>`;
    document.getElementById("crumbName").textContent = st.saved ? "Đã lưu" : per ? per.name : "Tất cả";
    document.title = `${title} — Vun Vén`;

    const savedIds = Saved.get();
    let list = ALL.filter(p =>
      (st.nhom === "all" || p.persona === st.nhom) &&
      (!st.saved || savedIds.includes(p.id)) &&
      (!st.q || norm(p.name + " " + personaById(p.persona).name).includes(norm(st.q))) &&
      priceOk(st.price, p.price) &&
      (!st.shops.length || st.shops.some(k => p.link[k])) &&
      (!st.top || p.rating >= 4.7) && (!st.ship || p.freeship) && (!st.sale || p.oldPrice));
    const sorters = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rate: (a, b) => b.rating - a.rating || b.reviews - a.reviews, pop: (a, b) => b.reviews - a.reviews };
    if (sorters[st.sort]) list = [...list].sort(sorters[st.sort]);
    document.getElementById("resultCount").textContent = `${list.length} sản phẩm`;
    document.getElementById("listGrid").innerHTML = list.length ? list.map(productCard).join("")
      : `<div class="empty">${st.saved ? "Bạn chưa lưu món nào." : "Không có sản phẩm phù hợp với bộ lọc."} <br><br><a class="btn" href="danh-muc.html">Xem tất cả sản phẩm</a></div>`;
  };

  document.getElementById("filters").addEventListener("change", e => {
    const t = e.target;
    if (t.name === "nhom") { st.nhom = t.value; const u = new URL(location); t.value === "all" ? u.searchParams.delete("nhom") : u.searchParams.set("nhom", t.value); history.replaceState(null, "", u); document.querySelectorAll(".navrow a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === (t.value === "all" ? "danh-muc.html" : `danh-muc.html?nhom=${t.value}`))); }
    if (t.name === "price") st.price = t.value;
    if (t.name === "shop") st.shops = [...document.querySelectorAll('input[name="shop"]:checked')].map(x => x.value);
    if (["top", "ship", "sale"].includes(t.name)) st[t.name] = t.checked;
    draw();
  });
  document.getElementById("sort").addEventListener("change", e => { st.sort = e.target.value; draw(); });
  document.getElementById("ftoggle").addEventListener("click", () => document.getElementById("filters").classList.toggle("open"));
  draw();
}

/* =========================================================
   TRANG REVIEW (dạng trang chi tiết sản phẩm)
   ========================================================= */
function initReview() {
  const r = reviewById(new URLSearchParams(location.search).get("id")) || REVIEWS[0];
  const p = productById(r.product), per = personaById(p.persona);
  renderChrome(per.id);
  document.title = `${r.title} — Vun Vén`;
  const shops = shopsOf(p), d = off(p);
  const related = ALL.filter(x => x.persona === per.id && x.id !== p.id);

  document.getElementById("app").innerHTML = `
  <div class="wrap">
    <div class="crumbs"><a href="./">Trang chủ</a> › <a href="danh-muc.html?nhom=${per.id}">${esc(per.name)}</a> › Review</div>
    <div class="pdp">
      <div class="gallery">
        <div class="main"><img src="${imgSrc(p.img)}" alt="${esc(p.name)}"></div>
        <button class="heart ${Saved.has(p.id) ? "on" : ""}" data-save="${p.id}" aria-label="Lưu">${ICON.heart}</button>
      </div>
      <div class="buybox">
        ${p.badge ? `<span class="tag">${esc(p.badge)}</span>` : ""}
        <div class="bprice"><b>${fmt(p.price)}</b>${p.oldPrice ? `<s>${fmt(p.oldPrice)}</s><em>Giảm ${d}%</em>` : ""}</div>
        <div class="note">Giá tham khảo, có thể thay đổi theo voucher và thời điểm.</div>
        <h1>${esc(p.name)}</h1>
        <div class="by">${starHTML(p.rating)} <b>${p.rating}</b> <span style="color:var(--soft)">(${p.reviews.toLocaleString("vi-VN")} đánh giá trên sàn)</span> · <span>Vun Vén chấm <b>${r.score}/10</b></span></div>
        <div class="buybtns">
          ${shops.map((k, i) => `<a class="btn block ${i === 0 ? "dark" : ""}" href="${esc(p.link[k])}" ${EXT}>Xem giá trên ${SHOPS[k].name}</a>`).join("")}
          <button class="save-btn ${Saved.has(p.id) ? "on" : ""}" data-save="${p.id}">${ICON.heart} Lưu lại xem sau</button>
        </div>
        <ul class="hl">
          <li>${ICON.check}<span><b>Hợp với:</b> ${esc(r.fitFor.join(", ").toLowerCase())}</span></li>
          <li>${ICON.tag}<span>Bán bởi <b>${esc(p.shop)}</b>${p.freeship ? " · Freeship" : ""}</span></li>
          <li>${ICON.book}<span>Bài review ${r.readTime} phút đọc · cập nhật ${r.date}</span></li>
        </ul>
        <details open><summary>Tóm tắt nhanh</summary><div class="dc">${esc(r.summary)}</div></details>
        <details><summary>Thông số chính</summary><div class="dc"><table>${r.specs.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}</table></div></details>
        <details><summary>Ai không nên mua?</summary><div class="dc"><ul style="margin:0;padding-left:18px">${r.notFor.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></details>
      </div>
    </div>

    <div class="article-wrap">
      <article class="article">
        <span class="kicker">Review chi tiết</span>
        <h2 class="t">${esc(r.title)}</h2>
        <div class="byline"><span>Bởi <b style="color:var(--ink)">${esc(r.author)}</b></span><span>${r.date}</span><span>${r.readTime} phút đọc</span></div>
        <div class="sample-note">Đây là <b>bài review mẫu</b>. Hãy thay bằng trải nghiệm thật của bạn trong file <code>assets/data.js</code> trước khi đăng.</div>
        <div class="tldr"><h3>Tóm lại</h3><p>${esc(r.summary)}</p></div>
        <div class="pc">
          <div class="pros"><h4>Điểm cộng</h4><ul>${r.pros.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
          <div class="cons"><h4>Điểm trừ</h4><ul>${r.cons.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        </div>
        ${r.sections.map(s => `<h3 class="s">${esc(s.h)}</h3><p class="body">${esc(s.p)}</p>`).join("")}
        <div class="fit">
          <div><h4>Nên mua nếu bạn là…</h4><ul>${r.fitFor.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
          <div><h4>Cân nhắc lại nếu…</h4><ul>${r.notFor.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        </div>
      </article>
      <aside>
        <div class="scorecard">
          <div class="big"><b>${r.score}</b><span>/10<br>Điểm Vun Vén</span></div>
          <div class="bars">${Object.entries(r.scores).map(([k, v]) => `<div class="bar"><span>${esc(k)}</span><i style="--v:${v}"></i><b>${v}</b></div>`).join("")}</div>
          <div class="verdict"><h4>Kết luận</h4>${esc(r.verdict)}</div>
          <div style="margin-top:16px">${shops.length ? `<a class="btn block brand" href="${esc(p.link[shops[0]])}" ${EXT}>Xem giá trên ${SHOPS[shops[0]].name}</a>` : ""}</div>
        </div>
      </aside>
    </div>

    <section class="sec">
      <div class="sec-title"><h2>Cùng bộ “${esc(per.name)}”</h2><a href="danh-muc.html?nhom=${per.id}">Xem tất cả</a></div>
      <div class="grid g4">${related.slice(0, 4).map(productCard).join("")}</div>
    </section>
    <section class="sec" style="padding-top:0">
      <div class="sec-title"><h2>Review khác</h2></div>
      <div class="posts">${REVIEWS.filter(x => x.id !== r.id).map(x => { const xp = productById(x.product), xper = personaById(xp.persona); return `<a class="post" href="review.html?id=${x.id}"><div class="ph"><img src="${imgSrc(xp.img)}" alt="" loading="lazy"></div><div class="b"><span class="kicker">Review · ${esc(xper.name)}</span><h3>${esc(x.title)}</h3><div class="m"><span class="score-chip">${x.score}/10</span><span>${x.readTime} phút đọc</span></div></div></a>`; }).join("")}</div>
    </section>
  </div>
  ${shops.length ? `<div class="sticky-buy"><b>${fmt(p.price)}</b><a class="btn dark" href="${esc(p.link[shops[0]])}" ${EXT}>Xem trên ${SHOPS[shops[0]].name}</a></div>` : ""}`;
}

/* ---------- khởi động theo trang ---------- */
({ home: initHome, listing: initListing, review: initReview })[document.body.dataset.page]?.();
