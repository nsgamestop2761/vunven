/* =========================================================
   VUN VÉN — DỮ LIỆU SẢN PHẨM  (chỉ cần sửa file này)
   ---------------------------------------------------------
   Mỗi sản phẩm:
   - img        : tên file ảnh trong assets/img (hoặc dán URL ảnh từ sàn)
   - price      : giá bán (VNĐ)       - oldPrice: giá gốc để hiện % giảm (bỏ trống nếu không giảm)
   - rating     : điểm sao            - reviews : số lượt đánh giá trên sàn
     ⚠️ rating / reviews / giá hiện là SỐ MẪU — hãy thay bằng số thật từ sàn.
   - badge      : "Bán chạy" | "Đáng tiền" | "" ...
   - freeship   : true nếu shop có freeship
   - link       : link affiliate từng sàn. Để "" thì sàn đó tự ẩn.
   - review     : id bài review trong REVIEWS (nếu có)
   ========================================================= */

const SHOPS = {
  shopee: { name: "Shopee" },
  lazada: { name: "Lazada" },
  tiktok: { name: "TikTok Shop" }
};

const PERSONAS = [
  {
    id: "me-bim", name: "Mẹ bỉm sữa", short: "Mẹ & bé", img: "cat-me-bim",
    desc: "Giai đoạn 0–12 tháng là lúc mẹ thiếu ngủ nhất. Ưu tiên đồ giúp rảnh tay, an toàn cho bé và dễ vệ sinh.",
    needs: ["Rảnh tay", "An toàn cho bé", "Dễ vệ sinh"],
    products: [
      { id: "may-hut-sua", name: "Máy hút sữa điện đôi không dây, 9 mức lực hút", img: "mb-may-hut-sua", price: 1290000, oldPrice: 1590000, rating: 4.8, reviews: 2134, badge: "Bán chạy", shop: "Shopee Mall", freeship: true, review: "may-hut-sua",
        why: "Đeo gọn trong áo, vừa hút vừa ru con. Chọn loại có từ 9 mức lực hút trở lên.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "body-gau", name: "Bộ body liền thân lót nỉ hình gấu cho bé 0–24 tháng", img: "mb-body-gau", price: 189000, oldPrice: 249000, rating: 4.9, reviews: 5310, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "Cotton lót nỉ mềm, cúc bấm dọc người nên thay tã không cần cởi hết đồ.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "chan-u", name: "Chăn ủ sơ sinh sợi tre siêu mềm 2 lớp", img: "mb-chan-u", price: 245000, rating: 4.7, reviews: 1288, badge: "", shop: "LazMall", freeship: false,
        why: "Sợi tre thấm hút, kháng khuẩn tự nhiên. Ủ bé ngủ sâu hơn, càng giặt càng mềm.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "do-choi", name: "Set đồ chơi phát triển giác quan cho bé 6–18 tháng", img: "mb-do-choi", price: 359000, oldPrice: 420000, rating: 4.6, reviews: 876, badge: "Đáng tiền", shop: "TikTok Shop", freeship: true,
        why: "Thú bông, sách vải, xúc xắc trong một set. Chất liệu đạt chuẩn an toàn cho bé gặm.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "kem-ran", name: "Kem dưỡng ngừa rạn da cho mẹ bầu & sau sinh 150ml", img: "mb-kem-ran", price: 320000, rating: 4.5, reviews: 3402, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Thoa từ tháng thứ 4 thai kỳ. Chọn loại không mùi để bé không bị kích ứng.", link: { shopee: "#", lazada: "#", tiktok: "#" } }
    ]
  },
  {
    id: "khoi-nghiep", name: "Dân khởi nghiệp", short: "Khởi nghiệp", img: "cat-khoi-nghiep",
    desc: "Founder ngồi máy 12 tiếng, họp liên tục, gặp khách bất chợt. Đầu tư vào sức khoẻ và năng suất là khoản đầu tư sinh lời.",
    needs: ["Năng suất", "Chuyên nghiệp", "Bền bỉ"],
    products: [
      { id: "ghe-cong-thai-hoc", name: "Ghế công thái học lưới, tựa đầu & tay vịn 4D", img: "kn-ghe", price: 3490000, oldPrice: 4290000, rating: 4.8, reviews: 1532, badge: "Đáng tiền", shop: "Shopee Mall", freeship: true, review: "ghe-cong-thai-hoc",
        why: "Tựa thắt lưng chỉnh được, đỡ cột sống — ngồi 10 tiếng vẫn tỉnh táo.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "man-hinh", name: "Màn hình 27 inch 2K IPS, viền mỏng 3 cạnh", img: "kn-man-hinh", price: 4190000, oldPrice: 4890000, rating: 4.7, reviews: 964, badge: "", shop: "LazMall", freeship: true,
        why: "Mở cùng lúc pitch deck, bảng tính và email. Màn 2K đủ nét để làm thiết kế cơ bản.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "gia-laptop", name: "Giá đỡ laptop nhôm nguyên khối, chỉnh 6 nấc", img: "kn-gia-laptop", price: 290000, rating: 4.7, reviews: 4120, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "Nâng màn hình ngang tầm mắt, đỡ gù cổ. Gập gọn bỏ balo mang đi cà phê.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "so-tay", name: "Sổ kế hoạch OKR 12 tuần, bìa da, giấy 100gsm", img: "kn-so-tay", price: 189000, rating: 4.6, reviews: 712, badge: "", shop: "TikTok Shop", freeship: false,
        why: "Chia mục tiêu quý thành việc từng tuần, rất hợp để theo dõi tiến độ startup.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "sach", name: "Combo sách khởi nghiệp: Zero to One, Khởi nghiệp tinh gọn…", img: "kn-sach", price: 420000, oldPrice: 560000, rating: 4.9, reviews: 2045, badge: "Kinh điển", shop: "Tiki Trading", freeship: true,
        why: "Gối đầu giường của founder: thử nghiệm nhanh, học từ khách hàng, đỡ đốt tiền.", link: { shopee: "#", lazada: "#", tiktok: "#" } }
    ]
  },
  {
    id: "van-phong", name: "Dân văn phòng", short: "Văn phòng", img: "cat-van-phong",
    desc: "Đau vai gáy, khô mắt, quên uống nước là 'bệnh nghề nghiệp' của dân công sở. Vài món nhỏ trên bàn đổi lại cả ngày dễ chịu.",
    needs: ["Đỡ mỏi", "Gọn bàn", "Giá mềm"],
    products: [
      { id: "massage", name: "Máy massage cổ vai gáy xung điện, có chườm ấm", img: "vp-massage", price: 690000, oldPrice: 890000, rating: 4.6, reviews: 3876, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "15 phút giờ nghỉ trưa là vai gáy nhẹ hẳn. Nên chọn loại có chế độ chườm ấm.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "den-ban", name: "Đèn bàn kim loại phong cách Bắc Âu, bóng E27", img: "vp-den-ban", price: 459000, rating: 4.7, reviews: 1120, badge: "", shop: "LazMall", freeship: false,
        why: "Chao đèn xoay được, ánh sáng tập trung xuống bàn, không chói mắt.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "binh-nuoc", name: "Bình giữ nhiệt inox 316 dung tích 750ml, sơn nhám", img: "vp-binh-nuoc", price: 250000, oldPrice: 320000, rating: 4.8, reviews: 6230, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "Giữ lạnh cả ngày, sơn nhám không trơn tay. Để trên bàn cũng đẹp.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "coc-su", name: "Cốc sứ trắng 350ml có nắp, dùng được lò vi sóng", img: "vp-coc-su", price: 89000, rating: 4.6, reviews: 980, badge: "", shop: "TikTok Shop", freeship: true,
        why: "Cốc trà chiều tối giản, men dày giữ ấm lâu, rửa không bám màu cà phê.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "ban-phim", name: "Bàn phím không dây mỏng, kết nối 3 thiết bị", img: "vp-ban-phim", price: 549000, rating: 4.5, reviews: 1460, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Gõ êm, ít tiếng ồn, chuyển nhanh giữa laptop – máy tính bảng – điện thoại.", link: { shopee: "#", lazada: "#", tiktok: "" } }
    ]
  },
  {
    id: "sinh-vien", name: "Sinh viên / Gen Z", short: "Sinh viên", img: "cat-sinh-vien",
    desc: "Ở trọ, học online, đi làm thêm — đồ cần đa năng, bền và giá dễ thở. Gần như toàn món dưới 800k.",
    needs: ["Giá sinh viên", "Đa năng", "Phòng trọ nhỏ"],
    products: [
      { id: "tai-nghe-anc", name: "Tai nghe true wireless chống ồn ANC, pin 30 giờ", img: "sv-tai-nghe", price: 790000, oldPrice: 990000, rating: 4.6, reviews: 4518, badge: "Bán chạy", shop: "Shopee Mall", freeship: true, review: "tai-nghe-anc",
        why: "Học thư viện, đi xe buýt đều yên tĩnh. Dưới 1 triệu mà có ANC là quá hời.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "noi-mini", name: "Nồi điện mini đa năng 1.5L: nấu, lẩu, hấp", img: "sv-noi-mini", price: 350000, rating: 4.5, reviews: 2870, badge: "", shop: "TikTok Shop", freeship: true,
        why: "Nấu mì, lẩu, luộc trứng, hấp bánh — một nồi cân hết bữa tối phòng trọ.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "den-hoc", name: "Đèn học LED chống cận, kẹp bàn, 3 chế độ màu", img: "sv-den-hoc", price: 280000, rating: 4.6, reviews: 1934, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Ánh sáng không nhấp nháy, chỉnh 3 tông màu, ôn thi xuyên đêm đỡ mỏi mắt.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "cu-sac", name: "Củ sạc nhanh GaN 65W, 3 cổng, sạc được laptop", img: "sv-cu-sac", price: 390000, oldPrice: 490000, rating: 4.7, reviews: 3311, badge: "Đáng tiền", shop: "LazMall", freeship: true,
        why: "Một củ sạc cho cả laptop, điện thoại, tai nghe — balo nhẹ hẳn.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "balo", name: "Balo laptop 15.6 inch chống nước, ngăn chống sốc", img: "sv-balo", price: 420000, rating: 4.5, reviews: 2210, badge: "", shop: "Shopee Mall", freeship: false,
        why: "Ngăn chống sốc cho laptop, vải chống nước — mưa bất chợt cũng không lo.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "gymer", name: "Gymer & sống healthy", short: "Thể thao", img: "cat-gymer",
    desc: "Dù mới tập hay đã lên cơ, đo lường được thì mới tiến bộ được. Bộ đồ này giúp bạn tập đều và phục hồi tốt hơn.",
    needs: ["Đo lường", "Tập tại nhà", "Phục hồi"],
    products: [
      { id: "dong-ho", name: "Đồng hồ thông minh đo nhịp tim, SpO2, pin 10 ngày", img: "gy-dong-ho", price: 1190000, oldPrice: 1490000, rating: 4.6, reviews: 2788, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "Theo dõi nhịp tim, giấc ngủ, bước chân và hơn 100 chế độ luyện tập.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "ta-tay", name: "Bộ tạ tay bọc cao su 2×3kg + dây kháng lực", img: "gy-ta-tay", price: 390000, rating: 4.7, reviews: 1650, badge: "Đáng tiền", shop: "TikTok Shop", freeship: true,
        why: "Đủ cho 80% bài tập tại nhà. Bọc cao su không trầy sàn, không ồn.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "tham-yoga", name: "Thảm yoga TPE dày 8mm, 2 mặt chống trơn", img: "gy-tham-yoga", price: 290000, rating: 4.6, reviews: 3904, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Êm gối, không mùi cao su, kèm dây đeo mang đi lớp tiện lợi.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "binh-lac", name: "Bình lắc whey 700ml có lò xo, ngăn đựng bột", img: "gy-binh-lac", price: 120000, rating: 4.4, reviews: 5120, badge: "", shop: "LazMall", freeship: false,
        why: "Lò xo đánh tan bột, nắp vặn kín không rò rỉ trong túi gym.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "giay", name: "Giày tập gym đế bằng, đế cao su chống trượt", img: "gy-giay", price: 650000, oldPrice: 790000, rating: 4.5, reviews: 860, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Đế bằng giúp đứng vững khi squat, deadlift; thân lưới thoáng chân.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "skincare", name: "Tín đồ skincare", short: "Làm đẹp", img: "cat-skincare",
    desc: "Không cần 10 bước — chỉ cần đúng món, đúng thứ tự và kiên trì. Đây là bộ nền móng ai cũng nên có.",
    needs: ["Chống nắng", "Làm sạch", "Dưỡng ẩm"],
    products: [
      { id: "chong-nang", name: "Kem chống nắng phổ rộng SPF50+ PA++++, kết cấu sữa", img: "sk-chong-nang", price: 280000, oldPrice: 350000, rating: 4.8, reviews: 8920, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "Bước quan trọng nhất của skincare. Kết cấu mỏng nhẹ, không bết, không vệt trắng.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "serum", name: "Serum Vitamin C 15% sáng da, mờ thâm 30ml", img: "sk-serum", price: 350000, rating: 4.6, reviews: 2410, badge: "", shop: "TikTok Shop", freeship: true,
        why: "Làm sáng da, mờ thâm. Dùng buổi sáng, trước bước kem chống nắng.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "toner", name: "Nước cân bằng không cồn cho da nhạy cảm 200ml", img: "sk-toner", price: 230000, rating: 4.7, reviews: 1780, badge: "", shop: "LazMall", freeship: true,
        why: "Cấp ẩm nhẹ, làm dịu da sau rửa mặt, không gây khô căng.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "trang-diem", name: "Bộ cọ trang điểm 8 cây lông mềm kèm túi", img: "sk-trang-diem", price: 199000, oldPrice: 259000, rating: 4.6, reviews: 3020, badge: "Đáng tiền", shop: "Shopee Mall", freeship: true,
        why: "Đủ cọ nền, phấn, mắt, môi. Lông mềm, không rụng sau nhiều lần giặt.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "dau-duong", name: "Dầu dưỡng da mặt chiết xuất thực vật 30ml", img: "sk-dau-duong", price: 390000, rating: 4.5, reviews: 640, badge: "", shop: "TikTok Shop", freeship: false,
        why: "Khoá ẩm ban đêm cho da khô, đặc biệt hợp mùa lạnh và phòng máy lạnh.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "o-rieng", name: "Mới ra ở riêng", short: "Nhà cửa", img: "cat-o-rieng",
    desc: "Lần đầu dọn ra ở riêng, cái gì cũng muốn mua. Đây là những món 'một vốn bốn lời' giúp nhà gọn, ăn ngon, sống khoẻ.",
    needs: ["Tiết kiệm thời gian", "Nấu nhanh", "Nhà sạch"],
    products: [
      { id: "robot", name: "Robot hút bụi lau nhà, bản đồ LiDAR, điều khiển qua app", img: "or-robot", price: 3990000, oldPrice: 5490000, rating: 4.7, reviews: 2260, badge: "Đáng tiền", shop: "Shopee Mall", freeship: true,
        why: "Đi làm về là nhà đã sạch. Bản đồ LiDAR giúp robot không sót góc.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "may-xay", name: "Máy xay sinh tố cối thủy tinh 1.5L, 6 lưỡi", img: "or-may-xay", price: 690000, rating: 4.6, reviews: 1870, badge: "", shop: "LazMall", freeship: true,
        why: "Xay sinh tố, đá, hạt. Cối thủy tinh không ám mùi, dễ rửa.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "ca-phe", name: "Máy pha cà phê espresso mini kèm máy xay", img: "or-ca-phe", price: 2490000, oldPrice: 2990000, rating: 4.5, reviews: 540, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Tự pha ly latte buổi sáng, sau 3 tháng là hoà vốn tiền cà phê ngoài.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "bat-su", name: "Bộ 6 chén sứ men mộc phong cách tối giản", img: "or-bat-su", price: 260000, rating: 4.8, reviews: 1320, badge: "Bán chạy", shop: "TikTok Shop", freeship: true,
        why: "Men mộc dễ phối, chụp ảnh đồ ăn đẹp. Dùng được máy rửa bát.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "den-ngu", name: "Đèn ngủ đầu giường bóng tròn dây tóc, chân kim loại", img: "or-den-ngu", price: 320000, rating: 4.6, reviews: 970, badge: "", shop: "Shopee Mall", freeship: false,
        why: "Ánh vàng ấm, đọc sách trước khi ngủ dễ chịu, góc phòng xinh hẳn.", link: { shopee: "#", lazada: "#", tiktok: "#" } }
    ]
  },
  {
    id: "du-lich", name: "Dân xê dịch", short: "Du lịch", img: "cat-du-lich",
    desc: "Hành lý gọn thì chuyến đi mới nhẹ đầu. Bộ đồ nghề giúp bạn xếp đồ nhanh, đi xa an toàn và có ảnh đẹp.",
    needs: ["Gọn nhẹ", "Bền", "Chụp ảnh"],
    products: [
      { id: "vali", name: "Vali khung nhôm 20 inch xách tay, khoá TSA", img: "dl-vali", price: 1590000, oldPrice: 1990000, rating: 4.7, reviews: 1745, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "Vừa chuẩn xách tay 7kg, bánh xe xoay 360° êm, khoá TSA khi bay quốc tế.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "balo-trek", name: "Balo trekking 40L chống nước, có áo mưa", img: "dl-balo", price: 690000, rating: 4.6, reviews: 830, badge: "", shop: "LazMall", freeship: true,
        why: "Đai hông trợ lực, lưng thoáng khí — đi Hà Giang, Tà Xùa vẫn nhẹ vai.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "vi-ho-chieu", name: "Ví đựng hộ chiếu chống quét RFID, da PU", img: "dl-vi-ho-chieu", price: 150000, rating: 4.5, reviews: 2104, badge: "Đáng tiền", shop: "TikTok Shop", freeship: true,
        why: "Hộ chiếu, vé máy bay, thẻ, sim — gọn trong một ví, không thất lạc.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "kinh-ram", name: "Kính râm phân cực chống UV400 gọng vuông", img: "dl-kinh-ram", price: 220000, oldPrice: 290000, rating: 4.4, reviews: 1560, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Đi biển, chạy xe đường dài đỡ chói, ảnh check-in cũng có gu hơn.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "may-anh", name: "Máy ảnh mirrorless cho người mới kèm lens kit", img: "dl-may-anh", price: 12490000, oldPrice: 13990000, rating: 4.8, reviews: 312, badge: "", shop: "LazMall", freeship: true,
        why: "Nhẹ hơn DSLR, ảnh đẹp hơn điện thoại hẳn khi thiếu sáng — đáng đầu tư nếu đi nhiều.", link: { shopee: "#", lazada: "#", tiktok: "" } }
    ]
  },
  {
    id: "game-thu", name: "Game thủ", short: "Gaming", img: "cat-game-thu",
    desc: "Phản hồi nhanh, ngồi lâu không mỏi, góc máy lung linh. Bộ setup tầm trung mà cảm giác cao cấp.",
    needs: ["Độ trễ thấp", "Ngồi lâu", "Đẹp góc máy"],
    products: [
      { id: "phim-co", name: "Bàn phím cơ 75% hot-swap, 3 chế độ kết nối", img: "gt-ban-phim", price: 1290000, oldPrice: 1590000, rating: 4.8, reviews: 1980, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "Thay switch không cần hàn, gõ êm, dùng được dây, Bluetooth và 2.4G.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "keycap", name: "Bộ keycap PBT double-shot phối màu retro", img: "gt-keycap", price: 390000, rating: 4.7, reviews: 760, badge: "", shop: "TikTok Shop", freeship: true,
        why: "Nhựa PBT không bóng dầu, chữ không phai. Đổi mới bàn phím với giá mềm.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "tai-nghe-game", name: "Tai nghe chụp tai gaming, mic khử ồn tháo rời", img: "gt-tai-nghe", price: 690000, rating: 4.5, reviews: 2430, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Nghe rõ hướng bước chân địch, mic khử ồn cho team voice.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "tay-cam", name: "Tay cầm chơi game không dây cho PC & điện thoại", img: "gt-tay-cam", price: 590000, oldPrice: 750000, rating: 4.6, reviews: 1890, badge: "Đáng tiền", shop: "LazMall", freeship: true,
        why: "Kết nối Bluetooth, rung kép, pin 20 giờ — chơi game console trên PC.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "led", name: "Dải đèn LED RGB 5m đổi màu theo nhạc", img: "gt-led", price: 220000, rating: 4.5, reviews: 4210, badge: "", shop: "TikTok Shop", freeship: true,
        why: "Góc máy lên đời chỉ với hơn 200k, điều khiển qua app.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "bieu-bo-me", name: "Quà biếu bố mẹ", short: "Quà tặng", img: "cat-bieu-bo-me",
    desc: "Quà cho bố mẹ không cần đắt, cần dùng được hằng ngày và tốt cho sức khoẻ. Món nào cũng dễ dùng.",
    needs: ["Sức khoẻ", "Dễ dùng", "Bền"],
    products: [
      { id: "huyet-ap", name: "Máy đo huyết áp bắp tay, màn hình số lớn có giọng đọc", img: "bm-huyet-ap", price: 790000, oldPrice: 950000, rating: 4.8, reviews: 3620, badge: "Bán chạy", shop: "Shopee Mall", freeship: true,
        why: "Số to, đọc kết quả bằng giọng nói, lưu lịch sử đo cho 2 người.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "tra", name: "Hộp quà trà thảo mộc 6 vị, túi lọc tiện dụng", img: "bm-tra", price: 350000, rating: 4.7, reviews: 1104, badge: "", shop: "TikTok Shop", freeship: true,
        why: "Hoa cúc, atiso, gừng… giúp ngủ ngon. Hộp quà đẹp, biếu dịp lễ Tết.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { id: "am", name: "Ấm đun nước inox 304 dùng bếp từ 3L", img: "bm-am", price: 420000, rating: 4.6, reviews: 860, badge: "", shop: "LazMall", freeship: false,
        why: "Inox dày, có còi báo sôi — bố mẹ không lo quên ấm trên bếp.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { id: "dong-ho-treo", name: "Đồng hồ treo tường số lớn, kim trôi không tiếng", img: "bm-dong-ho", price: 290000, rating: 4.7, reviews: 1430, badge: "Đáng tiền", shop: "Shopee Mall", freeship: true,
        why: "Số to dễ nhìn, máy kim trôi êm — không tích tắc làm mất ngủ.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { id: "hop-qua", name: "Hộp quà Tết tự chọn: hạt, trà, mứt cao cấp", img: "bm-hop-qua", price: 890000, oldPrice: 1090000, rating: 4.6, reviews: 520, badge: "", shop: "Shopee Mall", freeship: true,
        why: "Tự chọn món theo khẩu vị bố mẹ, gói sẵn kèm thiệp viết tay.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  }
];

/* =========================================================
   BÀI REVIEW MẪU — thay bằng trải nghiệm thật của bạn
   ========================================================= */
const REVIEWS = [
  {
    id: "may-hut-sua", product: "may-hut-sua",
    title: "Review máy hút sữa điện đôi không dây sau 30 ngày: có đáng 1,3 triệu?",
    score: 8.7, readTime: 6, date: "10/11/2026", author: "Vun Vén",
    summary: "Gọn, êm, rảnh tay thật sự — rất hợp mẹ đi làm lại hoặc mẹ có con bám. Điểm trừ là phễu hơi khó lắp lần đầu và lượng sữa có thể thấp hơn máy để bàn với một số mẹ.",
    verdict: "Nên mua nếu bạn cần hút sữa lúc đang làm việc khác. Nếu chỉ hút ở nhà và cần tối đa lượng sữa, máy để bàn vẫn ổn định hơn.",
    scores: { "Thiết kế": 9, "Lực hút": 8.5, "Độ êm": 9, "Pin": 8, "Dễ vệ sinh": 8.5, "Giá trị": 9 },
    pros: ["Đeo gọn trong áo ngực, không dây rợ — vừa hút vừa bế con, gõ máy tính được", "9 mức lực hút + 3 chế độ (kích sữa, hút, massage) dễ tinh chỉnh", "Tiếng ồn nhỏ (khoảng 45dB), hút trong phòng họp vẫn kín đáo", "Phễu silicone mềm, ít gây đau đầu ti"],
    cons: ["Lần đầu lắp phễu hơi lóng ngóng, cần xem kỹ hướng dẫn", "Cốc chứa chỉ khoảng 180ml/bên, mẹ nhiều sữa phải đổ giữa chừng", "Pin đủ khoảng 4–5 cữ, phải sạc mỗi ngày"],
    specs: [["Loại", "Điện đôi, không dây (wearable)"], ["Mức lực hút", "9 mức, 3 chế độ"], ["Dung tích cốc", "~180ml mỗi bên"], ["Pin", "Sạc Type-C, ~4–5 cữ/lần sạc"], ["Chất liệu", "Nhựa PP & silicone y tế, không BPA"], ["Bảo hành", "12 tháng (tuỳ shop)"]],
    sections: [
      { h: "Mở hộp & thiết kế", p: "Hộp gồm 2 cụm máy, 2 bộ phễu size 24mm (kèm miếng giảm size 21mm), dây sạc và túi đựng. Cầm lên khá nhẹ, mỗi bên chừng 200g. Khi đeo vào áo ngực cho con bú, nhìn từ ngoài chỉ hơi phồng — mặc áo khoác mỏng là gần như không ai để ý." },
      { h: "Lực hút & cảm giác khi dùng", p: "Chế độ kích sữa (rung nhanh, nhẹ) chạy khoảng 2 phút rồi chuyển sang chế độ hút. Ở mức 4–6, cảm giác khá giống bé bú, không đau. Trong 30 ngày dùng, lượng sữa mỗi cữ khoảng 120–160ml cả hai bên — ngang với máy để bàn cũ của mình, nhưng thời gian hút lâu hơn khoảng 3–5 phút." },
      { h: "Pin & tiếng ồn", p: "Sạc đầy mất khoảng 2 tiếng, dùng được 4–5 cữ 15 phút. Tiếng máy nhỏ, giống tiếng quạt laptop. Mình đã hút trong lúc họp online mà đồng nghiệp không phát hiện ra." },
      { h: "Vệ sinh", p: "Tháo rời được 5 bộ phận, không có khe hẹp khó chùi. Rửa bằng nước ấm và nước rửa bình, có thể cho vào máy tiệt trùng (trừ phần thân máy). Mất khoảng 5 phút cho 2 bên." }
    ],
    fitFor: ["Mẹ đi làm lại, cần hút sữa ở công ty", "Mẹ có con bám, cần rảnh tay", "Mẹ hay di chuyển, đi xa"],
    notFor: ["Mẹ cần kích sữa mạnh, nhiều sữa (>200ml/bên)", "Ngân sách dưới 800k"]
  },
  {
    id: "ghe-cong-thai-hoc", product: "ghe-cong-thai-hoc",
    title: "Ghế công thái học dưới 4 triệu: 3 tháng ngồi 10 tiếng/ngày, lưng thay đổi thế nào?",
    score: 8.4, readTime: 7, date: "02/11/2026", author: "Vun Vén",
    summary: "Khoản đầu tư đáng giá nhất cho người ngồi máy cả ngày. Tựa thắt lưng và tay vịn 4D làm rất tốt, lưới thoáng mát. Bù lại, lắp ráp mất ~30 phút và lưới ngồi hơi cứng với người dưới 50kg.",
    verdict: "Nếu bạn ngồi trên 6 tiếng/ngày, đây là món nên mua trước cả màn hình mới. Người nhỏ con nên ngồi thử hoặc chọn bản đệm mút.",
    scores: { "Đỡ lưng": 9, "Tuỳ chỉnh": 9, "Thoáng mát": 9, "Độ hoàn thiện": 7.5, "Lắp ráp": 7, "Giá trị": 8.5 },
    pros: ["Tựa thắt lưng chỉnh độ cao và độ sâu, ôm sát cột sống", "Tay vịn 4D, kê tay ngang bàn phím rất tự nhiên", "Lưng và đệm lưới thoáng, mùa hè ngồi không bí", "Ngả 135° có khoá, nghỉ trưa ngay tại bàn"],
    cons: ["Lắp ráp hơi mất công (~30 phút)", "Lưới đệm ngồi hơi cứng với người nhẹ cân", "Một số khớp nhựa chưa thật sự cao cấp"],
    specs: [["Chất liệu", "Lưới Hàn Quốc, khung nhựa PA + chân hợp kim nhôm"], ["Tựa đầu", "Chỉnh cao thấp & góc"], ["Tay vịn", "4D"], ["Góc ngả", "90°–135°, khoá nhiều nấc"], ["Tải trọng", "Tối đa ~150kg"], ["Bảo hành", "Khung 3 năm, piston 1 năm (tuỳ shop)"]],
    sections: [
      { h: "Vì sao founder nên đầu tư ghế trước tiên?", p: "Giai đoạn chạy MVP, mình ngồi trung bình 10 tiếng/ngày. Sau 2 tháng dùng ghế xoay văn phòng thường, lưng dưới bắt đầu nhức mỗi chiều. Một chiếc ghế tốt không làm bạn làm việc giỏi hơn, nhưng giúp bạn làm việc được lâu hơn mà không phải trả giá bằng sức khoẻ." },
      { h: "Trải nghiệm sau 3 tháng", p: "Tuần đầu cần làm quen vì tựa thắt lưng đẩy lưng thẳng hơn thói quen cũ. Từ tuần thứ hai, cơn nhức lưng chiều gần như biến mất. Tay vịn 4D giúp vai thả lỏng khi gõ phím — đây là điểm mình đánh giá cao nhất." },
      { h: "Lắp ráp & chất lượng hoàn thiện", p: "Hướng dẫn bằng hình khá dễ hiểu, cần 1 người làm khoảng 30 phút. Khung chắc, không ọp ẹp; tuy vậy vài chi tiết nhựa ở cần gạt hơi thô so với ghế 8–10 triệu. Ở tầm giá dưới 4 triệu thì chấp nhận được." },
      { h: "Mẹo chỉnh ghế đúng cách", p: "Chỉnh chiều cao sao cho đùi song song sàn, bàn chân chạm đất. Tựa thắt lưng đặt ngang thắt lưng (ngay trên cạp quần). Tay vịn ngang mặt bàn để khuỷu tay vuông góc 90°. Màn hình cao ngang tầm mắt." }
    ],
    fitFor: ["Founder, freelancer ngồi máy trên 6 tiếng/ngày", "Người đã bắt đầu đau lưng dưới", "Phòng làm việc nóng, cần ghế thoáng"],
    notFor: ["Người dưới 50kg (nên chọn bản đệm mút)", "Chỉ ngồi 1–2 tiếng/ngày"]
  },
  {
    id: "tai-nghe-anc", product: "tai-nghe-anc",
    title: "Tai nghe chống ồn dưới 1 triệu: có ‘chống ồn thật’ hay chỉ là quảng cáo?",
    score: 8.1, readTime: 5, date: "28/10/2026", author: "Vun Vén",
    summary: "Chống ồn đủ dùng cho xe buýt, quán cà phê, thư viện — giảm rõ tiếng ồn tần số thấp. Âm thanh hơi thiên bass, pin tốt. Đừng kỳ vọng bằng tai nghe 5–6 triệu, nhưng ở tầm giá này rất đáng tiền.",
    verdict: "Lựa chọn hời nhất cho sinh viên muốn trải nghiệm ANC lần đầu. Nếu bạn cần mic gọi điện thật tốt ở nơi đông người thì nên cân nhắc thêm.",
    scores: { "Chống ồn": 8, "Âm thanh": 8, "Pin": 8.5, "Đeo thoải mái": 8.5, "Mic": 7, "Giá trị": 9.5 },
    pros: ["ANC giảm rõ tiếng động cơ, điều hoà, tiếng xe", "Pin ~7 tiếng (bật ANC), cả hộp ~30 tiếng", "Có chế độ xuyên âm để nghe thông báo, nói chuyện", "App chỉnh EQ, cập nhật firmware"],
    cons: ["Mic thu cả tiếng ồn xung quanh khi gọi ở ngoài đường", "Âm bass hơi dày, nghe nhạc acoustic chưa thật mộc", "Hộp sạc nhựa bóng dễ trầy"],
    specs: [["Kết nối", "Bluetooth 5.3, độ trễ thấp khi chơi game"], ["Chống ồn", "ANC lai, tối đa ~40dB (theo nhà sản xuất)"], ["Pin", "~7h (ANC), tổng ~30h với hộp"], ["Sạc", "Type-C, sạc nhanh 10 phút = 2h"], ["Kháng nước", "IPX4"], ["Bảo hành", "12 tháng (tuỳ shop)"]],
    sections: [
      { h: "Chống ồn có thật không?", p: "Có — với tiếng ồn đều và trầm như động cơ xe buýt, máy lạnh, tiếng quạt, ANC giảm rất rõ. Với tiếng người nói chuyện (tần số cao) thì chỉ giảm một phần. Trong thư viện hay quán cà phê, bật ANC + nhạc nhỏ là đủ tập trung." },
      { h: "Chất âm", p: "Mặc định thiên bass, nghe nhạc pop, EDM, rap rất 'đã'. Vào app chỉnh EQ giảm bớt dải trầm thì nghe ballad, podcast cân bằng hơn. Độ chi tiết ở mức khá so với tầm giá." },
      { h: "Đeo cả ngày có đau tai không?", p: "Mỗi bên khoảng 5g, kèm 3 size nút tai. Mình đeo liên tục 3 tiếng học online không bị nhức. Chọn đúng size nút tai cũng giúp chống ồn thụ động tốt hơn." }
    ],
    fitFor: ["Sinh viên học thư viện, đi xe buýt", "Người làm việc ở quán cà phê", "Ai muốn thử ANC lần đầu với ngân sách nhỏ"],
    notFor: ["Người hay gọi điện ở nơi đông người", "Audiophile cần âm thanh trung tính"]
  }
];
