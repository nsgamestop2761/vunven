(function () {
  const id = new URLSearchParams(location.search).get("id") || REVIEWS[0].id;
  const r = reviewById(id) || REVIEWS[0];
  const p = personaById(r.persona);
  document.body.style.setProperty("--c", p.color);
  document.title = r.title + " — Vun Vén";

  const firstShop = link => { const k = Object.keys(SHOPS).find(k => link[k]); return k ? { [k]: link[k] } : {}; };
  const others = REVIEWS.filter(x => x.id !== r.id);
  const related = p.products.filter(x => x.name !== r.product).slice(0, 3);

  document.getElementById("app").innerHTML = `
  <div class="r-hero">
    <div class="wrap">
      <div class="crumbs"><a href="./">Trang chủ</a> / <a href="./#${p.id}">${p.emoji} ${esc(p.name)}</a> / Review</div>
      <span class="sample">✍️ BÀI REVIEW MẪU — thay bằng trải nghiệm thật của bạn</span>
      <h1>${esc(r.title)}</h1>
      <div class="byline"><span>✍️ ${esc(r.author)}</span><span>📅 ${r.date}</span><span>⏱ ${r.readTime} phút đọc</span><span>⭐ ${r.score}/10</span></div>
    </div>
  </div>

  <div class="wrap r-grid">
    <article>
      <div class="r-cover">${r.emoji}</div>

      <div class="box tldr">
        <h2>⚡ Tóm tắt nhanh</h2>
        <p>${esc(r.summary)}</p>
      </div>

      <div class="box">
        <div class="verdict-row">
          <div class="big-score" style="--p:${r.score * 10}"><span>${r.score}<small>/10</small></span></div>
          <div><h2 style="margin-bottom:6px">Kết luận</h2><p style="margin:0">${esc(r.verdict)}</p></div>
        </div>
        <div class="bars" style="margin-top:24px">
          ${Object.entries(r.scores).map(([k, v]) => `<div class="bar"><span>${esc(k)}</span><i style="--v:${v}"></i><b>${v}</b></div>`).join("")}
        </div>
      </div>

      <div class="pc">
        <div class="box pros"><h2>👍 Điểm cộng</h2><ul>${r.pros.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="box cons"><h2>👎 Điểm trừ</h2><ul>${r.cons.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>

      <div class="article">
        ${r.sections.map(s => `<h2>${esc(s.h)}</h2><p>${esc(s.p)}</p>`).join("")}
      </div>

      <div class="box" style="margin-top:32px">
        <h2>📋 Thông số chính</h2>
        <table>${r.specs.map(([k, v]) => `<tr><td>${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`).join("")}</table>
      </div>

      <div class="fit">
        <div class="yes"><h3>✅ Hợp với bạn nếu…</h3><ul>${r.fitFor.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="no"><h3>🚫 Cân nhắc lại nếu…</h3><ul>${r.notFor.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>
    </article>

    <aside class="aside">
      <div class="box buy-card">
        <div style="font-size:14px;color:var(--muted)">${esc(r.product)}</div>
        <div class="p">~${fmt(r.price)}</div>
        <div class="stars" style="margin-bottom:6px">${stars(r.score / 2)} <small>${r.score}/10</small></div>
        ${shopButtons(r.link)}
        <div class="note">Giá tham khảo. Bấm để xem giá & voucher mới nhất trên sàn.</div>
      </div>
      <div class="box">
        <h2 style="font-size:18px">${p.emoji} Cùng bộ “${esc(p.name)}”</h2>
        ${related.map(x => `<a class="mini" href="./#${p.id}"><b>${x.emoji}</b><span>${esc(x.name)}<br><small style="color:var(--brand);font-weight:700">~${fmt(x.price)}</small></span></a>`).join("")}
      </div>
      <div class="box">
        <h2 style="font-size:18px">📝 Review khác</h2>
        ${others.map(x => { const op = personaById(x.persona); return `<a class="mini" style="--c:${op.color}" href="review.html?id=${x.id}"><b>${x.emoji}</b><span>${esc(x.title)}</span></a>`; }).join("")}
      </div>
    </aside>
  </div>

  <div class="sticky-buy"><span class="p">~${fmt(r.price)}</span>${shopButtons(firstShop(r.link))}</div>`;
})();
