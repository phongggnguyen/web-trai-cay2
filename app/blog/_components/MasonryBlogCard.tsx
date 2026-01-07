import type { BlogPost } from '@/lib/blog/types';
import { formatDate, getPrimaryTag } from '@/lib/blog/utils';
import Link from 'next/link';

interface MasonryBlogCardProps {
    post: BlogPost;
    variant?: 'default' | 'tall' | 'wide' | 'text-only';
}

export default function MasonryBlogCard({ post, variant = 'default' }: MasonryBlogCardProps) {
    const aspectRatios = {
        default: 'aspect-[4/3]',
        tall: 'aspect-[3/4]',
        wide: 'aspect-video',
        'text-only': ''
    };

    if (variant === 'text-only') {
        return (
            <Link href={`/blog/${post.slug}`}>
                <article className="break-inside-avoid p-6 bg-[#eaf3e8] dark:bg-white/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-primary/30 flex flex-col justify-center items-start min-h-[200px]">
                    <span className="material-symbols-outlined text-4xl text-primary mb-3">tips_and_updates</span>
                    <h4 className="text-xl font-bold text-text-main dark:text-white mb-2 leading-tight">
                        {post.title}
                    </h4>
                    <p className="text-text-secondary dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                    </p>
                    <button className="px-4 py-2 bg-text-main text-white dark:bg-primary dark:text-text-main rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
                        Xem bí kíp
                    </button>
                </article>
            </Link>
        );
    }

    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="break-inside-avoid bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-transparent hover:border-primary/30">
                {/* Cover Image */}
                <div className={`relative w-full ${aspectRatios[variant]} overflow-hidden`}>
                    <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={post.cover_image || 'https://via.placeholder.com/400x300?text=Blog+Post'}
                        alt={post.title}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-text-main">
                        {getPrimaryTag(post.tags)}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h4 className="text-xl font-bold text-text-main dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h4>
                    <p className="text-text-secondary dark:text-gray-400 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                    </p>
                    <button className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                        Đọc tiếp
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </article>
        </Link>
    );
}
