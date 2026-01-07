'use client';

import { useState } from 'react';

interface BlogHeroProps {
    onSearch?: (query: string) => void;
}

export default function BlogHero({ onSearch }: BlogHeroProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    return (
        <section className="mb-12 rounded-3xl overflow-hidden relative min-h-[400px] flex items-center justify-center text-center px-4">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8Y_yJAXuEcvz-OpfoDA6-flZX2QDREdgSwO6huWlnLoEmDq0QBy1oFphdQrgOJYqDCa4XsdRY259OOZBuZQJYlh_IlXzmyzU9jx_CHtcPhN3uatfv-5nXkUN7SHNW7qWIvFXLqXuuu6-89qFN8vF9CCvJDhZePoVCNZ1ETuDQi_nlGfBZ1klSBIEFJDieYOvnGQP-a5pa-aew2PWJiZZ64NdSoX1Jri5G7muL8A8wySUpALUMA0g0XDYQSzIK6hxSIy5Ed6cWvx9F")'
                }}
            />
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-2xl flex flex-col items-center gap-6">
                <span className="inline-block px-4 py-1 rounded-full bg-primary text-text-main text-xs font-bold uppercase tracking-wider">
                    Blog Kiến Thức
                </span>

                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                    Khám Phá Thế Giới Trái Cây
                </h1>

                <p className="text-white/90 text-lg md:text-xl font-medium max-w-lg mx-auto">
                    "Nghiệp tụ vành môi - Ăn vô trôi hết."
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4">
                    <div className="flex w-full items-center bg-white rounded-full p-1 pl-5 shadow-lg">
                        <span className="material-symbols-outlined text-text-secondary">search</span>
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-secondary/70"
                            placeholder="Tìm kiếm bài viết..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-primary text-text-main rounded-full px-6 py-2.5 font-bold hover:bg-primary/90 whitespace-nowrap"
                        >
                            Tìm ngay
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
