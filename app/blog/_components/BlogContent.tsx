'use client';

import { useState } from 'react';
import type { BlogPost } from '@/lib/blog/types';
import { BLOG_CATEGORIES } from '@/lib/blog/constants';
import { normalizeTag } from '@/lib/blog/utils';
import BlogGrid from './BlogGrid';
import FeaturedPost from './FeaturedPost';

interface BlogContentProps {
    initialPosts: BlogPost[];
}

export default function BlogContent({ initialPosts }: BlogContentProps) {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter posts based on category and search
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

    const featuredPost = filteredPosts[0];
    const gridPosts = filteredPosts.slice(1);

    return (
        <>
            {/* Search Bar */}
            <div className="w-full max-w-[600px] z-10 mt-4 px-4 mx-auto">
                <label className="flex flex-col h-14 w-full shadow-lg rounded-xl">
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-white dark:bg-surface-dark p-1">
                        <div className="text-text-muted flex items-center justify-center pl-3">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white px-3 text-base"
                            placeholder="Bạn muốn tìm hiểu về loại quả nào?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="flex items-center justify-center px-3 text-gray-400 hover:text-text-main"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        )}
                    </div>
                </label>
            </div>

            {/* Main Content Container */}
            <div className="flex h-full grow flex-col w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Filter Chips */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar flex-nowrap">
                        {BLOG_CATEGORIES.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-6 transition-all shadow-sm ${activeCategory === cat.name
                                        ? 'bg-text-main dark:bg-primary text-white dark:text-text-main shadow-md transform scale-105'
                                        : 'bg-white dark:bg-surface-dark border border-border-color dark:border-border-dark hover:border-primary group'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[20px] ${activeCategory === cat.name ? '' : 'text-gray-500 group-hover:text-primary'}`}>
                                    {cat.icon}
                                </span>
                                <p className={`text-sm font-medium ${activeCategory === cat.name ? 'font-bold' : 'text-text-main dark:text-white'}`}>
                                    {cat.name}
                                </p>
                            </button>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-text-muted">
                        <span>Tìm thấy {filteredPosts.length} bài viết</span>
                    </div>
                </div>

                {/* Blog Posts */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <h3 className="text-2xl font-bold text-text-main dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-8 bg-primary rounded-full block"></span>
                        Bài viết nổi bật
                    </h3>

                    {/* Featured Post */}
                    {featuredPost && <FeaturedPost post={featuredPost} />}

                    {/* Grid Posts */}
                    <BlogGrid posts={gridPosts} />
                </div>
            </div>
        </>
    );
}
