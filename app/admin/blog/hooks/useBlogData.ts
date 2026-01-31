import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../../../lib/supabase';
import { useImageUpload } from './useImageUpload';
import { generateSlug } from '../utils/generateSlug';
import type { BlogPost, BlogFormData } from '../types';

interface UseBlogDataReturn {
    blogs: BlogPost[];
    loading: boolean;
    error: string | null;
    createBlog: (data: BlogFormData) => Promise<void>;
    updateBlog: (id: string, data: BlogFormData, currentImageUrl?: string | null) => Promise<void>;
    deleteBlog: (id: string, imageUrl?: string | null) => Promise<void>;
    publishBlog: (id: string) => Promise<void>;
    refetch: () => Promise<void>;
}

export function useBlogData(): UseBlogDataReturn {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { uploadImage, deleteImage } = useImageUpload();

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) {
                // Check if error is due to missing table
                if (fetchError.code === 'PGRST116' || fetchError.message.includes('relation "public.blog_posts" does not exist')) {
                    throw new Error('DATABASE_SETUP_REQUIRED');
                }
                throw fetchError;
            }

            // Transform data to match BlogPost interface
            // For now, use default author name. Can be enhanced later with proper join
            const blogsWithAuthor = (data || []).map(item => ({
                ...item,
                author_name: 'Admin', // Default author name
            }));

            setBlogs(blogsWithAuthor as BlogPost[]);
        } catch (err: any) {
            console.error('Failed to fetch blogs:', err);

            if (err.message === 'DATABASE_SETUP_REQUIRED') {
                setError('DATABASE_SETUP_REQUIRED');
            } else {
                setError(err.message || 'Không thể tải danh sách bài viết');
            }
            toast.error('Không thể tải danh sách bài viết');
        } finally {
            setLoading(false);
        }
    };

    const createBlog = async (data: BlogFormData) => {
        try {
            let coverImageUrl: string | null = null;

            // Upload cover image if provided
            if (data.coverImage) {
                coverImageUrl = await uploadImage(data.coverImage);
            }

            // Generate slug from title
            const slug = generateSlug(data.title);

            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Bạn cần đăng nhập để tạo bài viết');

            // Insert into database
            const { data: newBlog, error: insertError } = await supabase
                .from('blog_posts')
                .insert({
                    title: data.title,
                    slug: slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    cover_image: coverImageUrl,
                    author_id: user.id,
                    status: data.status,
                    published_at: data.status === 'published' ? new Date().toISOString() : null,
                    tags: data.tags,
                })
                .select()
                .single();

            if (insertError) throw insertError;

            // Add default author name
            const blogWithAuthor = {
                ...newBlog,
                author_name: 'Admin',
            };

            // Optimistic UI update
            setBlogs([blogWithAuthor as BlogPost, ...blogs]);
            toast.success('Tạo bài viết thành công');
        } catch (err: any) {
            console.error('Failed to create blog:', err);
            toast.error(err.message || 'Không thể tạo bài viết');
            throw err;
        }
    };

    const updateBlog = async (
        id: string,
        data: BlogFormData,
        currentImageUrl?: string | null
    ) => {
        try {
            let coverImageUrl = currentImageUrl;

            // Upload new image if provided
            if (data.coverImage) {
                // Delete old image first
                if (currentImageUrl) {
                    await deleteImage(currentImageUrl);
                }
                // Upload new image
                coverImageUrl = await uploadImage(data.coverImage);
            }

            // Generate new slug from updated title
            const slug = generateSlug(data.title);

            // Update database
            const { data: updatedBlog, error: updateError } = await supabase
                .from('blog_posts')
                .update({
                    title: data.title,
                    slug: slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    cover_image: coverImageUrl,
                    status: data.status,
                    published_at: data.status === 'published' && !currentImageUrl
                        ? new Date().toISOString()
                        : undefined,
                    tags: data.tags,
                })
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            // Add default author name
            const blogWithAuthor = {
                ...updatedBlog,
                author_name: 'Admin',
            };

            // Update UI
            setBlogs(blogs.map(b => (b.id === id ? blogWithAuthor as BlogPost : b)));
            toast.success('Cập nhật bài viết thành công');
        } catch (err: any) {
            console.error('Failed to update blog:', err);
            toast.error(err.message || 'Không thể cập nhật bài viết');
            throw err;
        }
    };

    const deleteBlog = async (id: string, imageUrl?: string | null) => {
        try {
            // Delete image first if exists
            if (imageUrl) {
                await deleteImage(imageUrl);
            }

            // Delete from database
            const { error: deleteError } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            // Update UI
            setBlogs(blogs.filter(b => b.id !== id));
            toast.success('Xóa bài viết thành công');
        } catch (err: any) {
            console.error('Failed to delete blog:', err);
            toast.error(err.message || 'Không thể xóa bài viết');
            throw err;
        }
    };

    const publishBlog = async (id: string) => {
        try {
            const { data: updatedBlog, error: updateError } = await supabase
                .from('blog_posts')
                .update({
                    status: 'published',
                    published_at: new Date().toISOString(),
                })
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            // Add default author name
            const blogWithAuthor = {
                ...updatedBlog,
                author_name: 'Admin',
            };

            // Update UI
            setBlogs(blogs.map(b => (b.id === id ? blogWithAuthor as BlogPost : b)));
            toast.success('Xuất bản bài viết thành công');
        } catch (err: any) {
            console.error('Failed to publish blog:', err);
            toast.error(err.message || 'Không thể xuất bản bài viết');
            throw err;
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return {
        blogs,
        loading,
        error,
        createBlog,
        updateBlog,
        deleteBlog,
        publishBlog,
        refetch: fetchBlogs,
    };
}
