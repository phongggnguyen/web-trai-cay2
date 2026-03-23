# 🍎 Tiệm Quả Nghiệp (Nghiep Fruit Shop) - Premium Fruit E-commerce Platform

*English version below | Phiên bản tiếng Việt ở bên dưới*

---

# 🇬🇧 ENGLISH VERSION

<div align="center">
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.87.1-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

**Modern E-commerce Web Application Integrated with Smart AI**

*Nghiệp tụ vành môi - Ăn vô trôi hết* 🎯

</div>

---

## ✨ Highlights

This is not just a standard e-commerce website, but a highly optimized **Modern Web App**:

- ⚡ **Blazing Fast**: Built on the latest **Next.js 15 App Router**, delivering extremely fast page loads via Server Components.
- 🤖 **Artificial Intelligence (AI)**:
  - **Auto Blog Generation**: Simply upload an image and Gemini AI writes a complete, SEO-optimized blog post natively.
  - **Smart Search**: Search for fruits via images or natural language (e.g., "red sweet fruits").
  - **Virtual Assistant**: 24/7 Chatbot ready to give product recommendations and advice.
  - **AI Nutrition Analysis**: Analyzes nutritional value based on purchased items and provides health improvement suggestions.
- 🎨 **Beautiful UI/UX**: Designed with **Tailwind CSS**, featuring dark/light mode toggle, fluid animations, and a fully responsive layout.
- 🛒 **Smart Cart**: Real-time cart calculation that persists across reloads via localStorage.
- 🔐 **Robust Security**: Authentication, authorization, and role management (Admin/User) powered by Supabase Auth and RLS.

---

## 🎯 Main Features

### 🛍️ For Customers

- **Product Discovery & Search**: Filter products by category, price, rating, or use the **AI NLP / Image search**.
- **Checkout Flow**: Seamless 3-step checkout with multiple delivery options right down to standard/express delivery. 
- **Order Tracking**: Keep track of orders from Pending to Delivered status.
- **Reviews & Ratings**: Rate products and leave detailed reviews upon purchasing.
- **AI Chatbot**: Real-time intelligent shopping assistant integrated into the storefront.
- **Customer Profile**: Intuitive dashboard for profile editing, managing order history, and requesting one-click re-orders.

### 🎛️ For Administrators (Admin)

- **Interactive Dashboard**: View real-time shop revenue, latest orders, and customer statistics via beautiful charts (Recharts).
- **Product & Category Management**: Seamlessly add, edit, lock, or delete items. Sync inventory and update prices instantly.
- **Order Management**: Adjust order statuses, track customer details, and calculate revenue efficiently.
- **Smart Blog CMS**:
  - **AI Mode**: Upload a cover image and instantly get a 1000+ words SEO-ready article, complete with tags and an excerpt.
  - **Manual Mode**: Rich text editor for detailed posting.

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.5.9** (App Router)
- **React 18.3**
- **TypeScript 5.6**
- **Tailwind CSS 3.4**
- **Zod** (Data validation)
- **Recharts** (Data visualization)

### **Backend & Services**
- **Supabase** (PostgreSQL, Auth, Storage)
- **Google Gemini AI** (Smart search, chatbot, blog writing, nutrition analysis)
- **Resend** (Email notifications and alerts)

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **Supabase** account (Free tier)
- **Google Gemini** API Key (Free tier)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/phongggnguyen/web-trai-cay2.git
cd web-trai-cay2

# Install dependencies
npm install

# Create environment config
cp .env.example .env.local
```

### 3. Configuration
Add your API keys to `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI 
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Database Setup
Run the SQL migration scripts in your Supabase SQL Editor found in the repository (e.g., `migrations/`, root `SQL Files/`).

### 5. Run the Project
```bash
npm run dev
```
Navigate to `http://localhost:3000` to see your running application! 🎉

---
<br />
<br />

# 🇻🇳 PHIÊN BẢN TIẾNG VIỆT (VIETNAMESE VERSION)

<div align="center">
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.87.1-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

**Website bán hàng hiện đại tích hợp AI bài bản nhất**

*Nghiệp tụ vành môi - Ăn vô trôi hết* 🎯

</div>

---

## ✨ Điểm Nổi Bật

Đây không chỉ là một web bán hàng thông thường, mà là một **Modern Web App** được cấu trúc và tối ưu chỉn chu:

- ⚡ **Siêu Tốc Độ**: Chạy trên **Next.js 15 App Router** mới nhất, load trang cực nhanh với Server Components.
- 🤖 **Trí Tuệ Nhân Tạo (AI)**:
  - **Viết Blog Tự Động**: Chỉ cần tải ảnh lên, AI (Gemini) sẽ tự viết bài blog chuẩn SEO từ A-Z.
  - **Tìm Kiếm Thông Minh**: Tìm trái cây qua hình ảnh hoặc mô tả tự nhiên (VD: "trái gì có màu đỏ ăn rất ngọt").
  - **Trợ Lý Ảo Chatbot**: Hoạt động 24/7, am hiểu về sản phẩm của shop để tư vấn khách hàng.
  - **Phân Tích Dinh Dưỡng**: AI phân tích các giỏ hàng đã đặt, thông báo chi tiết lượng vitamin, đường, và cung cấp lời khuyên sức khỏe cho người mua.
