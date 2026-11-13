# Vun Vén — "Mua ít hơn, mua đúng hơn"

Trang gợi ý mua sắm theo tinh thần **vun vén / tiết kiệm**: mỗi nhóm chỉ 5 món cần thiết xếp theo ưu tiên,
kèm danh sách "Đừng phí tiền vào…", ngân sách gợi ý, mẹo mua rẻ hơn và so giá 3 sàn.
Site tĩnh (HTML/CSS/JS thuần, không cần build) theo phong cách sàn TMĐT: thanh tìm kiếm,
danh mục tròn, lưới sản phẩm có ảnh, giá, % giảm, sao, nút lưu (♡), trang danh mục có bộ lọc
và trang review dạng trang chi tiết sản phẩm.

10 nhóm nhu cầu: Mẹ bỉm sữa · Dân khởi nghiệp · Dân văn phòng · Sinh viên/Gen Z · Gymer ·
Tín đồ skincare · Cô dâu sắp cưới · Mới ra ở riêng · Dân xê dịch · Quà biếu bố mẹ — 50 sản phẩm, 3 bài review mẫu.

## Các trang

| File | Nội dung |
|---|---|
| `index.html` | Trang chủ: danh mục tròn, mua theo nhu cầu, bán chạy, giảm sâu, review |
| `danh-muc.html` | Trang danh mục + bộ lọc (`?nhom=me-bim`, `?q=tai nghe`, `?saved=1`) |
| `san-pham.html` | **Trang so giá** cho mọi sản phẩm (`?id=may-hut-sua`): bảng giá 3 sàn, sàn rẻ nhất, chênh lệch |
| `review.html` | Bài review dạng trang sản phẩm (`?id=may-hut-sua`) |
| `assets/data.js` | **Toàn bộ sản phẩm, giá, link affiliate, bài review — chỉ cần sửa file này** |
| `assets/img/` | Ảnh minh hoạ (Unsplash, dùng miễn phí) |

## Trước khi đăng

1. **Link affiliate:** trong `assets/data.js`, thay các `"#"` trong `link: { shopee, lazada, tiktok }`. Để `""` thì sàn đó tự ẩn.
2. **Ảnh:** ảnh hiện tại là ảnh minh hoạ. Nên thay bằng ảnh sản phẩm thật: bỏ file vào `assets/img/` rồi đổi `img`, hoặc dán thẳng URL ảnh vào `img`.
3. **Giá từng sàn (so giá):** mỗi sản phẩm có `prices: { shopee, lazada, tiktok }` — nhập giá bạn thấy trên từng sàn,
   trang tự tìm sàn rẻ nhất và tính chênh lệch. Sửa xong nhớ đổi `PRICE_UPDATED` (ngày cập nhật) ở đầu `assets/data.js`.
   Trang tĩnh không tự lấy giá từ sàn được, nên cần cập nhật tay định kỳ (vd mỗi tuần).
   Giá gốc, số sao, số lượt đánh giá hiện cũng là **số mẫu** — thay bằng số thật.
4. **Review:** 3 bài review là bài mẫu, hãy viết lại bằng trải nghiệm thật (kể cả mục `saveTips` — mẹo mua rẻ hơn).
   Danh sách "Đừng phí tiền vào…" của từng nhóm nằm ở trường `skip` trong `assets/data.js`.
5. **Ô đăng ký email** chưa lưu dữ liệu — gắn với Mailchimp / Google Form khi cần.

## Đăng lên mạng

GitHub Pages: Settings → Pages → Deploy from branch → chọn branch & thư mục `/ (root)`.

## Tự động cập nhật giá (AccessTrade / Shopee API)

Giá và link affiliate được cập nhật **6 tiếng một lần** bằng GitHub Actions (`.github/workflows/cap-nhat-gia.yml`).
Có giá mới → file `assets/prices.js` được lưu lên GitHub → Cloudflare Pages tự cập nhật trang.

**Thiết lập một lần:**
1. Mở `data/nguon-gia.json`, dán **link sản phẩm gốc** trên Shopee / Lazada / TikTok Shop cho từng món
   (Shopee nên dùng link đầy đủ dạng `...-i.123456.789012`). Không bán ở sàn nào thì để trống.
2. GitHub → repo → **Settings → Secrets and variables → Actions → New repository secret**:
   - `ACCESSTRADE_TOKEN`: Access key lấy ở pub.accesstrade.vn → Tài khoản → Profile.
   - (tuỳ chọn) `SHOPEE_APP_ID`, `SHOPEE_APP_SECRET`: nếu có quyền Shopee Affiliate Open API.
3. (tuỳ chọn) Tab **Variables**: `AT_CAMPAIGN_SHOPEE`, `AT_CAMPAIGN_LAZADA` = campaign_id trên AccessTrade
   (bỏ trống thì script tự tìm chiến dịch Shopee/Lazada bạn đã được duyệt).
4. Tab **Actions → Cập nhật giá tự động → Run workflow** để chạy thử ngay.

Chạy thử trên máy: `ACCESSTRADE_TOKEN=xxx node scripts/update-prices.mjs --dry` (thêm `--only=may-hut-sua` để thử 1 món)

**Đã kiểm tra với tài khoản AccessTrade thật (14/11/2026):**
| Sàn | Giá tự động | Link affiliate tự tạo |
|---|---|---|
| Shopee | ✅ nếu sản phẩm có trong datafeed của AccessTrade (khoảng 12.700 sp) — muốn đủ hết thì thêm `SHOPEE_APP_ID/SECRET` | ✅ |
| TikTok Shop | ✅ | ✅ |
| Lazada | ⚠️ datafeed Lazada trên AccessTrade rất cũ (2021) nên script bỏ qua, **giữ giá nhập tay** | ✅ |
Món nào API không lấy được giá thì trang vẫn dùng giá nhập tay trong `assets/data.js`.
Lưu ý: lịch chạy tự động của GitHub chỉ chạy trên **nhánh mặc định** của repo.
