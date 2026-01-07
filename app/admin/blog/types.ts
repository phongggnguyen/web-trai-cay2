export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string | null;
    author_id: string;
    author_name?: string; // Joined from profiles
    status: 'draft' | 'published';
    published_at: Date | null;
    created_at: Date;
    updated_at: Date;
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
    status: 'all' | 'draft' | 'published';
    search: string;
}
