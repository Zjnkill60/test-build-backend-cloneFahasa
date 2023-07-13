"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_ARRAY = exports.USER_ARRAY = void 0;
const passwordHash = require("password-hash");
const genarateHashPassword = (password) => {
    let passwordHashReturn = passwordHash.generate(password);
    return passwordHashReturn;
};
exports.USER_ARRAY = [{
        name: "Đức Anh",
        email: "zjnkill18@gmail.com",
        password: genarateHashPassword("nho812005"),
        phoneNumber: "0984627906",
        role: "ADMIN",
        avatar: "hoidanit-1688431246894.png"
    }, {
        name: "Tôi là Admin",
        email: "admin@gmail.com",
        password: genarateHashPassword("123456"),
        phoneNumber: "0123456789",
        role: "ADMIN",
        avatar: "hoidanit-1688431246894.png"
    }, {
        name: "Tôi là User",
        email: "user@gmail.com",
        password: genarateHashPassword("123456"),
        phoneNumber: "09876543321",
        role: "USER",
        avatar: "hoidanit-1688431246894.png"
    }];
exports.PRODUCT_ARRAY = [{
        mainText: "Khoa Học - Khái Lược Những Tư Tưởng Lớn - Bìa Cứng (Tái Bản 2023)",
        author: "DK",
        category: "KHOA HỌC KỸ THUẬT",
        price: 405000,
        sold: 20,
        thumbnail: "b_a-1---khoa-h_c---copy.jpg",
        slider: ["khoa-h_c---3d.jpg", "1_185_24.jpg"]
    }, {
        mainText: "Heidi - Bìa Cứng (Tái Bản 2023)",
        author: "Johanna Spyri, Elena Selivan",
        category: " VĂN HỌC",
        price: 252000,
        sold: 20,
        thumbnail: "b_a-1---heidi---copy.jpg",
        slider: ["3_103_8.jpg", "2_126_21.jpg"]
    }, {
        mainText: "Việt Nam Văn Hoá Sử Cương - Bìa Cứng",
        author: " Đào Duy Anh",
        category: "VĂN HÓA - NGHỆ THUẬT",
        price: 351000,
        sold: 20,
        thumbnail: "b_a-ngo_i.jpg",
        slider: ["b_a-1---b_a-ngo_i.jpg", "2023_06_07_10_51_32_1-390x510.jpg"]
    }, {
        mainText: "Thống Khổ Và Phiêu Linh - Bìa Cứng",
        author: "Irving Stone",
        category: "VĂN HỌC",
        price: 450000,
        sold: 20,
        thumbnail: "bia-1---thai-binh-thien-quoc-dien-nghia.jpg",
        slider: ["2023_06_07_10_51_32_1-390x51023414.jpg.jpg"]
    }, {
        mainText: "Thái Bình Thiên Quốc Diễn Nghĩa - Bìa Cứng ",
        author: "Hoàng Tiểu Phối",
        category: " VĂN HỌC",
        price: 378000,
        sold: 20,
        thumbnail: "b_a-1---ngh_-thu_t.jpg",
        slider: ["2023_06_07_10_51_32_1-390x513434.jpg", "2023_06_07_10_51_32_3-390x510.jpg"]
    }, {
        mainText: "Nghệ Thuật - Khái Lược Những Tư Tưởng Lớn - Bìa Cứng",
        author: "DK",
        category: " VĂN HÓA - NGHỆ THUẬT ",
        price: 405000,
        sold: 20,
        thumbnail: "bia-1---luat-phap---khai-luoc-nhung-tu-tuong-lon.jpg",
        slider: ["2023_06_07_10_51_32_1-390x5103434.jpg", "2023_06_07_10_51_32_3-390x5102414.jpg"]
    }, {
        mainText: "Luật Pháp - Khái Lược Những Tư Tưởng Lớn - Bìa Cứng ",
        author: "DK",
        category: "CHÍNH TRỊ - PHÁP LÝ",
        price: 405000,
        sold: 20,
        thumbnail: "9786043929850.jpg",
        slider: ["1_13_5.png", "5_26_39.png"]
    }, {
        mainText: "Ông Già Và Biển Cả - Ấn Bản Giới Hạn - Bìa Da Microfiber    ",
        author: "Ernest Hemingway",
        category: "VĂN HỌC",
        price: 1200000,
        sold: 40,
        thumbnail: "8936203362411.jpg",
        slider: ["2023_04_20_14_26_54_3-390x510.jpg", "2023_04_20_14_26_54_2-390x510.jpg", "2023_04_20_14_26_54_1-390x510.jpg"]
    }, {
        mainText: "Thương Hiệu Việt Nam - Thời Khắc Vàng - Brand Vietnam - The Moment (Tái Bản 2023)",
        author: "Trần Tuệ Tri",
        category: " KINH TẾ ",
        price: 224100,
        sold: 20,
        thumbnail: "bia-1---kinh-doanh_1.jpg",
        slider: ["2023_06_26_16_48_54_1-390x510.jpg"]
    },
    {
        mainText: "Không Diệt Không Sinh Đừng Sợ Hãi (Tái Bản 2022)",
        author: "Thích Nhất Hạnh",
        category: "VĂN HỌC",
        price: 82500,
        sold: 10,
        thumbnail: "imageProduct1.jpeg",
        slider: ["imageProduct2.jpeg", "imageProduct3.jpeg"]
    }, {
        mainText: "Muôn Kiếp Nhân Sinh - Many Times, Many Lives - Tập 3    ",
        author: "Nguyên Phong",
        category: " KINH TẾ ",
        price: 224100,
        sold: 20,
        thumbnail: "imageProduct4.jpeg",
        slider: ["imageProduct5.jpeg"]
    }, {
        mainText: "Muôn Kiếp Nhân Sinh - Many Times, Many Lives (Khổ Nhỏ)    ",
        author: "Nguyên Phong",
        category: " KINH TẾ ",
        price: 224100,
        sold: 20,
        thumbnail: "imageProduct6.jpeg",
        slider: ["imageProduct7.jpeg", "imageProduct8.jpeg"]
    }];
//# sourceMappingURL=constant.js.map