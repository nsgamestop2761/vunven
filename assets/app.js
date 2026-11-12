/* ---------- helpers dùng chung ---------- */
const fmt = n => n.toLocaleString("vi-VN") + "đ";
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const stars = r => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
const shopButtons = link => Object.entries(SHOPS)
  .filter(([k]) => link && link[k])
  .map(([k, s]) => `<a class="shop" style="--s:${s.color}" href="${esc(link[k])}" target="_blank" rel="nofollow sponsored noopener">${s.name}</a>`)
  .join("");
const reviewById = id => REVIEWS.find(r => r.id === id);
const personaById = id => PERSONAS.find(p => p.id === id);
function toast(msg) {
  const t = document.getElementById("toast"); if (!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- trang chủ ---------- */
const BUDGETS = [
  { id: "all", label: "Tất cả", test: () => true },
  { id: "lt500", label: "Dưới 500k", test: p => p < 500000 },
  { id: "500-2tr", label: "500k – 2 triệu", test: p => p >= 500000 && p <= 2000000 },
  { id: "gt2tr", label: "Trên 2 triệu", test: p => p > 2000000 }
];
const state = { persona: PERSONAS[0].id, budget: "all" };

function renderHeroStickers() {
  const art = document.getElementById("heroArt"); if (!art) return;
  const pos = [[2, 8], [58, 0], [-2, 46], [62, 40], [10, 82], [54, 80]];
  PERSONAS.slice(0, 6).forEach((p, i) => {
    const a = document.createElement("a");
    a.className = "sticker"; a.href = "#" + p.id;
    a.style.cssText = `--c:${p.color};left:${pos[i][0]}%;top:${pos[i][1]}%`;
    a.innerHTML = `<i>${p.emoji}</i>${esc(p.name)}`;
    art.appendChild(a);
  });
  const m = document.getElementById("marquee");
  const items = PERSONAS.map(p => `<span>${p.emoji} ${esc(p.name)}</span><span>✦</span>`).join("");
  m.innerHTML = items + items;
}

function renderPersonas() {
  document.getElementById("personas").innerHTML = PERSONAS.map(p => `
    <button class="persona ${p.id === state.persona ? "active" : ""}" style="--c:${p.color}" data-id="${p.id}" role="tab" aria-selected="${p.id === state.persona}">
      <span class="em">${p.emoji}</span><strong>${esc(p.name)}</strong><small>${esc(p.tagline)}</small>
    </button>`).join("");
}

function renderPanel() {
  const p = personaById(state.persona);
  const budget = BUDGETS.find(b => b.id === state.budget);
  const list = p.products.filter(x => budget.test(x.price));
  const total = list.reduce((s, x) => s + x.price, 0);
  const panel = document.getElementById("panel");
  panel.style.setProperty("--c", p.color);
  panel.innerHTML = `
    <div class="panel-head">
      <div class="panel-emoji">${p.emoji}</div>
      <div>
        <h3>Bộ đồ cho <em>${esc(p.name)}</em></h3>
        <p class="panel-desc">${esc(p.desc)}</p>
        <div class="needs">${p.needs.map(n => `<span>${esc(n)}</span>`).join("")}</div>
      </div>
      <button class="btn btn-ghost share" id="shareBtn">🔗 Copy link nhóm này</button>
    </div>
    <div class="toolbar">
      <div class="chips">${BUDGETS.map(b => `<button class="chip ${b.id === state.budget ? "on" : ""}" data-b="${b.id}">${b.label}</button>`).join("")}</div>
      <div class="total">${list.length} món · sắm đủ bộ khoảng <b>${fmt(total)}</b></div>
    </div>
    <div class="products">
      ${list.length ? list.map((x, i) => productCard(x, i, p)).join("") : `<div class="empty">Nhóm này chưa có món trong tầm giá này 🙈 Thử mức khác nha!</div>`}
    </div>`;
}

function productCard(x, i, p) {
  const r = x.review && reviewById(x.review);
  return `
  <article class="card" style="animation-delay:${i * 60}ms">
    <div class="thumb"><span class="rank">#${p.products.indexOf(x) + 1}</span>${x.tag ? `<span class="tag">${esc(x.tag)}</span>` : ""}${x.emoji}</div>
    <h4>${esc(x.name)}</h4>
    <div class="meta"><span class="stars">${stars(x.rating)}<small>${x.rating}</small></span><span class="price">${fmt(x.price)}</span></div>
    <p class="why">${esc(x.why)}</p>
    <div class="shop-btns">${shopButtons(x.link)}</div>
    ${r ? `<a class="read" href="review.html?id=${r.id}">📝 Đọc review chi tiết · ${r.score}/10</a>` : ""}
  </article>`;
}

function renderReviews() {
  document.getElementById("reviews").innerHTML = REVIEWS.map(r => {
    const p = personaById(r.persona);
    return `
    <a class="rcard" href="review.html?id=${r.id}" style="--c:${p.color}">
      <div class="rcover">${r.emoji}<div class="score">${r.score}</div></div>
      <div class="rbody">
        <div class="who">${p.emoji} Dành cho ${esc(p.name)}</div>
        <h3>${esc(r.title)}</h3>
        <p>${esc(r.summary.slice(0, 120))}…</p>
      </div>
      <div class="rfoot"><span>⏱ ${r.readTime} phút đọc</span><span>${r.date}</span></div>
    </a>`;
  }).join("");
}

function selectPersona(id, scroll) {
  if (!personaById(id)) return;
  state.persona = id; state.budget = "all";
  renderPersonas(); renderPanel();
  if (scroll) document.getElementById("panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function initHome() {
  const fromHash = location.hash.slice(1);
  if (personaById(fromHash)) state.persona = fromHash;
  renderHeroStickers(); renderPersonas(); renderPanel(); renderReviews();
  if (personaById(fromHash)) setTimeout(() => document.getElementById(window.innerWidth < 820 ? "panel" : "chon").scrollIntoView(), 50);

  document.getElementById("personas").addEventListener("click", e => {
    const b = e.target.closest(".persona"); if (!b) return;
    history.replaceState(null, "", "#" + b.dataset.id);
    selectPersona(b.dataset.id, window.innerWidth < 820);
  });
  document.getElementById("panel").addEventListener("click", e => {
    const c = e.target.closest(".chip");
    if (c) { state.budget = c.dataset.b; renderPanel(); return; }
    if (e.target.closest("#shareBtn")) {
      const url = location.href.split("#")[0] + "#" + state.persona;
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
        .then(() => toast("Đã copy link! Gửi cho bạn bè thôi 🎉"))
        .catch(() => prompt("Copy link này nhé:", url));
    }
  });
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (personaById(id)) selectPersona(id, true);
  });
  document.getElementById("subForm").addEventListener("submit", e => {
    e.preventDefault(); e.target.reset(); toast("Cảm ơn bạn! Deal hot sẽ tới hộp thư sớm 💌");
  });
}

if (document.getElementById("personas")) initHome();
