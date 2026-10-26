export const contact = {
  name: "Jolie Studio",
  phone: "098 789 92 76",
  phoneHref: "tel:+84987899276",
  zalo: "https://zalo.me/84987899276",
  messenger: "https://m.me/61566406026492",
  facebook: "https://www.facebook.com/profile.php?id=61566406026492",
  maps: "https://maps.app.goo.gl/UostKnpxR3kqCf677",
  city: "TP Hồ Chí Minh",
};

export const concepts: Record<string, string> = {
  "so-mi-trang": "Sơ mi trắng",
  "so-mi-ke": "Trắng đen nghệ thuật",
  "denim-trang": "Denim tối giản",
  "vest-den": "Vest đen",
  "hoa-vang": "Nắng hoa vàng",
  "mu-hong": "Ngọt ngào hồng",
  "trang-hoa-ly": "Hoa ly trắng",
  "lua-hoa-ly-nen-nau": "Lụa & hoa ly",
  "hoa-ly-nen-xanh": "Hoa ly nền rêu",
  "ao-dai-tra": "Áo dài & trà",
  "vay-xanh-hoa-hong": "Váy xanh hoa hồng",
  "long-thu": "Khoác lông",
  "quoc-khanh": "Áo dài cờ đỏ",
  lookbook: "Lookbook",
};

export const services = [
  {
    title: "Chân dung cá nhân",
    desc: "Những khung hình giản dị, tập trung vào thần thái và nét riêng của bạn.",
    img: "/so-mi-trang/so-mi-trang-03.webp",
  },
  {
    title: "Concept thời trang",
    desc: "Phục trang, bối cảnh và ánh sáng được dàn dựng theo từng câu chuyện.",
    img: "/hoa-vang/hoa-vang-01.webp",
  },
  {
    title: "Nghệ thuật trắng đen",
    desc: "Ánh sáng tương phản, đường nét rõ ràng — vẻ đẹp không phụ thuộc vào màu sắc.",
    img: "/so-mi-ke/so-mi-ke-04.webp",
  },
  {
    title: "Beauty / cận mặt",
    desc: "Khung hình cận, ánh sáng mềm, tôn lên làn da và từng chi tiết trang điểm.",
    img: "/trang-hoa-ly/trang-hoa-ly-06.webp",
  },
  {
    title: "Concept riêng",
    desc: "Bạn có ý tưởng? Studio cùng bạn lên moodboard và hiện thực hoá nó.",
    img: "/ao-dai-tra/ao-dai-tra-03.webp",
  },
];

// TODO: xác nhận giá và quyền lợi thực tế với studio
export const packages = [
  {
    name: "Basic",
    price: "Liên hệ",
    items: ["1 concept", "1 trang phục", "10 ảnh chỉnh sửa", "Toàn bộ file gốc"],
  },
  {
    name: "Signature",
    price: "Liên hệ",
    featured: true,
    items: ["2 concept", "Hỗ trợ makeup & làm tóc", "25 ảnh chỉnh sửa", "Toàn bộ file gốc"],
  },
  {
    name: "Concept riêng",
    price: "Theo yêu cầu",
    items: ["Lên moodboard cùng studio", "Phục trang & bối cảnh riêng", "Số ảnh theo thoả thuận", "Tư vấn trước buổi chụp"],
  },
];
