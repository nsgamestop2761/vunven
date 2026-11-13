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
