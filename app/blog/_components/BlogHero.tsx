'use client';

import { useState } from 'react';

// Constants
const HERO_CONFIG = {
    BACKGROUND_IMAGE: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8Y_yJAXuEcvz-OpfoDA6-flZX2QDREdgSwO6huWlnLoEmDq0QBy1oFphdQrgOJYqDCa4XsdRY259OOZBuZQJYlh_IlXzmyzU9jx_CHtcPhN3uatfv-5nXkUN7SHNW7qWIvFXLqXuuu6-89qFN8vF9CCvJDhZePoVCNZ1ETuDQi_nlGfBZ1klSBIEFJDieYOvnGQP-a5pa-aew2PWJiZZ64NdSoX1Jri5G7muL8A8wySUpALUMA0g0XDYQSzIK6hxSIy5Ed6cWvx9F',
    BADGE_TEXT: 'Blog Kiến Thức',
    TITLE: 'Khám Phá Thế Giới Trái Cây',
    SUBTITLE: '"Nghiệp tụ vành môi - Ăn vô trôi hết."',
    SEARCH_PLACEHOLDER: 'Tìm kiếm bài viết...',
    SEARCH_BUTTON: 'Tìm ngay',
} as const;

interface BlogHeroProps {
    onSearch?: (query: string) => void;
}

export default function BlogHero({ onSearch }: BlogHeroProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch && searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    return (
        <section
            className="relative flex min-h-[500px] lg:min-h-[70vh] items-center justify-center bg-black/50 py-20 text-center animate-[fadeIn_0.5s_ease-out]"
            role="banner"
            aria-label="Blog hero section"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${HERO_CONFIG.BACKGROUND_IMAGE}")`,
                    }}
                    aria-hidden="true"
                />
                {/* Gradient to blend with page content */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background-light dark:to-background-dark"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl px-4 w-full flex flex-col items-center animate-[slideUp_0.8s_ease-out]">
                {/* Badge */}
                <span
                    className="mb-6 inline-block rounded-full bg-primary/90 px-5 py-2 text-sm font-bold text-text-main shadow-lg backdrop-blur-sm"
                >
                    {HERO_CONFIG.BADGE_TEXT}
                </span>

                {/* Title */}
                <h1 className="mb-6 text-5xl md:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
                    {HERO_CONFIG.TITLE}
                </h1>

                {/* Subtitle */}
                <p className="mb-10 text-xl font-medium text-gray-100 max-w-2xl mx-auto drop-shadow-md">
                    {HERO_CONFIG.SUBTITLE}
                </p>

                {/* Search Bar - Enhanced */}
                <form
                    onSubmit={handleSearch}
                    className="w-full max-w-xl mx-auto"
                    role="search"
                >
                    <div
                        className={`group flex w-full items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 pr-2 shadow-2xl transition-all duration-300 hover:bg-white/20 ${isSearchFocused ? 'ring-2 ring-primary/50 bg-white/20' : ''
                            }`}
                    >
                        <span
                            className="material-symbols-outlined text-white/80 ml-4 group-hover:text-white transition-colors"
                            aria-hidden="true"
                        >
                            search
                        </span>
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/70 px-4 text-lg font-medium focus:outline-none"
                            placeholder={HERO_CONFIG.SEARCH_PLACEHOLDER}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            aria-label="Search blog posts"
                        />
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-text-main rounded-full px-8 py-3 font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
                            aria-label="Submit search"
                        >
                            {HERO_CONFIG.SEARCH_BUTTON}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
