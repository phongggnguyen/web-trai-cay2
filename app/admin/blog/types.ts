export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    author: string;
    status: 'draft' | 'published';
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    views: number;
}

export interface BlogFilters {
    status: 'all' | 'draft' | 'published';
    search: string;
}
