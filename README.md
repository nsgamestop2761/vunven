# 🌱 Vun Vén — trang affiliate "Mua đúng đồ, cho đúng người"

Site tĩnh (HTML/CSS/JS thuần, không cần build) gợi ý sản phẩm theo **10 nhóm người dùng**:
Mẹ bỉm sữa · Dân khởi nghiệp · Dân văn phòng · Sinh viên/Gen Z · Gymer · Tín đồ skincare ·
Mới ra ở riêng · Dân xê dịch · Game thủ · Quà biếu bố mẹ — kèm **3 bài review mẫu**.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Trang chủ: hero, chọn nhóm, lọc theo ngân sách, danh sách review |
| `review.html` | Trang review chi tiết (`review.html?id=may-hut-sua`) |
| `assets/data.js` | **Toàn bộ sản phẩm, giá, link affiliate và bài review — chỉ cần sửa file này** |
| `assets/style.css` | Giao diện |
| `assets/app.js`, `assets/review.js` | Hiển thị dữ liệu |

## Thay link affiliate

Mở `assets/data.js`, tìm `link: { shopee: "#", lazada: "#", tiktok: "#" }` và dán link của bạn.
Để `""` thì nút sàn đó tự ẩn.

## Thêm nhóm / sản phẩm / review

- Thêm nhóm: copy một object trong `PERSONAS` và đổi `id`, `name`, `emoji`, `color`...
- Thêm review: copy một object trong `REVIEWS`, rồi gắn `review: "<id>"` vào sản phẩm tương ứng.
- Link chia sẻ từng nhóm: `https://<site>/#me-bim`, `#khoi-nghiep`, `#sinh-vien`...

## Xem thử & đăng lên mạng

- Xem trên máy: mở `index.html` bằng trình duyệt.
- GitHub Pages: Settings → Pages → Deploy from branch → chọn branch & thư mục `/ (root)`.

> ⚠️ Giá trong data là giá tham khảo, các bài review là **bài mẫu** — nhớ thay bằng trải nghiệm thật trước khi đăng.
