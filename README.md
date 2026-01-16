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

Dự án được tổ chức gọn gàng theo **Next.js App Router**, dễ mở rộng và bảo trì:

```
web-trai-cay2/
├── 📂 app/                              # Next.js App Router (Code chính)
│   ├── about/                           # Trang Giới thiệu
│   ├── admin/                           # Panel Quản trị (Admin)
│   │   ├── _components/                 # Shared Admin Components
│   │   │   ├── AdminSidebar.tsx         # Thanh điều hướng admin
│   │   │   ├── DashboardCard.tsx        # Card hiển thị thống kê
│   │   │   └── ProtectedRoute.tsx       # Bảo vệ route admin
│   │   ├── blog/                        # Quản lý Blog
│   │   │   ├── _components/             # Components cho Blog Admin
│   │   │   │   ├── BlogForm.tsx         # Form tạo/sửa blog (Manual)
│   │   │   │   ├── BlogFormAI.tsx       # Form tạo blog bằng AI
│   │   │   │   └── BlogTable.tsx        # Bảng danh sách blog
│   │   │   ├── create/                  # Trang tạo blog mới
│   │   │   ├── edit/[id]/               # Trang chỉnh sửa blog
│   │   │   └── page.tsx                 # Trang quản lý blog
│   │   ├── categories/                  # Quản lý Danh mục
│   │   │   ├── _components/             # Components danh mục
│   │   │   │   └── CategoryForm.tsx     # Form tạo/sửa danh mục
│   │   │   └── page.tsx                 # Trang quản lý danh mục
│   │   ├── customers/                   # Quản lý Khách hàng
│   │   │   ├── _components/             # Components khách hàng
│   │   │   │   ├── CustomerDetail.tsx   # Chi tiết khách hàng
│   │   │   │   ├── CustomerList.tsx     # Danh sách khách hàng
│   │   │   │   └── CustomerStatsDisplay.tsx  # Thống kê khách hàng
│   │   │   ├── hooks/                   # Hooks cho customers
│   │   │   │   ├── useCustomersData.ts  # Hook lấy dữ liệu khách
│   │   │   │   └── useCustomerOrders.ts # Hook lấy đơn hàng
│   │   │   └── page.tsx                 # Trang quản lý khách hàng
│   │   ├── orders/                      # Quản lý Đơn hàng
│   │   │   ├── _components/             # Components đơn hàng
│   │   │   │   ├── OrderDetailsModal.tsx  # Modal chi tiết đơn
│   │   │   │   ├── OrderFilters.tsx     # Bộ lọc đơn hàng
│   │   │   │   └── OrdersTable.tsx      # Bảng đơn hàng
│   │   │   ├── hooks/                   # Hooks cho orders
│   │   │   │   └── useOrdersData.ts     # Hook lấy dữ liệu đơn
│   │   │   └── page.tsx                 # Trang quản lý đơn hàng
│   │   ├── products/                    # Quản lý Sản phẩm
│   │   │   ├── _components/             # Components sản phẩm
│   │   │   │   ├── ProductForm.tsx      # Form tạo/sửa sản phẩm
│   │   │   │   └── ProductsTable.tsx    # Bảng sản phẩm
│   │   │   ├── create/                  # Trang tạo sản phẩm
│   │   │   ├── edit/[id]/               # Trang chỉnh sửa sản phẩm
│   │   │   ├── hooks/                   # Hooks cho products
│   │   │   │   └── useProductsData.ts   # Hook lấy dữ liệu sản phẩm
│   │   │   └── page.tsx                 # Trang quản lý sản phẩm
│   │   ├── settings/                    # Cài đặt Admin
│   │   │   └── page.tsx                 # Trang cài đặt
│   │   ├── hooks/                       # Admin hooks
│   │   │   └── useDashboardData.ts      # Hook dashboard stats
│   │   ├── constants.ts                 # Admin constants
│   │   ├── types.ts                     # Admin types
│   │   ├── layout.tsx                   # Layout admin
│   │   └── page.tsx                     # Dashboard chính
│   │
│   ├── api/                             # API Routes (Server-side)
│   │   ├── ai-assistant/                # API Chatbot AI
│   │   │   └── route.ts                 # Endpoint chat với Gemini
│   │   ├── blog/                        # API Blog
│   │   │   └── route.ts                 # Tạo blog tự động bằng AI
│   │   ├── nutrition/                   # API Dinh dưỡng
│   │   │   └── route.ts                 # Phân tích dinh dưỡng AI
│   │   ├── search/                      # API Tìm kiếm
│   │   │   ├── image/route.ts           # Tìm kiếm bằng hình ảnh
│   │   │   └── route.ts                 # Tìm kiếm văn bản thông minh
│   │   └── send-order-email/            # API Email
│   │       └── route.ts                 # Gửi email xác nhận đơn
│   │
│   ├── auth/                            # Xác thực
│   │   └── callback/                    # OAuth callback handler
│   │       └── route.ts                 # Xử lý callback từ Supabase
│   │
│   ├── blog/                            # Blog công khai
│   │   ├── _components/                 # Blog components
│   │   │   ├── BlogContent.tsx          # Nội dung bài viết
│   │   │   ├── BlogHero.tsx             # Hero section blog
│   │   │   ├── BlogList.tsx             # Danh sách bài viết
│   │   │   └── TagFilter.tsx            # Lọc theo tag
│   │   ├── [slug]/                      # Chi tiết bài viết
│   │   │   └── page.tsx                 # Trang chi tiết blog
│   │   └── page.tsx                     # Trang danh sách blog
│   │
│   ├── cart/                            # Giỏ hàng
│   │   └── page.tsx                     # Trang giỏ hàng
│   ├── checkout/                        # Thanh toán
│   │   └── page.tsx                     # Trang thanh toán
│   ├── contact/                         # Liên hệ
│   │   └── page.tsx                     # Trang liên hệ
│   ├── login/                           # Đăng nhập/Đăng ký
│   │   └── page.tsx                     # Trang xác thực
│   │
│   ├── order-success/                   # Trang xác nhận đơn hàng
│   │   ├── _components/                 # Components trang thành công
│   │   │   ├── ActionButtons.tsx        # Nút hành động
│   │   │   └── Receipt.tsx              # Hóa đơn đơn hàng
│   │   └── page.tsx                     # Trang xác nhận
│   │
│   ├── privacy/                         # Chính sách bảo mật
│   │   └── page.tsx                     # Trang privacy policy
│   │
│   ├── products/                        # Sản phẩm
│   │   ├── [id]/                        # Chi tiết sản phẩm
│   │   │   └── page.tsx                 # Trang chi tiết
│   │   └── page.tsx                     # Danh sách sản phẩm
│   │
│   ├── profile/                         # Hồ sơ cá nhân
│   │   └── page.tsx                     # Trang profile + đơn hàng
│   ├── terms/                           # Điều khoản
│   │   └── page.tsx                     # Trang terms of service
│   │
│   ├── error.tsx                        # Error boundary
│   ├── loading.tsx                      # Loading state
│   ├── not-found.tsx                    # 404 page
│   ├── layout.tsx                       # Root layout
│   ├── page.tsx                         # Trang chủ (Homepage)
│   └── globals.css                      # Global styles
│
├── 📂 components/                       # Shared Components
│   ├── features/                        # Feature components
│   │   ├── ProductCard.tsx              # Card sản phẩm
│   │   └── SearchBar.tsx                # Thanh tìm kiếm
│   ├── ui/                              # UI components
│   │   ├── Button.tsx                   # Button component
│   │   └── Input.tsx                    # Input component
│   ├── AIAssistant.tsx                  # Chatbot AI trợ lý
│   ├── Footer.tsx                       # Footer trang web
│   ├── Header.tsx                       # Header + Navigation
│   ├── ImageSearchModal.tsx             # Modal tìm kiếm bằng ảnh
│   ├── MobileMenu.tsx                   # Menu mobile responsive
│   ├── NutritionModal.tsx               # Modal thông tin dinh dưỡng
│   ├── ProductRecommendations.tsx       # Gợi ý sản phẩm
│   ├── ReviewModal.tsx                  # Modal đánh giá sản phẩm
│   └── ReviewSection.tsx                # Section hiển thị reviews
│
├── 📂 hooks/                            # Custom React Hooks
│   ├── useCart.ts                       # Hook quản lý giỏ hàng
│   ├── useDebounce.ts                   # Hook debounce input
│   ├── useLocalStorage.ts               # Hook localStorage
│   ├── useMediaQuery.ts                 # Hook responsive
│   ├── useOrder.ts                      # Hook quản lý đơn hàng
│   ├── useProductRecommendations.ts     # Hook gợi ý sản phẩm
│   └── index.ts                         # Export tất cả hooks
│
├── 📂 lib/                              # Libraries & Utilities
│   ├── blog/                            # Blog utilities
│   │   ├── blog-content-generator.ts    # Tạo nội dung blog AI
│   │   ├── blog-data.ts                 # Lấy dữ liệu blog
│   │   ├── blog-excerpt-generator.ts    # Tạo đoạn trích blog
│   │   ├── blog-image-analyzer.ts       # Phân tích ảnh blog
│   │   ├── blog-tag-generator.ts        # Tạo tags blog
│   │   └── blog-title-generator.ts      # Tạo tiêu đề blog
│   ├── products/                        # Product utilities
│   │   └── product-data.ts              # Lấy dữ liệu sản phẩm
│   ├── validations/                     # Zod validation schemas
│   │   ├── blog.ts                      # Blog validation
│   │   ├── product.ts                   # Product validation
│   │   └── order.ts                     # Order validation
│   ├── errors.ts                        # Error handling utilities
│   ├── gemini.ts                        # Gemini AI client
│   ├── metadata.ts                      # Next.js metadata helper
│   ├── resend.ts                        # Resend email client
│   ├── supabase.ts                      # Supabase client config
│   └── utils.ts                         # Common utilities
│
├── 📂 context/                          # React Context
│   └── GlobalContext.tsx                # Global state (Cart, User, Theme)
│
├── 📂 emails/                           # Email templates
│   └── OrderConfirmation.tsx            # Email xác nhận đơn hàng
│
├── 📂 public/                           # Static assets
│   └── images/                          # Hình ảnh tĩnh
│
├── 📂 migrations/                       # Database migrations
│   └── update_categories_schema.sql     # Migration scripts
│
├── 📂 openspec/                         # OpenSpec workflow
│   ├── archive/                         # Archived changes
│   └── specs/                           # Active specs
│
├── 📂 .agent/                           # Agent workflows
│   └── workflows/                       # Workflow definitions
│       ├── openspec-apply.md            # Apply OpenSpec changes
│       ├── openspec-archive.md          # Archive changes
│       └── openspec-proposal.md         # Create proposals
│
├── 📄 SQL Files                         # Database setup scripts
│   ├── database.sql                     # Main database schema
│   ├── supabase_rls_policies.sql        # Row-Level Security
│   ├── supabase_storage_policies.sql    # Storage security
│   ├── add_reviews_feature.sql          # Reviews feature
│   ├── add_email_logs_table.sql         # Email logging
│   ├── fix_storage_rls.sql              # Storage RLS fixes
│   ├── update_reviews_for_orders.sql    # Reviews migration
│   ├── add_on_delete_set_null_to_order_items.sql  # Order items constraint
│   ├── DISABLE_RLS_FOR_DEV.sql          # Dev environment helper
│   └── current_schema.sql               # Current schema snapshot
│
├── 📄 Config Files
│   ├── package.json                     # Dependencies
│   ├── tsconfig.json                    # TypeScript config
│   ├── tailwind.config.ts               # Tailwind CSS config
│   ├── next.config.mjs                  # Next.js config
│   ├── postcss.config.js                # PostCSS config
│   ├── .eslintrc.json                   # ESLint config
│   ├── .env.example                     # Environment variables template
│   └── .gitignore                       # Git ignore rules
│
├── 📄 Project Files
│   ├── types.ts                         # TypeScript types chung
│   ├── constants.ts                     # Constants chung
│   ├── task.md                          # Task tracking
│   ├── AGENTS.md                        # Agent documentation
│   ├── metadata.json                    # Project metadata
│   └── README.md                        # Documentation (File này)
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
