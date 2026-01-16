-- ============================================
-- QUICK FIX: Tắt RLS cho Development
-- ============================================
-- Giải pháp nhanh nhất để fix lỗi "new row violates row-level security policy"
-- ⚠️ CHỈ DÙNG CHO DEVELOPMENT - KHÔNG DÙNG PRODUCTION!
-- ============================================

-- Tắt RLS cho tất cả các bảng chính
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- ============================================
-- KẾT QUẢ: Có thể thêm/sửa/xóa dữ liệu tự do
-- ============================================
