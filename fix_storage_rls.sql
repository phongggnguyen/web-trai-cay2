-- ============================================
-- QUICK FIX: DISABLE RLS FOR STORAGE (Development)
-- ============================================
-- Script này TẮT hoàn toàn RLS cho Storage bucket
-- để có thể upload ảnh tự do khi development
-- ⚠️ CHỈ DÙNG CHO DEVELOPMENT - KHÔNG PRODUCTION!
-- ============================================

-- ============================================
-- PHẦN 1: TẮT RLS CHO TABLES
-- ============================================
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- ============================================
-- PHẦN 2: XÓA TẤT CẢ STORAGE POLICIES
-- ============================================
-- Xóa hết policies cũ trên storage.objects
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations" ON storage.objects;

-- ============================================
-- PHẦN 3: TẠO POLICY CHO PHÉP TẤT CẢ (Public)
-- ============================================
-- Policy này cho phép ANYONE làm BẤT CỨ VIỆC GÌ với storage
CREATE POLICY "Allow all operations for product-images"
ON storage.objects
FOR ALL
TO public
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- ============================================
-- ✅ HOÀN TẤT!
-- ============================================
-- Sau khi chạy script này:
-- ✅ Upload ảnh sản phẩm sẽ hoạt động
-- ✅ Thêm/sửa/xóa sản phẩm sẽ hoạt động
-- ✅ Public có thể xem ảnh sản phẩm

-- ⚠️ LƯU Ý: 
-- - Đảm bảo bucket "product-images" đã được tạo trong Storage
-- - Nếu chưa có, tạo bucket qua Dashboard: Storage → New Bucket
--   + Bucket name: product-images
--   + Public bucket: YES
