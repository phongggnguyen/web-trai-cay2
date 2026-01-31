-- ============================================
-- RLS POLICIES FOR BLOG_POSTS TABLE
-- Chạy script này trong Supabase SQL Editor
-- ============================================

-- Bước 1: Enable RLS cho blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Bước 2: Xóa policies cũ (nếu có)
DROP POLICY IF EXISTS "Public can view published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin full access" ON public.blog_posts;
DROP POLICY IF EXISTS "Author can manage own posts" ON public.blog_posts;

-- Bước 3: Tạo RLS Policies

-- Policy 1: Cho phép public đọc bài đã publish
CREATE POLICY "Public can view published posts"
    ON public.blog_posts FOR SELECT
    USING (status = 'published');

-- Policy 2: Cho phép Admin toàn quyền
CREATE POLICY "Admin full access"
    ON public.blog_posts FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Policy 3: Cho phép author quản lý bài viết của mình
CREATE POLICY "Author can manage own posts"
    ON public.blog_posts FOR ALL
    USING (author_id = auth.uid());

-- ============================================
-- VERIFICATION
-- ============================================
-- Kiểm tra policies đã được tạo:
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'blog_posts' 
AND schemaname = 'public';
