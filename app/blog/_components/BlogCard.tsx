import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import { formatDate, getPrimaryTag } from '@/lib/blog/utils';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <div className="flex flex-col bg-white dark:bg-surface-dark rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-border-color dark:border-border-dark h-full">
                {/* Cover Image */}
                <div
                    className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                        backgroundImage: post.cover_image
                            ? `url('${post.cover_image}')`
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                />

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                        <span className="text-text-muted text-xs font-bold uppercase tracking-wider">
                            {getPrimaryTag(post.tags)}
                        </span>
                        <span className="text-gray-400 text-xs">
                            {formatDate(post.published_at, 'short')}
                        </span>
                    </div>

                    <h4 className="text-lg font-bold text-text-main dark:text-white leading-snug group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                        {post.title}
                    </h4>

                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                        {post.excerpt}
                    </p>
                </div>
            </div>
        </Link>
    );
}
