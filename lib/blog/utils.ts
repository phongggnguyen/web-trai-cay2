// Shared utility functions for Blog

/**
 * Format date for display
 * @param date - Date string or Date object
 * @param format - 'short' | 'long' | 'relative'
 */
export function formatDate(date: Date | string | null, format: 'short' | 'long' | 'relative' = 'short'): string {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) return '';

    if (format === 'relative') {
        return getRelativeTime(dateObj);
    }

    if (format === 'long') {
        return dateObj.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    // Default: short format
    return dateObj.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

/**
 * Get relative time (e.g., "2 ngày trước", "1 tuần trước")
 */
function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffSecs < 60) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffWeeks < 4) return `${diffWeeks} tuần trước`;
    if (diffMonths < 12) return `${diffMonths} tháng trước`;

    return formatDate(date, 'short');
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

/**
 * Estimate reading time based on content length
 * Average reading speed: 200 words per minute (Vietnamese)
 */
export function estimateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    if (minutes < 1) return '< 1 phút đọc';
    return `${minutes} phút đọc`;
}

/**
 * Get the first tag or default category
 */
export function getPrimaryTag(tags: string[]): string {
    if (tags && tags.length > 0) {
        return tags[0];
    }
    return 'Sức khỏe'; // Default category
}

/**
 * Normalize tag for filtering (lowercase, trim)
 */
export function normalizeTag(tag: string): string {
    return tag.toLowerCase().trim();
}

/**
 * Check if post matches search query
 */
export function matchesSearch(post: { title: string; excerpt: string }, query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return (
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery)
    );
}
