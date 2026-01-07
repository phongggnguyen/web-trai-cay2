'use client';

import { BLOG_CATEGORIES } from '@/lib/blog/constants';
import Link from 'next/link';

interface CategoriesWidgetProps {
    activeCategory?: string;
    onCategoryChange?: (category: string) => void;
}

export default function CategoriesWidget({ activeCategory, onCategoryChange }: CategoriesWidgetProps) {
    const handleClick = (categoryName: string) => {
        if (onCategoryChange) {
            onCategoryChange(categoryName);
        }
    };

    return (
        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">category</span>
                Chuyên mục ngon
            </h3>
            <div className="flex flex-wrap gap-2">
                {BLOG_CATEGORIES.map((category) => {
                    const isActive = activeCategory === category.name;
                    return (
                        <button
                            key={category.name}
                            onClick={() => handleClick(category.name)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${isActive
                                    ? 'bg-primary text-text-main'
                                    : 'bg-[#eaf3e8] dark:bg-white/10 text-text-main dark:text-white hover:bg-primary/50 hover:text-text-main'
                                }`}
                        >
                            {category.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
