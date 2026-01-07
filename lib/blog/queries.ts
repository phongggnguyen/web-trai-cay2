// Server-side data fetching functions for Blog
import { supabase } from '../supabase';
import type { BlogPost } from './types';

/**
 * Fetch all published blog posts for public display
 * Ordered by published date (newest first)
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (error) throw error;

        // Add default author name
        const postsWithAuthor = (data || []).map(post => ({
            ...post,
            author_name: 'Admin',
        }));

        return postsWithAuthor as BlogPost[];
    } catch (err) {
        console.error('Failed to fetch published posts:', err);
        return [];
    }
}

/**
 * Fetch a single blog post by slug for public display
 * Only returns published posts
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (error) throw error;

        // Add default author name
        const postWithAuthor = {
            ...data,
            author_name: 'Admin',
        };

        return postWithAuthor as BlogPost;
    } catch (err) {
        console.error(`Failed to fetch post with slug "${slug}":`, err);
        return null;
    }
}

/**
 * Fetch related posts based on tags
 * Excludes the current post and limits to 3 results
 */
export async function getRelatedPosts(currentPostId: string, tags: string[], limit: number = 3): Promise<BlogPost[]> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .neq('id', currentPostId)
            .contains('tags', tags)
            .order('published_at', { ascending: false })
            .limit(limit);

        if (error) throw error;

        // Add default author name
        const postsWithAuthor = (data || []).map(post => ({
            ...post,
            author_name: 'Admin',
        }));

        return postsWithAuthor as BlogPost[];
    } catch (err) {
        console.error('Failed to fetch related posts:', err);
        return [];
    }
}

/**
 * Increment view count for a blog post
 */
export async function incrementPostViews(slug: string): Promise<void> {
    try {
        // First, get current views
        const { data: post } = await supabase
            .from('blog_posts')
            .select('id, views')
            .eq('slug', slug)
            .single();

        if (!post) return;

        // Increment views
        await supabase
            .from('blog_posts')
            .update({ views: (post.views || 0) + 1 })
            .eq('id', post.id);
    } catch (err) {
        console.error('Failed to increment views:', err);
    }
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .contains('tags', [tag.toLowerCase()])
            .order('published_at', { ascending: false });

        if (error) throw error;

        // Add default author name
        const postsWithAuthor = (data || []).map(post => ({
            ...post,
            author_name: 'Admin',
        }));

        return postsWithAuthor as BlogPost[];
    } catch (err) {
        console.error(`Failed to fetch posts with tag "${tag}":`, err);
        return [];
    }
}
