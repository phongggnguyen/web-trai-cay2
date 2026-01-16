-- ============================================================================
-- TIỆM QUẢ NGHIỆP - COMPLETE DATABASE SCHEMA
-- ============================================================================
-- Tên Database: Supabase PostgreSQL
-- Phiên bản: Latest (consolidated from all migrations)
-- Ngày cập nhật: 16/01/2026
-- ============================================================================

-- ============================================================================
-- 1. CATEGORIES TABLE - Danh mục sản phẩm
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  description TEXT,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

COMMENT ON TABLE public.categories IS 'Danh mục trái cây (Nho & Berry, Táo & Lê, Trái cây nhiệt đới...)';

-- ============================================================================
-- 2. PRODUCTS TABLE - Sản phẩm
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image_url TEXT NOT NULL,
  unit TEXT DEFAULT 'kg'::text,
  stock INTEGER DEFAULT 100,
  is_best_seller BOOLEAN DEFAULT false,
  tags TEXT[], -- Array of tags: ['HOT', 'MỚI', 'SALE']
  category_id BIGINT,
  rating NUMERIC DEFAULT 0, -- Calculated from reviews
  reviews INTEGER DEFAULT 0, -- Review count
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) 
    REFERENCES public.categories(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON public.products(is_best_seller);
CREATE INDEX IF NOT EXISTS idx_products_rating ON public.products(rating DESC);

COMMENT ON TABLE public.products IS 'Sản phẩm trái cây với đầy đủ thông tin giá, tồn kho, đánh giá';
COMMENT ON COLUMN public.products.rating IS 'Điểm đánh giá trung bình (1-5), tự động tính từ bảng reviews';
COMMENT ON COLUMN public.products.reviews IS 'Số lượng đánh giá, tự động cập nhật từ trigger';

-- ============================================================================
-- 3. PROFILES TABLE - Thông tin người dùng
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  address TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE,
  role TEXT DEFAULT 'customer'::text, -- 'customer' or 'admin'
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) 
    REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

COMMENT ON TABLE public.profiles IS 'Thông tin mở rộng của user từ Supabase Auth';
COMMENT ON COLUMN public.profiles.role IS 'Phân quyền: customer (mặc định) hoặc admin';

-- ============================================================================
-- 4. ORDERS TABLE - Đơn hàng
-- ============================================================================
-- Create enum for order status
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM (
    'pending',     -- Chờ xác nhận
    'confirmed',   -- Đã xác nhận
    'processing',  -- Đang xử lý
    'shipping',    -- Đang giao
    'delivered',   -- Đã giao
    'cancelled'    -- Đã hủy
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id UUID DEFAULT auth.uid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT,
  shipping_district TEXT,
  payment_method TEXT NOT NULL, -- 'cod', 'card', 'qr', 'wallet'
  shipping_method TEXT NOT NULL, -- 'standard', 'express'
  shipping_fee NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  status order_status DEFAULT 'pending',
  -- Payment integration fields
  payment_provider TEXT, -- 'momo', 'vnpay', null for COD
  external_transaction_id TEXT,
  payment_url TEXT,
  payment_expired_at TIMESTAMP WITH TIME ZONE,
  payment_callback_data JSONB,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) 
    REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_payment_provider ON public.orders(payment_provider);

COMMENT ON TABLE public.orders IS 'Đơn hàng với đầy đủ thông tin thanh toán và vận chuyển';
COMMENT ON COLUMN public.orders.payment_provider IS 'Nhà cung cấp thanh toán: momo, vnpay, hoặc null (COD)';

