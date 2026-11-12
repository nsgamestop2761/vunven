/* =========================================================
   VUN VÉN — DỮ LIỆU SẢN PHẨM
   ---------------------------------------------------------
   👉 Muốn đổi sản phẩm / giá / link affiliate: chỉ cần sửa file này.
   - link.shopee / link.lazada / link.tiktok: dán link affiliate của bạn.
     Để "" (rỗng) nếu không có => nút sàn đó sẽ tự ẩn.
   - price: giá tham khảo (VNĐ, số nguyên) — dùng cho bộ lọc ngân sách.
   - review: id bài review (trong REVIEWS bên dưới) nếu có.
   ========================================================= */

const PERSONAS = [
  {
    id: "me-bim", name: "Mẹ bỉm sữa", emoji: "🍼", color: "#FF6B9A",
    tagline: "Ngủ ít, việc nhiều — cần đồ giúp rảnh tay",
    desc: "Giai đoạn 0–12 tháng là lúc mẹ thiếu ngủ nhất. Ưu tiên đồ giúp tiết kiệm từng phút, an toàn cho bé và dễ vệ sinh.",
    needs: ["Rảnh tay", "An toàn cho bé", "Dễ vệ sinh"],
    products: [
      { name: "Máy hút sữa điện đôi không dây", emoji: "🍼", price: 1290000, rating: 4.8, tag: "Best seller", review: "may-hut-sua",
        why: "Đeo gọn trong áo, vừa hút vừa ru con. Chọn loại có từ 9 mức lực hút trở lên.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Máy tiệt trùng sấy khô bình sữa UV", emoji: "🫧", price: 1590000, rating: 4.7, tag: "Đáng tiền",
        why: "Tiệt trùng + sấy khô một lần, khỏi úp bình lỉnh kỉnh khắp bếp.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Địu em bé trợ lực hông", emoji: "👶", price: 650000, rating: 4.6, tag: "",
        why: "Chia lực xuống hông, bế cả buổi không mỏi vai, tay vẫn rảnh làm việc.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Máy hâm sữa & giữ nhiệt cữ đêm", emoji: "🌙", price: 450000, rating: 4.5, tag: "",
        why: "Cữ 2h sáng chỉ mất 3 phút, không phải lò dò xuống bếp.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Kem dưỡng ngừa rạn da sau sinh", emoji: "🌸", price: 320000, rating: 4.4, tag: "",
        why: "Thoa từ tháng thứ 4 thai kỳ, chọn loại không mùi để bé không bị kích ứng.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "khoi-nghiep", name: "Dân khởi nghiệp", emoji: "🚀", color: "#6C5CE7",
    tagline: "Một người gánh cả team — cần đồ tăng tốc",
    desc: "Founder ngồi máy 12 tiếng, họp online liên tục, gặp khách bất chợt. Đầu tư vào sức khoẻ và hình ảnh chuyên nghiệp là đầu tư sinh lời.",
    needs: ["Năng suất", "Chuyên nghiệp", "Bền bỉ"],
    products: [
      { name: "Ghế công thái học lưới full chỉnh", emoji: "🪑", price: 3490000, rating: 4.8, tag: "Đầu tư nên có", review: "ghe-cong-thai-hoc",
        why: "Tựa lưng chỉnh được, đỡ thắt lưng — ngồi 10 tiếng vẫn tỉnh táo.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Màn hình di động 15.6 inch", emoji: "🖥️", price: 2590000, rating: 4.6, tag: "Hot",
        why: "Biến laptop thành 2 màn ở bất cứ đâu, demo sản phẩm cho khách ngay tại quán cà phê.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Webcam 2K kèm đèn ring", emoji: "🎥", price: 890000, rating: 4.5, tag: "",
        why: "Gọi với nhà đầu tư trông sáng sủa, rõ nét — ấn tượng đầu tiên rất quan trọng.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Sổ kế hoạch OKR 12 tuần", emoji: "📒", price: 189000, rating: 4.4, tag: "",
        why: "Chia mục tiêu quý thành việc từng tuần, rất hợp để theo dõi tiến độ startup.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Sách “Khởi nghiệp tinh gọn”", emoji: "📚", price: 120000, rating: 4.7, tag: "Kinh điển",
        why: "Gối đầu giường của founder: thử nghiệm nhanh, học từ khách hàng, đỡ đốt tiền.", link: { shopee: "#", lazada: "#", tiktok: "#" } }
    ]
  },
  {
    id: "van-phong", name: "Dân văn phòng", emoji: "💼", color: "#0984E3",
    tagline: "8 tiếng ngồi máy lạnh — cứu lưng, cứu mắt",
    desc: "Đau vai gáy, khô mắt, quên uống nước là 'bệnh nghề nghiệp' của dân công sở. Vài món nhỏ trên bàn làm việc đổi lại cả ngày dễ chịu.",
    needs: ["Đỡ mỏi", "Gọn bàn", "Giá mềm"],
    products: [
      { name: "Máy massage cổ vai gáy", emoji: "💆", price: 690000, rating: 4.6, tag: "Best seller",
        why: "15 phút giờ nghỉ trưa là vai gáy nhẹ hẳn. Chọn loại có chế độ chườm ấm.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Đèn treo màn hình chống chói", emoji: "💡", price: 590000, rating: 4.7, tag: "",
        why: "Chiếu sáng bàn phím mà không hắt lên màn, mắt bớt mỏi khi làm tối.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Bình giữ nhiệt 900ml có vạch nhắc giờ", emoji: "🥤", price: 250000, rating: 4.5, tag: "",
        why: "Nhìn vạch là biết mình uống đủ nước chưa. Giữ lạnh cả ngày.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Gối tựa lưng memory foam", emoji: "🛋️", price: 299000, rating: 4.4, tag: "Rẻ mà hay",
        why: "Ghế công ty cứng? Một chiếc gối tựa là đỡ thắt lưng ngay.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Kê tay & lót chuột công thái học", emoji: "🖱️", price: 159000, rating: 4.3, tag: "",
        why: "Giảm tê cổ tay khi dùng chuột nhiều, giá chưa bằng một ly trà sữa đôi.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "sinh-vien", name: "Sinh viên / Gen Z", emoji: "🎓", color: "#00B894",
    tagline: "Ví mỏng nhưng phải xịn — đồ ngon bổ rẻ",
    desc: "Ở trọ, học online, đi làm thêm — đồ cần đa năng, bền và giá dễ thở. Toàn món dưới 800k.",
    needs: ["Giá sinh viên", "Đa năng", "Phòng trọ nhỏ"],
    products: [
      { name: "Tai nghe true wireless chống ồn ANC", emoji: "🎧", price: 790000, rating: 4.6, tag: "Hot", review: "tai-nghe-anc",
        why: "Học thư viện, đi xe buýt đều yên tĩnh. Dưới 1 triệu mà có ANC là quá hời.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Nồi lẩu điện mini đa năng", emoji: "🍜", price: 350000, rating: 4.5, tag: "Phòng trọ",
        why: "Nấu mì, lẩu, luộc trứng, hấp bánh — một nồi cân hết bữa tối.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Đèn học LED chống cận", emoji: "🔆", price: 280000, rating: 4.5, tag: "",
        why: "Ánh sáng không nhấp nháy, chỉnh 3 tông màu, ôn thi xuyên đêm đỡ mỏi mắt.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Sạc dự phòng 20.000mAh sạc nhanh", emoji: "🔋", price: 390000, rating: 4.4, tag: "",
        why: "Sạc điện thoại 4–5 lần, có cổng Type-C để sạc cả tai nghe, máy tính bảng.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Balo laptop chống nước", emoji: "🎒", price: 420000, rating: 4.3, tag: "",
        why: "Ngăn chống sốc cho laptop 15.6 inch, mưa bất chợt cũng không lo.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "gymer", name: "Gymer & sống healthy", emoji: "💪", color: "#E17055",
    tagline: "Giữ dáng bền vững, không cần cực khổ",
    desc: "Dù mới tập hay đã lên cơ, đo lường được thì mới tiến bộ được. Bộ đồ này giúp bạn theo dõi và phục hồi tốt hơn.",
    needs: ["Đo lường", "Phục hồi", "Tập tại nhà"],
    products: [
      { name: "Đồng hồ thông minh đo nhịp tim", emoji: "⌚", price: 1190000, rating: 4.6, tag: "Best seller",
        why: "Theo dõi nhịp tim, giấc ngủ, bước chân — pin 10+ ngày.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Súng massage giãn cơ mini", emoji: "💥", price: 690000, rating: 4.5, tag: "",
        why: "Giãn cơ sau buổi tập chân, đỡ đau mỏi hôm sau. Nhỏ gọn bỏ túi gym.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Cân điện tử đo mỡ cơ thể", emoji: "⚖️", price: 350000, rating: 4.4, tag: "",
        why: "Đo % mỡ, cơ, nước — đồng bộ app để thấy rõ tiến độ giảm mỡ.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Thảm yoga TPE dày 8mm", emoji: "🧘", price: 290000, rating: 4.5, tag: "",
        why: "Êm gối, chống trơn, không mùi cao su — tập tại nhà thoải mái.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Bình lắc whey 700ml", emoji: "🥛", price: 120000, rating: 4.3, tag: "Rẻ mà hay",
        why: "Có lò xo đánh tan, ngăn đựng bột riêng, không rò rỉ.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "skincare", name: "Tín đồ skincare", emoji: "✨", color: "#E84393",
    tagline: "Da đẹp là khoản đầu tư dài hạn",
    desc: "Không cần 10 bước — chỉ cần đúng món, đúng thứ tự và kiên trì. Đây là bộ 'nền móng' ai cũng nên có.",
    needs: ["Chống nắng", "Làm sạch", "Bảo quản"],
    products: [
      { name: "Kem chống nắng phổ rộng SPF50+ PA++++", emoji: "☀️", price: 280000, rating: 4.8, tag: "Bắt buộc có",
        why: "Bước quan trọng nhất của skincare. Chọn kết cấu mỏng nhẹ, không bết.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Serum Vitamin C 15%", emoji: "🍊", price: 350000, rating: 4.5, tag: "",
        why: "Làm sáng da, mờ thâm. Dùng buổi sáng trước kem chống nắng.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Máy rửa mặt silicone sóng âm", emoji: "🫧", price: 450000, rating: 4.4, tag: "",
        why: "Làm sạch sâu lỗ chân lông mà không chà xát, sạc 1 lần dùng cả tháng.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Gương LED trang điểm 3 chế độ sáng", emoji: "🪞", price: 390000, rating: 4.5, tag: "",
        why: "Ánh sáng chuẩn để tán nền đều màu, không bị 'lệch tông' khi ra đường.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Tủ lạnh mini đựng mỹ phẩm", emoji: "🧊", price: 1190000, rating: 4.3, tag: "Sang chảnh",
        why: "Bảo quản serum, mặt nạ ở nhiệt độ ổn định — đặt bàn trang điểm rất xinh.", link: { shopee: "#", lazada: "#", tiktok: "" } }
    ]
  },
  {
    id: "o-rieng", name: "Mới ra ở riêng", emoji: "🏠", color: "#F0A500",
    tagline: "Lần đầu tự lo — sắm thông minh, khỏi phí",
    desc: "Lần đầu dọn ra ở riêng, cái gì cũng muốn mua. Đây là những món 'một vốn bốn lời' giúp nhà gọn, ăn ngon, sống khoẻ.",
    needs: ["Tiết kiệm thời gian", "Nấu nhanh", "Nhà sạch"],
    products: [
      { name: "Nồi chiên không dầu 5L", emoji: "🍗", price: 1290000, rating: 4.7, tag: "Must have",
        why: "Gà, cá, khoai, bánh mì nướng — bữa tối 15 phút, ít dầu mỡ, dễ rửa.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Robot hút bụi lau nhà", emoji: "🤖", price: 3990000, rating: 4.6, tag: "Đáng tiền",
        why: "Đi làm về là nhà đã sạch. Chọn loại có bản đồ LiDAR để không sót góc.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Máy lọc không khí mini", emoji: "🌬️", price: 1490000, rating: 4.5, tag: "",
        why: "Phòng ngủ 20m² trong lành hơn hẳn mùa bụi mịn.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Bộ hộp thủy tinh đựng thực phẩm", emoji: "🥗", price: 350000, rating: 4.5, tag: "",
        why: "Meal-prep cả tuần, cho thẳng vào lò vi sóng, không ám mùi.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Ổ cắm thông minh hẹn giờ", emoji: "🔌", price: 190000, rating: 4.3, tag: "",
        why: "Bật tắt thiết bị qua app, hẹn giờ cho đỡ quên — đi xa cũng yên tâm.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "du-lich", name: "Dân xê dịch", emoji: "✈️", color: "#00A8A8",
    tagline: "Đi nhẹ, đi nhiều, đi đâu cũng sống ảo",
    desc: "Hành lý gọn = chuyến đi nhẹ đầu. Bộ đồ nghề giúp bạn xếp đồ nhanh, ngủ ngon trên xe và có ảnh đẹp mà không cần nhờ ai.",
    needs: ["Gọn nhẹ", "Bền", "Chụp ảnh"],
    products: [
      { name: "Vali khung nhôm 20 inch xách tay", emoji: "🧳", price: 1590000, rating: 4.6, tag: "Best seller",
        why: "Vừa chuẩn xách tay 7kg, bánh xe xoay 360° êm, khoá TSA.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Gậy selfie kiêm tripod Bluetooth", emoji: "🤳", price: 250000, rating: 4.5, tag: "",
        why: "Đi một mình vẫn có ảnh toàn thân, có remote chụp từ xa.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Bộ túi chia ngăn hành lý", emoji: "👜", price: 150000, rating: 4.4, tag: "Rẻ mà hay",
        why: "Quần áo, đồ lót, sạc cáp mỗi thứ một túi — mở vali là thấy ngay.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Gối kê cổ memory foam", emoji: "😴", price: 180000, rating: 4.3, tag: "",
        why: "Ngủ trên máy bay, xe giường nằm không bị vẹo cổ.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Ổ chuyển đổi điện đa quốc gia", emoji: "🌍", price: 220000, rating: 4.5, tag: "",
        why: "Dùng được ở 150+ nước, có sẵn 4 cổng USB sạc cùng lúc.", link: { shopee: "#", lazada: "#", tiktok: "" } }
    ]
  },
  {
    id: "game-thu", name: "Game thủ", emoji: "🎮", color: "#D63031",
    tagline: "Setup chuẩn — leo rank không lý do",
    desc: "Phản hồi nhanh, ngồi lâu không mỏi, góc máy lung linh. Bộ setup tầm trung mà cảm giác cao cấp.",
    needs: ["Độ trễ thấp", "Ngồi lâu", "Đẹp góc máy"],
    products: [
      { name: "Bàn phím cơ hot-swap 75%", emoji: "⌨️", price: 890000, rating: 4.7, tag: "Hot",
        why: "Thay switch không cần hàn, gõ êm, đèn RGB từng phím.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Chuột gaming siêu nhẹ 60g", emoji: "🖱️", price: 590000, rating: 4.6, tag: "",
        why: "Nhẹ tay, cảm biến chính xác, flick bắn FPS cực đã.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Tai nghe gaming âm thanh vòm 7.1", emoji: "🎧", price: 690000, rating: 4.4, tag: "",
        why: "Nghe rõ hướng bước chân địch, mic khử ồn cho team voice.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Ghế gaming ngả 160°", emoji: "🪑", price: 2490000, rating: 4.3, tag: "",
        why: "Tựa đầu, gối lưng đi kèm, ngả ra nghỉ giữa các trận.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Dải đèn LED RGB sau màn hình", emoji: "🌈", price: 220000, rating: 4.5, tag: "Rẻ mà hay",
        why: "Đổi màu theo nhạc/game, góc máy lên đời chỉ với 200k.", link: { shopee: "#", lazada: "", tiktok: "#" } }
    ]
  },
  {
    id: "bieu-bo-me", name: "Quà biếu bố mẹ", emoji: "🎁", color: "#8D6E63",
    tagline: "Thương bố mẹ — chọn món dùng mỗi ngày",
    desc: "Quà cho bố mẹ không cần đắt, cần dùng được hằng ngày và tốt cho sức khoẻ. Món nào cũng dễ dùng, nút bấm to rõ.",
    needs: ["Sức khoẻ", "Dễ dùng", "Bền"],
    products: [
      { name: "Máy đo huyết áp bắp tay", emoji: "🩺", price: 790000, rating: 4.8, tag: "Nên có",
        why: "Màn hình số to, có giọng đọc kết quả, lưu lịch sử đo cho cả 2 người.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Máy massage chân áp suất khí", emoji: "🦶", price: 1890000, rating: 4.6, tag: "Quà Tết",
        why: "Bố mẹ xem TV vừa massage chân, tuần hoàn máu tốt, ngủ ngon hơn.", link: { shopee: "#", lazada: "#", tiktok: "" } },
      { name: "Nồi cơm điện cao tần 1.5L", emoji: "🍚", price: 2190000, rating: 4.7, tag: "",
        why: "Cơm chín đều, dẻo thơm, có chế độ nấu cháo, cơm gạo lứt.", link: { shopee: "#", lazada: "#", tiktok: "#" } },
      { name: "Ấm siêu tốc giữ nhiệt pha trà", emoji: "🫖", price: 490000, rating: 4.5, tag: "",
        why: "Chọn sẵn nhiệt độ cho trà xanh, giữ ấm cả buổi sáng.", link: { shopee: "#", lazada: "", tiktok: "#" } },
      { name: "Đèn ngủ cảm biến chuyển động", emoji: "💡", price: 150000, rating: 4.4, tag: "Rẻ mà hay",
        why: "Tự sáng khi bố mẹ dậy đêm, tránh vấp ngã ở hành lang, cầu thang.", link: { shopee: "#", lazada: "#", tiktok: "#" } }
    ]
  }
];

/* =========================================================
   BÀI REVIEW MẪU
   Đây là bài mẫu để bạn thay bằng trải nghiệm thật của mình.
   ========================================================= */
const REVIEWS = [
  {
    id: "may-hut-sua",
    persona: "me-bim",
    emoji: "🍼",
    title: "Review máy hút sữa điện đôi không dây sau 30 ngày: có đáng 1,3 triệu?",
    product: "Máy hút sữa điện đôi không dây",
    price: 1290000,
    score: 8.7,
    readTime: 6,
    date: "10/11/2026",
    author: "Vun Vén",
    summary: "Gọn, êm, rảnh tay thật sự — rất hợp mẹ đi làm lại hoặc mẹ có con bám. Điểm trừ là phễu hơi khó lắp lần đầu và lượng sữa có thể thấp hơn máy để bàn với một số mẹ.",
    verdict: "Nên mua nếu bạn cần hút sữa lúc đang làm việc khác. Nếu chỉ hút ở nhà và cần tối đa lượng sữa, máy để bàn vẫn ổn định hơn.",
    scores: { "Thiết kế": 9, "Lực hút": 8.5, "Độ êm": 9, "Pin": 8, "Dễ vệ sinh": 8.5, "Giá trị": 9 },
    pros: [
      "Đeo gọn trong áo ngực, không dây rợ — vừa hút vừa bế con, gõ máy tính được",
      "9 mức lực hút + 3 chế độ (kích sữa, hút, massage) dễ tinh chỉnh",
      "Tiếng ồn nhỏ (khoảng 45dB), hút trong phòng họp vẫn kín đáo",
      "Phễu silicone mềm, ít gây đau đầu ti"
    ],
    cons: [
      "Lần đầu lắp phễu hơi lóng ngóng, cần xem kỹ hướng dẫn",
      "Cốc chứa chỉ khoảng 180ml/bên, mẹ nhiều sữa phải đổ giữa chừng",
      "Pin đủ khoảng 4–5 cữ, phải sạc mỗi ngày"
    ],
    specs: [
      ["Loại", "Điện đôi, không dây (wearable)"],
      ["Mức lực hút", "9 mức, 3 chế độ"],
      ["Dung tích cốc", "~180ml mỗi bên"],
      ["Pin", "Sạc Type-C, ~4–5 cữ/lần sạc"],
      ["Chất liệu", "Nhựa PP & silicone y tế, không BPA"],
      ["Bảo hành", "12 tháng (tuỳ shop)"]
    ],
    sections: [
      { h: "Mở hộp & thiết kế", p: "Hộp gồm 2 cụm máy, 2 bộ phễu size 24mm (kèm miếng giảm size 21mm), dây sạc và túi đựng. Cầm lên khá nhẹ, mỗi bên chừng 200g. Khi đeo vào áo ngực cho con bú, nhìn từ ngoài chỉ hơi phồng — mặc áo khoác mỏng là gần như không ai để ý." },
      { h: "Lực hút & cảm giác khi dùng", p: "Chế độ kích sữa (rung nhanh, nhẹ) chạy khoảng 2 phút rồi chuyển sang chế độ hút. Ở mức 4–6, cảm giác khá giống bé bú, không đau. Trong 30 ngày dùng, lượng sữa mỗi cữ khoảng 120–160ml cả hai bên — ngang với máy để bàn cũ của mình, nhưng thời gian hút lâu hơn khoảng 3–5 phút." },
      { h: "Pin & tiếng ồn", p: "Sạc đầy mất khoảng 2 tiếng, dùng được 4–5 cữ 15 phút. Tiếng máy nhỏ, giống tiếng quạt laptop. Mình đã hút trong lúc họp online mà đồng nghiệp không phát hiện ra." },
      { h: "Vệ sinh", p: "Tháo rời được 5 bộ phận, không có khe hẹp khó chùi. Rửa bằng nước ấm và nước rửa bình, có thể cho vào máy tiệt trùng (trừ phần thân máy). Mất khoảng 5 phút cho 2 bên." }
    ],
    fitFor: ["Mẹ đi làm lại, cần hút sữa ở công ty", "Mẹ có con bám, cần rảnh tay", "Mẹ hay di chuyển, đi xa"],
    notFor: ["Mẹ cần kích sữa mạnh, nhiều sữa (>200ml/bên)", "Ngân sách dưới 800k"],
    link: { shopee: "#", lazada: "#", tiktok: "#" }
  },
  {
    id: "ghe-cong-thai-hoc",
    persona: "khoi-nghiep",
    emoji: "🪑",
    title: "Ghế công thái học dưới 4 triệu: 3 tháng ngồi 10 tiếng/ngày, lưng mình thay đổi thế nào?",
    product: "Ghế công thái học lưới full chỉnh",
    price: 3490000,
    score: 8.4,
    readTime: 7,
    date: "02/11/2026",
    author: "Vun Vén",
    summary: "Khoản đầu tư đáng giá nhất cho người ngồi máy cả ngày. Tựa thắt lưng và tay vịn 4D làm rất tốt, lưới thoáng mát. Bù lại, lắp ráp mất ~30 phút và lưới ngồi hơi cứng với người dưới 50kg.",
    verdict: "Nếu bạn ngồi trên 6 tiếng/ngày, đây là món nên mua trước cả màn hình mới. Người nhỏ con nên ngồi thử hoặc chọn bản đệm mút.",
    scores: { "Đỡ lưng": 9, "Tuỳ chỉnh": 9, "Thoáng mát": 9, "Độ hoàn thiện": 7.5, "Lắp ráp": 7, "Giá trị": 8.5 },
    pros: [
      "Tựa thắt lưng chỉnh độ cao và độ sâu, ôm sát cột sống",
      "Tay vịn 4D, kê tay ngang bàn phím rất tự nhiên",
      "Lưng và đệm lưới thoáng, mùa hè ngồi không bí",
      "Ngả 135° có khoá, nghỉ trưa ngay tại bàn"
    ],
    cons: [
      "Lắp ráp hơi mất công (~30 phút)",
      "Lưới đệm ngồi hơi cứng với người nhẹ cân",
      "Một số khớp nhựa chưa thật sự cao cấp"
    ],
    specs: [
      ["Chất liệu", "Lưới Hàn Quốc, khung nhựa PA + chân hợp kim nhôm"],
      ["Tựa đầu", "Chỉnh cao thấp & góc"],
      ["Tay vịn", "4D"],
      ["Góc ngả", "90°–135°, khoá nhiều nấc"],
      ["Tải trọng", "Tối đa ~150kg"],
      ["Bảo hành", "Khung 3 năm, piston 1 năm (tuỳ shop)"]
    ],
    sections: [
      { h: "Vì sao founder nên đầu tư ghế trước tiên?", p: "Giai đoạn chạy MVP, mình ngồi trung bình 10 tiếng/ngày. Sau 2 tháng dùng ghế xoay văn phòng thường, lưng dưới bắt đầu nhức mỗi chiều. Một chiếc ghế tốt không làm bạn làm việc giỏi hơn, nhưng giúp bạn làm việc được lâu hơn mà không phải trả giá bằng sức khoẻ." },
      { h: "Trải nghiệm sau 3 tháng", p: "Tuần đầu cần làm quen vì tựa thắt lưng đẩy lưng thẳng hơn thói quen cũ. Từ tuần thứ hai, cơn nhức lưng chiều gần như biến mất. Tay vịn 4D giúp vai thả lỏng khi gõ phím — đây là điểm mình đánh giá cao nhất." },
      { h: "Lắp ráp & chất lượng hoàn thiện", p: "Hướng dẫn bằng hình khá dễ hiểu, cần 1 người làm khoảng 30 phút. Khung chắc, không ọp ẹp; tuy vậy vài chi tiết nhựa ở cần gạt hơi thô so với ghế 8–10 triệu. Ở tầm giá dưới 4 triệu thì chấp nhận được." },
      { h: "Mẹo chỉnh ghế đúng cách", p: "Chỉnh chiều cao sao cho đùi song song sàn, bàn chân chạm đất. Tựa thắt lưng đặt ngang thắt lưng (ngay trên cạp quần). Tay vịn ngang mặt bàn để khuỷu tay vuông góc 90°. Màn hình cao ngang tầm mắt." }
    ],
    fitFor: ["Founder, freelancer ngồi máy trên 6 tiếng/ngày", "Người đã bắt đầu đau lưng dưới", "Phòng làm việc nóng, cần ghế thoáng"],
    notFor: ["Người dưới 50kg (nên chọn bản đệm mút)", "Chỉ ngồi 1–2 tiếng/ngày"],
    link: { shopee: "#", lazada: "#", tiktok: "" }
  },
  {
    id: "tai-nghe-anc",
    persona: "sinh-vien",
    emoji: "🎧",
    title: "Tai nghe chống ồn dưới 1 triệu: liệu có ‘chống ồn thật’ hay chỉ là quảng cáo?",
    product: "Tai nghe true wireless chống ồn ANC",
    price: 790000,
    score: 8.1,
    readTime: 5,
    date: "28/10/2026",
    author: "Vun Vén",
    summary: "Chống ồn đủ dùng cho xe buýt, quán cà phê, thư viện — giảm rõ tiếng ồn tần số thấp. Âm thanh hơi thiên bass, pin tốt. Đừng kỳ vọng bằng tai nghe 5–6 triệu, nhưng ở tầm giá này rất đáng tiền.",
    verdict: "Lựa chọn hời nhất cho sinh viên muốn trải nghiệm ANC lần đầu. Nếu bạn cần mic gọi điện thật tốt ở nơi đông người thì nên cân nhắc thêm.",
    scores: { "Chống ồn": 8, "Âm thanh": 8, "Pin": 8.5, "Đeo thoải mái": 8.5, "Mic": 7, "Giá trị": 9.5 },
    pros: [
      "ANC giảm rõ tiếng động cơ, điều hoà, tiếng xe",
      "Pin ~7 tiếng (bật ANC), cả hộp ~30 tiếng",
      "Có chế độ xuyên âm để nghe thông báo, nói chuyện",
      "App chỉnh EQ, cập nhật firmware"
    ],
    cons: [
      "Mic thu cả tiếng ồn xung quanh khi gọi ở ngoài đường",
      "Âm bass hơi dày, nghe nhạc acoustic chưa thật mộc",
      "Hộp sạc nhựa bóng dễ trầy"
    ],
    specs: [
      ["Kết nối", "Bluetooth 5.3, độ trễ thấp khi chơi game"],
      ["Chống ồn", "ANC lai, tối đa ~40dB (theo nhà sản xuất)"],
      ["Pin", "~7h (ANC), tổng ~30h với hộp"],
      ["Sạc", "Type-C, có sạc nhanh 10 phút = 2h"],
      ["Kháng nước", "IPX4"],
      ["Bảo hành", "12 tháng (tuỳ shop)"]
    ],
    sections: [
      { h: "Chống ồn có thật không?", p: "Có — với tiếng ồn đều và trầm như động cơ xe buýt, máy lạnh, tiếng quạt, ANC giảm rất rõ. Với tiếng người nói chuyện (tần số cao) thì chỉ giảm một phần. Trong thư viện hay quán cà phê, bật ANC + nhạc nhỏ là đủ tập trung." },
      { h: "Chất âm", p: "Mặc định thiên bass, nghe nhạc pop, EDM, rap rất 'đã'. Vào app chỉnh EQ giảm bớt dải trầm thì nghe ballad, podcast cân bằng hơn. Độ chi tiết ở mức khá so với tầm giá." },
      { h: "Đeo cả ngày có đau tai không?", p: "Mỗi bên khoảng 5g, kèm 3 size nút tai. Mình đeo liên tục 3 tiếng học online không bị nhức. Chọn đúng size nút tai cũng giúp chống ồn thụ động tốt hơn." }
    ],
    fitFor: ["Sinh viên học thư viện, đi xe buýt", "Người làm việc ở quán cà phê", "Ai muốn thử ANC lần đầu với ngân sách nhỏ"],
    notFor: ["Người hay gọi điện ở nơi đông người", "Audiophile cần âm thanh trung tính"],
    link: { shopee: "#", lazada: "#", tiktok: "#" }
  }
];

const SHOPS = {
  shopee: { name: "Shopee", color: "#EE4D2D" },
  lazada: { name: "Lazada", color: "#0F146D" },
  tiktok: { name: "TikTok Shop", color: "#111111" }
};
