-- =================================================================
-- MIGRATION: Update reviews table to support order-based reviews
-- =================================================================
-- Chạy script này trong Supabase SQL Editor
-- Lưu ý: Nếu đã có dữ liệu reviews cũ, cần xử lý trước

-- Bước 1: Xóa bảng reviews cũ (nếu có data cũ không quan trọng)
-- Nếu bạn muốn giữ data, comment dòng này và thêm logic migrate
DROP TABLE IF EXISTS reviews CASCADE;

-- Bước 2: Tạo lại bảng reviews với cột order_id
CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id, order_id) -- Mỗi user chỉ review 1 lần/sản phẩm/đơn hàng
);

-- Bước 3: Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Bước 4: Tạo policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Bước 5: Đảm bảo products có cột rating và reviews
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating') THEN
        ALTER TABLE products ADD COLUMN rating NUMERIC DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'reviews') THEN
        ALTER TABLE products ADD COLUMN reviews INTEGER DEFAULT 0;
    END IF;
END $$;

-- Bước 6: Trigger để update product rating tự động
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
DECLARE
    _product_id BIGINT;
    _avg_rating NUMERIC;
    _count INTEGER;
BEGIN
    IF (TG_OP = 'DELETE') THEN
        _product_id := OLD.product_id;
    ELSE
        _product_id := NEW.product_id;
    END IF;

    SELECT COALESCE(AVG(rating), 0), COUNT(*)
    INTO _avg_rating, _count
    FROM reviews
    WHERE product_id = _product_id;

    UPDATE products
    SET rating = ROUND(_avg_rating, 1),
        reviews = _count
    WHERE id = _product_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_product_rating_trigger ON reviews;
CREATE TRIGGER update_product_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- =================================================================
-- DONE! Bảng reviews đã sẵn sàng với order-based reviews
-- =================================================================