- 🎨 **Giao Diện Đẹp Mắt**: Thiết kế với **Tailwind CSS**, có chế độ Sáng/Tối (Dark/Light Mode) mượt mà, UX nổi bật responsive di động 100%.
- 🛒 **Giỏ Hàng Thông Minh**: Tự động lưu giỏ hàng, tính toán giá tiền real-time, đồng bộ mượt mà ở nhiều tab.
- 🔐 **Bảo Mật Cao**: Hệ thống đăng nhập/đăng ký bằng Supabase Auth, phân quyền Admin/Khách hàng với các Row-Level Security Policies cực kỳ bảo mật.

---

## 🎯 Tính Năng Chính

### 🛍️ Dành Cho Khách Hàng

- **Danh Mục & Sản Phẩm**: Lướt xem trái cây với bộ lọc mạnh mẽ theo giá, loại, và đánh giá.
- **Tìm Kiếm Đỉnh Cao**: 
  - NLP (Natural Language Processing): Hiểu ngôn ngữ tự nhiên. 
  - Image Search: Tải ảnh thực tế của trái cây lên AI sẽ tìm sản phẩm tương tự.
- **Đặt Hàng Nhanh Gọn**: Quy trình checkout chuẩn, tích hợp hệ thống email tự động thông báo đơn qua Resend.
- **Đánh Giá & Trải Nghiệm**: Chấm sao, để lại review các sản phẩm sau khi mua hàng.
- **Hồ Sơ Cá Nhân**: Dễ dàng chỉnh sửa thông tin, xem hoặc đặt lại hàng (Reorder) chỉ bằng một nút bấm. Lịch sử mua hàng rõ ràng.

### 🎛️ Dành Cho Quản Trị Viên (Admin)

- **Dashboard Báo Cáo Thông Minh**: Xem doanh thu theo ngày/tháng/vùng bằng biểu đồ động sinh động (Recharts). Tổng quan cửa hàng trực quan nhất.
- **Quản Lý Cửa Hàng**: 
  - Thêm, sửa, xóa (soft-delete), đăng bán sản phẩm & danh mục dễ dàng. 
  - Quản trị khách hàng: Quản lý vòng đời khách và thói quen mua hàng.
- **Quản Lý Đơn Hàng**: Xử lý tình trạng giao hàng, in hóa đơn online.
- **Blog CMS với Trí Tuệ Nhân Tạo**: Bỏ qua việc hì hục gõ phím viết bài SEO, upload hình bìa và 10 giây sau AI sẽ output ra toàn bộ bài viết format markdown. Admin vẫn có quyền tinh chỉnh viết tay nếu muốn.

---

## 🛠️ Công Nghệ Sử Dụng

### **Frontend (Giao Diện)**
- **Next.js 15.5.9** (App Router)
- **React 18.3.1**
- **TypeScript 5.6.3**
- **Tailwind CSS 3.4**
- **Zod** (Kiểm tra và chuẩn hóa Form)
- **Recharts** (Vẽ biểu đồ thống kê)

### **Backend & Dịch Vụ**
- **Supabase** (Database PostgreSQL, Xác thực người dùng, Lưu trữ File Bucket)
- **Gemini AI by Google** (Trí tuệ nhân tạo toàn năng tạo text và vision)
- **Resend** (Gửi Email tự động cho khách hàng)

---

## 🚀 Hướng Dẫn Cài Đặt

Chỉ cần vài bước là bạn có thể chạy dự án này trên máy nội bộ:

### 1. Chuẩn Bị
- Máy cài sẵn **Node.js** (Bản 18 trở lên).
- Có tài khoản **Supabase** (Tạo miễn phí).
- Lấy API Key của **Google Gemini** (Tạo miễn phí qua Google AI Studio).

### 2. Cài Đặt Gói Code

```bash
# 1. Tải source code
git clone https://github.com/phongggnguyen/web-trai-cay2.git
cd web-trai-cay2

# 2. Cài đặt các thư viện liên quan
npm install

# 3. Tạo file cấu hình môi trường (.env)
cp .env.example .env.local
```

### 3. Cấu Hình
Mở file `.env.local` của bạn và cấu hình các biến môi trường thiết yếu:

```env
# Supabase (Lấy trong Dashboard -> Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=đường_dẫn_supabase_của_bạn
NEXT_PUBLIC_SUPABASE_ANON_KEY=key_anon_của_bạn

# Gemini AI
GEMINI_API_KEY=key_gemini_của_bạn
```

### 4. Setup Database
Vào SQL Editor của Supabase và chạy lần lượt các File Setup nằm trong thư mục gốc. Ví dụ: `database.sql`, `supabase_rls_policies.sql`, và vài migrations khác...

### 5. Khởi Động Dự Án

```bash
# Chạy ở môi trường local development
npm run dev
```

Mở trình duyệt truy cập `http://localhost:3000` và thưởng thức thành quả! 🎉

---

## 🤝 Đóng Góp (Contributing)

Rất hoan nghênh anh em dev đóng góp rèn dũa code base:
1. Fork dự án
2. Cắt nhánh tạo feature mới (`git checkout -b feature/CoolFeature`)
3. Commit source (`git commit -m 'Thêm tính năng cực ngầu'`)
4. Đẩy (Push) nhánh (`git push origin feature/CoolFeature`)
5. Pull Request để review code.

---

## 👤 Tác Giả

**Phongg Nguyen**

- 🐙 GitHub: [@phongggnguyen](https://github.com/phongggnguyen)
- 📧 Email: phongggnguyen@example.com

<div align="center">

**⭐ Nếu bạn thấy dự án này thú vị, đừng tiếc 1 sao (Star) trên GitHub nhé!**

**Dự án được tạo nên bằng ❤️ và sự cố gắng không ngừng nghỉ ☕**

</div>
