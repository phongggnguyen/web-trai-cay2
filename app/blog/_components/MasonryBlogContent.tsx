'use client';

import { useState } from 'react';
import type { BlogPost } from '@/lib/blog/types';
import type { Product } from '@/lib/products/queries';
import { normalizeTag } from '@/lib/blog/utils';
import { BLOG_CATEGORIES } from '@/lib/blog/constants';
import MasonryBlogCard from './MasonryBlogCard';
import BlogHero from './BlogHero';
import CategoriesWidget from './CategoriesWidget';
import RecentPostsWidget from './RecentPostsWidget';
import NewsletterWidget from './NewsletterWidget';
import ProductSuggestionWidget from './ProductSuggestionWidget';

interface MasonryBlogContentProps {
    initialPosts: BlogPost[];
    hotProduct?: Product | null;
}

export default function MasonryBlogContent({ initialPosts, hotProduct }: MasonryBlogContentProps) {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    // Filter posts
    const filteredPosts = initialPosts.filter((post) => {
        // Category filter
        const categoryMatch =
            activeCategory === 'Tất cả' ||
            post.tags.some(tag =>
                normalizeTag(tag) === BLOG_CATEGORIES.find(c => c.name === activeCategory)?.tag
            );

        // Search filter
        const searchMatch =
            searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

        return categoryMatch && searchMatch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Assign variants to posts for variety
    const getVariant = (index: number) => {
        const variants: Array<'default' | 'tall' | 'wide' | 'text-only'> = ['default', 'tall', 'wide', 'text-only'];
        // Every 5th post is text-only, alternating others
        if ((index + 1) % 5 === 0) return 'text-only';
        return variants[index % 3];
    };

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Hero with Search */}
            <BlogHero onSearch={handleSearch} />

            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Column: Masonry Grid */}
                <div className="lg:w-2/3">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-text-main dark:text-white">
                            Bài viết mới nhất
                        </h3>
                        <div className="flex gap-2">
                            <button className="size-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                                <span className="material-symbols-outlined text-[18px] dark:text-white text-text-main">grid_view</span>
                            </button>
                            <button className="size-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                                <span className="material-symbols-outlined text-[18px] dark:text-white text-text-main">view_list</span>
                            </button>
                        </div>
                    </div>

                    {/* Masonry Grid using CSS Columns */}
                    {paginatedPosts.length > 0 ? (
                        <div className="columns-1 md:columns-2 gap-6 space-y-6">
                            {paginatedPosts.map((post, index) => (
                                <MasonryBlogCard
                                    key={post.id}
                                    post={post}
                                    variant={getVariant(index)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
                                <span className="material-symbols-outlined text-4xl text-gray-400">article</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                                Không tìm thấy bài viết
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Thử tìm kiếm với từ khóa khác nhé!
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10 gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`size-10 rounded-full flex items-center justify-center transition-colors ${currentPage === page
                                        ? 'bg-primary text-text-main font-bold'
                                        : 'bg-white dark:bg-white/10 hover:bg-primary hover:text-text-main font-medium text-text-main dark:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            {currentPage < totalPages && (
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="size-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center hover:bg-primary hover:text-text-main transition-colors font-medium text-text-main dark:text-white"
                                >
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward_ios</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column: Sidebar */}
                <aside className="lg:w-1/3 flex flex-col gap-8">
                    <div className="lg:sticky lg:top-24 flex flex-col gap-8">
                        <CategoriesWidget
                            activeCategory={activeCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                        <RecentPostsWidget posts={initialPosts} limit={3} />
                        <ProductSuggestionWidget product={hotProduct} />
                        <NewsletterWidget />
                    </div>
                </aside>
            </div>
        </>
    );
}
