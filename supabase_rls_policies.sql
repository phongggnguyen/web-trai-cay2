-- ============================================
-- RLS POLICIES FOR PRODUCTS TABLE
-- Chạy script này trong Supabase SQL Editor
-- ============================================

-- Bước 1: Xóa các policies cũ nếu có (tránh conflict)
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Bước 2: Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Bước 3: Tạo policies mới

-- Policy 1: Cho phép MỌI NGƯỜI xem sản phẩm (kể cả anonymous)
CREATE POLICY "Anyone can view products"
ON products
FOR SELECT
TO public
USING (true);

-- Policy 2: Cho phép TẤT CẢ authenticated users thêm sản phẩm
CREATE POLICY "Authenticated users can insert products"
ON products
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Cho phép TẤT CẢ authenticated users sửa sản phẩm
CREATE POLICY "Authenticated users can update products"
ON products
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Cho phép TẤT CẢ authenticated users xóa sản phẩm
CREATE POLICY "Authenticated users can delete products"
ON products
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- BONUS: RLS cho bảng CATEGORIES (nếu cần)
-- ============================================

DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
ON categories
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage categories"
ON categories
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
