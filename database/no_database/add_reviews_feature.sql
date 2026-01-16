-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id) -- One review per product per user
);

-- Enable RLSa
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public reviews are viewable by everyone" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Add rating and reviews count to products table if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating') THEN
        ALTER TABLE products ADD COLUMN rating NUMERIC DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'reviews') THEN
        ALTER TABLE products ADD COLUMN reviews INTEGER DEFAULT 0;
    END IF;
END $$;

-- Trigger to update product rating
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

CREATE TRIGGER update_product_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_product_rating();
