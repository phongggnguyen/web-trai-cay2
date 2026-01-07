-- ============================================
-- Blog Posts Feature - Database Migration
-- ============================================
-- Run this script in Supabase SQL Editor
-- ============================================

-- 1. Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP WITH TIME ZONE,
    views INTEGER DEFAULT 0,
    tags TEXT[], -- Array of tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

-- 3. Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Public can view published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin full access" ON public.blog_posts;
DROP POLICY IF EXISTS "Author can manage own posts" ON public.blog_posts;

-- 5. Create RLS Policies

-- Allow public read for published posts
CREATE POLICY "Public can view published posts"
    ON public.blog_posts FOR SELECT
    USING (status = 'published');

-- Admin can do everything
CREATE POLICY "Admin full access"
    ON public.blog_posts FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Authors can manage their own posts
CREATE POLICY "Author can manage own posts"
    ON public.blog_posts FOR ALL
    USING (author_id = auth.uid());

-- 6. Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger
DROP TRIGGER IF EXISTS blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_posts_updated_at();

-- 8. Insert sample data for testing (optional)
INSERT INTO public.blog_posts (title, slug, excerpt, content, author_id, status, published_at, tags, views)
VALUES 
(
    'Chào mừng đến với Blog của chúng tôi',
    'chao-mung-den-voi-blog-cua-chung-toi',
    'Đây là bài viết đầu tiên trong blog của Tiệm Quả Nghiệp...',
    'Nội dung đầy đủ của bài viết sẽ ở đây. Chúng tôi sẽ chia sẻ những kiến thức hữu ích về trái cây, cách bảo quản, chế biến và những lợi ích sức khỏe.',
    (SELECT id FROM auth.users LIMIT 1), -- Lấy user đầu tiên làm author
    'published',
    NOW(),
    ARRAY['chào mừng', 'giới thiệu'],
    150
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Verification Queries
-- ============================================

-- Check if table was created successfully
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'blog_posts'
) AS table_exists;

-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'blog_posts' 
AND schemaname = 'public';

-- Check policies
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'blog_posts' 
AND schemaname = 'public';

-- Count records
SELECT COUNT(*) as total_posts FROM public.blog_posts;

-- View sample data
SELECT id, title, status, created_at 
FROM public.blog_posts 
ORDER BY created_at DESC 
LIMIT 5;