-- ============================================================================
-- 5. ORDER_ITEMS TABLE - Chi tiết đơn hàng
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  product_id BIGINT,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  unit TEXT,
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) 
    REFERENCES public.orders(id) ON DELETE CASCADE,
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) 
    REFERENCES public.products(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

COMMENT ON TABLE public.order_items IS 'Chi tiết sản phẩm trong đơn hàng';
COMMENT ON COLUMN public.order_items.product_id IS 'NULL nếu sản phẩm đã bị xóa khỏi catalog';

-- ============================================================================
-- 6. REVIEWS TABLE - Đánh giá sản phẩm
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id BIGINT NOT NULL,
  order_id UUID NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) 
    REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) 
    REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT reviews_order_id_fkey FOREIGN KEY (order_id) 
    REFERENCES public.orders(id) ON DELETE CASCADE,
  CONSTRAINT reviews_user_product_order_unique UNIQUE (user_id, product_id, order_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_order_id ON public.reviews(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

COMMENT ON TABLE public.reviews IS 'Đánh giá sản phẩm sau khi mua hàng';
COMMENT ON CONSTRAINT reviews_user_product_order_unique ON public.reviews 
  IS 'Mỗi user chỉ được review 1 lần cho mỗi sản phẩm trong mỗi đơn hàng';

-- ============================================================================
-- 7. BLOG_POSTS TABLE - Bài viết blog
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  tags TEXT[], -- Array of tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT blog_posts_author_id_fkey FOREIGN KEY (author_id) 
    REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

COMMENT ON TABLE public.blog_posts IS 'Bài viết blog về trái cây, sức khỏe, công thức';
COMMENT ON COLUMN public.blog_posts.views IS 'Số lượt xem, tự động tăng khi user đọc bài';

-- ============================================================================
-- 8. EMAIL_LOGS TABLE - Lịch sử gửi email
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  order_id UUID,
  email_to TEXT NOT NULL,
  email_type TEXT NOT NULL DEFAULT 'order_confirmation',
  status TEXT NOT NULL DEFAULT 'sent', -- 'sent', 'failed'
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT email_logs_pkey PRIMARY KEY (id),
  CONSTRAINT email_logs_order_id_fkey FOREIGN KEY (order_id) 
    REFERENCES public.orders(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_email_logs_order_id ON public.email_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON public.email_logs(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON public.email_logs(status);

COMMENT ON TABLE public.email_logs IS 'Tracking emails sent by the system for audit and debugging';

-- ============================================================================
-- 9. PAYMENT_LOGS TABLE - Log thanh toán
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payment_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  order_id UUID,
  event_type TEXT NOT NULL, -- 'request', 'callback', 'webhook'
  provider TEXT NOT NULL, -- 'momo', 'vnpay'
  request_data JSONB,
  response_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT payment_logs_pkey PRIMARY KEY (id),
  CONSTRAINT payment_logs_order_id_fkey FOREIGN KEY (order_id) 
    REFERENCES public.orders(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_payment_logs_order_id ON public.payment_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_provider ON public.payment_logs(provider);
CREATE INDEX IF NOT EXISTS idx_payment_logs_created_at ON public.payment_logs(created_at DESC);

COMMENT ON TABLE public.payment_logs IS 'Logs for payment gateway integrations (MoMo, VNPay)';

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function: Auto-update product rating from reviews
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

-- Trigger: Update product rating on review change
DROP TRIGGER IF EXISTS update_product_rating_trigger ON reviews;
CREATE TRIGGER update_product_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Function: Auto-update blog_posts.updated_at
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update blog updated_at timestamp
DROP TRIGGER IF EXISTS blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- ============================================================================
-- NOTES & INSTRUCTIONS
-- ============================================================================
-- 1. RLS (Row Level Security) policies are defined in supabase_rls_policies.sql
-- 2. Storage policies are defined in supabase_storage_policies.sql
-- 3. For development, you can disable RLS with DISABLE_RLS_FOR_DEV.sql
-- 4. This schema includes all migrations up to 16/01/2026
-- 
-- Migration Files Applied:
-- - database.sql (original)
-- - add_reviews_feature.sql
-- - update_reviews_for_orders.sql (updated reviews with order_id)
-- - add_email_logs_table.sql
-- - create_blog_posts.sql
-- - Payment logs (from original database.sql)
-- 
-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
