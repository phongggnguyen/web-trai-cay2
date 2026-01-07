import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts, incrementPostViews } from '@/lib/blog/queries';
import { formatDate, estimateReadingTime, getPrimaryTag } from '@/lib/blog/utils';
import BlogCard from '../_components/BlogCard';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Bài viết không tồn tại',
        };
    }

    return {
        title: `${post.title} | Blog - Tiệm Quả Nghiệp`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.cover_image ? [post.cover_image] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Increment view count (fire and forget)
    incrementPostViews(slug);

    // Get related posts
    const relatedPosts = await getRelatedPosts(post.id, post.tags, 3);

    return (
        <div className="w-full">
            {/* Hero Image */}
            {post.cover_image && (
                <div className="w-full h-[400px] relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url("${post.cover_image}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
            )}

            {/* Content Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <Link href="/" className="hover:text-primary">
                        Trang chủ
                    </Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-primary">
                        Blog
                    </Link>
                    <span>/</span>
                    <span className="text-text-main dark:text-white font-medium">{post.title}</span>
                </nav>

                {/* Article Header */}
                <article>
                    <header className="mb-8">
                        {/* Category Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-block px-3 py-1 bg-primary/20 text-green-700 dark:text-primary text-xs font-bold rounded-full">
                                {getPrimaryTag(post.tags)}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                                {formatDate(post.published_at, 'long')}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                                • {estimateReadingTime(post.content)}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl lg:text-5xl font-black text-text-main dark:text-white leading-tight mb-4">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between pt-6 border-t border-border-color dark:border-border-dark">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-text-main font-bold">
                                    A
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-main dark:text-white">
                                        {post.author_name || 'Admin'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Tác giả
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    <span className="text-sm">{post.views.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Article Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                        <div className="whitespace-pre-wrap text-text-main dark:text-white leading-relaxed">
                            {post.content}
                        </div>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-border-color dark:border-border-dark">
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="px-3 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary/20 hover:text-primary transition-colors"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Share Buttons */}
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-sm font-bold text-text-main dark:text-white">
                            Chia sẻ:
                        </span>
                        <div className="flex gap-2">
                            {/* Facebook */}
                            <button className="size-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                                <span className="text-sm">f</span>
                            </button>
                            {/* Twitter */}
                            <button className="size-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors">
                                <span className="text-sm">𝕏</span>
                            </button>
                            {/* Copy Link */}
                            <button className="size-10 rounded-full bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 flex items-center justify-center transition-colors">
                                <span className="material-symbols-outlined text-[20px] text-text-main dark:text-white">link</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-text-main dark:text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full block"></span>
                            Bài viết liên quan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Back to Blog */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-surface-dark border-2 border-border-color dark:border-border-dark text-text-main dark:text-white font-bold hover:bg-primary hover:border-primary hover:text-text-main transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Quay lại Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
