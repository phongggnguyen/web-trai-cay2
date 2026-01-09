# 🍎 Tiệm Quả Nghiệp - Nền Tảng Thương Mại Điện Tử Trái Cây Cao Cấp

<div align="center">
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.87.1-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

**Website bán hàng hiện đại tích hợp AI thông minh**

*Nghiệp tụ vành môi - Ăn vô trôi hết* 🎯

[Tính Năng](#-tính-năng-chính) · [Công Nghệ](#-công-nghệ-sử-dụng) · [Cài Đặt](#-hướng-dẫn-cài-đặt) · [Cấu Trúc](#-cấu-trúc-dự-án)

</div>

---

## ✨ Điểm Nổi Bật

Đây không chỉ là một web bán hàng bình thường, mà là một **Modern Web App** được tối ưu tận răng:

- ⚡ **Siêu Tốc Độ**: Chạy trên **Next.js 15 App Router** mới nhất, load trang cực nhanh nhờ Server Components.
- 🤖 **Trí Tuệ Nhân Tạo (AI)**:
  - **Viết Blog Tự Động**: Chỉ cần upload ảnh, AI (Gemini) sẽ tự viết bài blog chuẩn SEO từ A-Z.
  - **Tìm Kiếm Thông Minh**: Tìm trái cây bằng hình ảnh hoặc mô tả tự nhiên (VD: "trái gì màu đỏ ăn ngọt").
  - **Trợ Lý Ảo**: Chatbot tư vấn 24/7, am hiểu về sản phẩm của shop.
- 🎨 **Giao Diện Đẹp Mắt**: Thiết kế với **Tailwind CSS**, có chế độ Sáng/Tối (Dark Mode) xịn xò, hiệu ứng mượt mà.
- 🛒 **Giỏ Hàng Thông Minh**: Tự động lưu giỏ hàng, tính toán giá tiền real-time, không mất khi F5.
- 📱 **Tương Thích Mọi Thiết Bị**: Hiển thị đẹp trên cả điện thoại, máy tính bảng và desktop (Mobile-First).
- 🔐 **Bảo Mật Cao**: Hệ thống đăng nhập/đăng ký với Supabase Auth, phân quyền Admin/Khách hàng chặt chẽ.

---

## 🎯 Tính Năng Chính

### 🛍️ Dành Cho Khách Hàng

#### Mua Sắm & Trải Nghiệm
- ✅ **Danh Mục Sản Phẩm**: Lướt xem trái cây với bộ lọc xịn (theo giá, loại, đánh giá).
- ✅ **Tìm Kiếm Đỉnh Cao**:
  - Gõ text: "Tìm quả gì giải nhiệt mùa hè" → AI tự hiểu và gợi ý dưa hấu, cam...
  - Chụp ảnh: Chụp quả táo → AI nhận diện và tìm sản phẩm tương ứng.
- ✅ **Đặt Hàng Nhanh Gọn**: Quy trình checkout 3 bước, lưu địa chỉ giao hàng.
- ✅ **Lịch Sử Đơn Hàng**: Theo dõi trạng thái đơn hàng (đang xử lý, đang giao, đã giao).

#### Tương Tác
- ⭐ **Đánh Giá & Review**: Chấm sao, viết nhận xét cho sản phẩm.
- 💬 **Chat Với AI**: Hỏi giá, hỏi công dụng, nhờ tư vấn quà tặng.
- 👤 **Hồ Sơ Cá Nhân**: Quản lý thông tin, đổi mật khẩu, sổ địa chỉ.

---

### 🎛️ Dành Cho Quản Trị Viên (Admin)

#### Dashboard & Báo Cáo
- 📊 **Biểu Đồ Doanh Thu**: Xem doanh thu theo ngày/tháng/năm trực quan (Recharts).
- 📈 **Thống Kê**: Số lượng đơn hàng, khách hàng mới, sản phẩm bán chạy.
- 👥 **Phân Tích Khách Hàng**: Xem ai mua nhiều, ai là khách hàng thân thiết.

#### Quản Lý Cửa Hàng
- 📦 **Sản Phẩm**: Thêm/Sửa/Xóa sản phẩm, upload ảnh nhanh chóng.
- 🏷️ **Danh Mục**: Tạo các nhóm trái cây (Trái cây nhập khẩu, Trái cây Việt Nam...).
- 🚚 **Đơn Hàng**: Xem chi tiết đơn, cập nhật trạng thái giao hàng.
- 📝 **Quản Lý Blog (Đặc Biệt)**:
  - **Chế Độ AI**: Upload ảnh bìa → Bùm! Có ngay bài viết 1000 từ + tiêu đề + tags.
  - **Chế Độ Thủ Công**: Trình soạn thảo đầy đủ cho bài viết chuyên sâu.

---

## 🛠️ Công Nghệ Sử Dụng

Dự án sử dụng các công nghệ mới và ổn định nhất hiện nay:

### **Frontend (Giao Diện)**
| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|-----------|----------|
| **Next.js** | 15.5.9 | Framework chính, dùng App Router hiện đại |
| **React** | 18.3.1 | Thư viện UI |
| **TypeScript** | 5.6.3 | Code an toàn, tránh lỗi ngớ ngẩn |
| **Tailwind CSS** | 3.4.14 | Viết CSS cực nhanh, utility-first |
| **Zod** | 4.2.1 | Kiểm tra dữ liệu (Validation) |
| **Recharts** | 3.6.0 | Vẽ biểu đồ thống kê |

### **Backend & Dịch Vụ**
| Dịch Vụ | Mục Đích |
|---------|----------|
| **Supabase** | Database (PostgreSQL), Xác thực (Auth), Lưu trữ ảnh (Storage) |
| **Gemini AI** | Trí tuệ nhân tạo của Google (Viết blog, Chatbot, Nhận diện ảnh) |

---

## 🚀 Hướng Dẫn Cài Đặt

Chỉ cần vài bước là bạn có thể chạy dự án này trên máy:

### 1. Chuẩn Bị
- Cài sẵn **Node.js** (bản 18 trở lên).
- Tài khoản **Supabase** (miễn phí).
- API Key của **Google Gemini** (miễn phí).

### 2. Cài Đặt

```bash
# 1. Clone code về máy
git clone https://github.com/phongggnguyen/web-trai-cay2.git
cd web-trai-cay2

# 2. Cài đặt các thư viện
npm install

# 3. Tạo file cấu hình môi trường
cp .env.example .env.local
```

### 3. Cấu Hình
Mở file `.env.local` và điền thông tin của bạn vào:

```env
# Supabase (Lấy trong Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=đường_dẫn_supabase_của_bạn
NEXT_PUBLIC_SUPABASE_ANON_KEY=key_anon_của_bạn

# Gemini AI (Lấy tại aistudio.google.com)
GEMINI_API_KEY=key_gemini_của_bạn
```

### 4. Setup Database
Vào SQL Editor của Supabase và chạy lần lượt các file trong thư mục dự án (hoặc copy nội dung query):
1. `database.sql` (Tạo bảng)
2. `supabase_rls_policies.sql` (Bảo mật)
3. `supabase_storage_policies.sql` (Quyền truy cập ảnh)

### 5. Chạy Dự Án

```bash
# Chạy môi trường development
npm run dev
```

Truy cập `http://localhost:3000` và thưởng thức! 🎉

---

## 📁 Cấu Trúc Dự Án

Dự án được tổ chức gọn gàng, dễ mở rộng:

```
web-trai-cay2/
├── app/                        # Code chính của Next.js (App Router)
│   ├── (public)/               # Các trang công khai (Home, Shop, Blog...)
│   ├── admin/                  # Trang quản trị (cần đăng nhập admin)
│   ├── api/                    # Các API (AI, Search...)
│   ├── auth/                   # Đăng nhập/Đăng ký
│   └── layout.tsx              # Layout chung cho toàn web
│
├── components/                 # Các component tái sử dụng
│   ├── ui/                     # Nút, ô nhập liệu, card... (Atomic design)
│   └── ...                     # Header, Footer, Menu...
│
├── lib/                        # Các hàm tiện ích (Utils)
│   ├── supabase.ts             # Kết nối Database
│   ├── gemini.ts               # Kết nối AI
│   └── ...
│
├── hooks/                      # Custom Hooks (Logic tái sử dụng)
├── context/                    # Quản lý state toàn cục (Giỏ hàng...)
└── public/                     # Ảnh tĩnh, icon...
```

---

## 🤖 Hướng Dẫn Sử Dụng Tính Năng AI

### 1. Tạo Bài Viết Blog Tự Động
1. Vào **Admin** -> **Quản lý Blog**.
2. Bấm **"Tạo bài viết mới"**.
3. Chọn thẻ **"Viết bằng AI"**.
4. Upload 1 ảnh trái cây đẹp (Bắt buộc).
5. Nhập tiêu đề (hoặc để trống cho AI tự nghĩ).
6. Bấm **"Tạo nội dung với AI"**.
7. Đợi 10s -> Có ngay bài viết xịn xò! Review và đăng thôi.

### 2. Tìm Kiếm Bằng Hình Ảnh
1. Ở trang chủ, bấm vào icon 📷 trên thanh tìm kiếm.
2. Tải ảnh lên hoặc chụp ảnh.
3. Hệ thống sẽ trả về sản phẩm giống nhất trong cửa hàng.

---

## 🤝 Đóng Góp (Contributing)

Rất hoan nghênh mọi người đóng góp để dự án tốt hơn!
1. Fork dự án.
2. Tạo nhánh mới (`git checkout -b feature/TinhNangMoi`).
3. Commit code (`git commit -m 'Thêm tính năng mới xịn xò'`).
4. Push lên (`git push origin feature/TinhNangMoi`).
5. Tạo Pull Request.

---

## 👤 Tác Giả

**Phongg Nguyen**

- 🐙 GitHub: [@phongggnguyen](https://github.com/phongggnguyen)
- 📧 Email: phongggnguyen@example.com

---

<div align="center">

**⭐ Nếu bạn thấy dự án này hay, hãy tặng mình 1 sao trên GitHub nhé!**

**Được làm bằng ❤️ và rất nhiều cà phê ☕**

</div>
