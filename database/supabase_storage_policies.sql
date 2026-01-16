-- ============================================
-- STORAGE POLICIES FOR PRODUCT IMAGES BUCKET
-- Chạy script này trong Supabase SQL Editor
-- ============================================

-- Bước 1: Xóa policies cũ nếu có
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

-- Bước 2: Policy cho VIEWING images (ai cũng xem được)
CREATE POLICY "Anyone can view product images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Bước 3: Policy cho UPLOADING images (authenticated users)
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Bước 4: Policy cho UPDATING images (authenticated users)
CREATE POLICY "Authenticated users can update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- Bước 5: Policy cho DELETING images (authenticated users)
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- ============================================
-- QUAN TRỌNG: Đảm bảo bucket đã được tạo!
-- ============================================
-- Nếu bucket 'product-images' chưa tồn tại, cần tạo qua Dashboard:
-- 1. Vào Storage → New bucket
-- 2. Tên: product-images
-- 3. Public bucket: YES (để mọi người xem được ảnh)
-- 4. File size limit: 5MB (hoặc tùy ý)
-- 5. Allowed MIME types: image/* (chỉ cho phép ảnh)
