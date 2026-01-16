-- ============================================================================
-- Migration: Setup Supabase Storage for Category Background Images
-- Created: 16/01/2026
-- Description: Hướng dẫn tạo bucket và policies cho ảnh nền danh mục
-- ============================================================================

-- BƯỚC 1: TẠO STORAGE BUCKET (thực hiện trên Supabase Dashboard)
-- ------------------------------------------------------------------
-- 1. Mở Supabase Dashboard → Storage
-- 2. Click "Create a new bucket"
-- 3. Nhập:
--    - Name: category-images
--    - Public bucket: ✓ (tích chọn - để có public URL)
--    - File size limit: 5242880 (5MB)
--    - Allowed MIME types: image/jpeg, image/png, image/webp
-- 4. Click "Create bucket"

-- BƯỚC 2: CẤU HÌNH RLS POLICIES (chạy SQL sau)
-- ------------------------------------------------------------------

-- Policy 1: Anyone can view category images (public read)
CREATE POLICY "Anyone can view category images"
ON storage.objects FOR SELECT
USING (bucket_id = 'category-images');

-- Policy 2: Authenticated users can upload category images
CREATE POLICY "Authenticated users can upload category images"  
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'category-images');

-- Policy 3: Authenticated users can update category images
CREATE POLICY "Authenticated users can update category images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'category-images');

-- Policy 4: Authenticated users can delete category images
CREATE POLICY "Authenticated users can delete category images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'category-images');

-- ============================================================================
-- NOTES
-- ============================================================================
-- - Bucket được cấu hình public để mọi người có thể xem ảnh danh mục
-- - Chỉ authenticated users (admin) mới có thể upload/update/delete
-- - File size limit: 5MB
-- - Allowed types: JPG, PNG, WEBP
-- ============================================================================
