import type { BlogPost } from '@/lib/blog/types';
import { formatDate } from '@/lib/blog/utils';
import Link from 'next/link';

interface RecentPostsWidgetProps {
    posts: BlogPost[];
    limit?: number;
}

export default function RecentPostsWidget({ posts, limit = 3 }: RecentPostsWidgetProps) {
    const displayPosts = posts.slice(0, limit);

    return (
        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">eco</span>
                Bài viết mới hái
            </h3>
            <div className="flex flex-col gap-4">
                {displayPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 group">
                        <div className="size-16 rounded-xl overflow-hidden shrink-0">
                            <img
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                src={post.cover_image || 'https://via.placeholder.com/64'}
                                alt={post.title}
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h5 className="text-sm font-bold text-text-main dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h5>
                            <p className="text-xs text-text-secondary mt-1">
                                {formatDate(post.published_at, 'short')}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
