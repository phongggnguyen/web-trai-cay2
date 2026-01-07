import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import { formatDate, getPrimaryTag } from '@/lib/blog/utils';

interface FeaturedPostProps {
    post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
    return (
        <div className="@container w-full">
            <Link href={`/blog/${post.slug}`}>
                <div className="flex flex-col items-stretch justify-start rounded-2xl @xl:flex-row @xl:items-stretch shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-surface-dark overflow-hidden group h-full border border-border-color dark:border-border-dark">
                    {/* Cover Image */}
                    <div
                        className="w-full @xl:w-2/5 bg-center bg-no-repeat bg-cover min-h-[240px] group-hover:scale-105 transition-transform duration-500"
                        style={{
                            backgroundImage: post.cover_image
                                ? `url("${post.cover_image}")`
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                    />

                    {/* Content */}
                    <div className="flex w-full @xl:w-3/5 flex-col justify-center p-6 gap-3">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/20 text-green-700 dark:text-primary text-xs font-bold px-2 py-1 rounded-md">
                                {getPrimaryTag(post.tags)}
                            </span>
                            <span className="text-gray-400 text-xs font-medium">
                                • {formatDate(post.published_at, 'short')}
                            </span>
                        </div>

                        <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">
                            {post.title}
                        </h3>

                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                            {post.excerpt}
                        </p>

                        <div className="pt-2">
                            <button className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                                Đọc tiếp <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
