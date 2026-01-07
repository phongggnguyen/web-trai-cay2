import BlogCard from './BlogCard';
import type { BlogPost } from '@/lib/blog/types';

interface BlogGridProps {
    posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    if (posts.length === 0) {
        return (
            <div className="col-span-full text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
                    <span className="material-symbols-outlined text-4xl text-gray-400">article</span>
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                    Chưa có bài viết nào
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Hãy quay lại sau để đọc những bài viết mới nhất nhé!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>
    );
}
