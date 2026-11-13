# Vun Vén — trang affiliate "Đồ tốt, chọn đúng cho từng người"

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
| `review.html` | Bài review dạng trang sản phẩm (`?id=may-hut-sua`) |
| `assets/data.js` | **Toàn bộ sản phẩm, giá, link affiliate, bài review — chỉ cần sửa file này** |
| `assets/img/` | Ảnh minh hoạ (Unsplash, dùng miễn phí) |

## Trước khi đăng

1. **Link affiliate:** trong `assets/data.js`, thay các `"#"` trong `link: { shopee, lazada, tiktok }`. Để `""` thì sàn đó tự ẩn.
2. **Ảnh:** ảnh hiện tại là ảnh minh hoạ. Nên thay bằng ảnh sản phẩm thật: bỏ file vào `assets/img/` rồi đổi `img`, hoặc dán thẳng URL ảnh vào `img`.
3. **Số liệu:** giá, giá gốc, số sao, số lượt đánh giá đang là **số mẫu** — thay bằng số thật trên sàn.
4. **Review:** 3 bài review là bài mẫu, hãy viết lại bằng trải nghiệm thật.
5. **Ô đăng ký email** chưa lưu dữ liệu — gắn với Mailchimp / Google Form khi cần.

## Đăng lên mạng

GitHub Pages: Settings → Pages → Deploy from branch → chọn branch & thư mục `/ (root)`.
