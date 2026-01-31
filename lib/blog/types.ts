// Shared types for Blog functionality (Admin + Public)

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string | null;
    author_id: string;
    author_name?: string; // Populated from join or default
    status: 'draft' | 'published';
    published_at: Date | string | null; // Supabase returns ISO string
    created_at: Date | string; // Supabase returns ISO string
    updated_at: Date | string; // Supabase returns ISO string
    tags: string[];
    views: number;
}

export interface BlogFormData {
    title: string;
    excerpt: string;
    content: string;
    coverImage?: File | null;
    tags: string[];
    status: 'draft' | 'published';
}

export interface BlogFilters {
    status?: 'all' | 'draft' | 'published';
    search?: string;
    tags?: string[];
}

// Public-facing simplified type for listing
export interface BlogPostSummary {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string | null;
    published_at: Date | string | null; // Supabase returns ISO string
    tags: string[];
    views: number;
}
