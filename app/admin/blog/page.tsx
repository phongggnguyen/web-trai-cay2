'use client';

import React, { useState } from 'react';
import type { BlogPost } from './types';
import { BlogTable } from './_components/BlogTable';

// Mock data cho demo
const MOCK_BLOGS: BlogPost[] = [
    {
        id: '1',
        title: '10 Loại Trái Cây Tốt Nhất Cho Sức Khỏe',
        slug: '10-loai-trai-cay-tot-nhat-cho-suc-khoe',
        excerpt: 'Khám phá những loại trái cây giàu dinh dưỡng giúp tăng cường sức khỏe và miễn dịch...',
        content: 'Nội dung bài viết đầy đủ...',
        coverImage: null,
        author: 'Admin',
        status: 'published',
        publishedAt: new Date('2024-01-15'),
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
        tags: ['sức khỏe', 'dinh dưỡng'],
        views: 1250,
    },
    {
        id: '2',
        title: 'Cách Bảo Quản Trái Cây Tươi Lâu Hơn',
        slug: 'cach-bao-quan-trai-cay-tuoi-lau-hon',
        excerpt: 'Mẹo hay giúp bạn giữ trái cây tươi ngon trong nhiều ngày...',
        content: 'Nội dung bài viết đầy đủ...',
        coverImage: null,
        author: 'Admin',
        status: 'published',
        publishedAt: new Date('2024-01-20'),
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-20'),
        tags: ['mẹo hay', 'bảo quản'],
        views: 890,
    },
    {
        id: '3',
        title: 'Trái Cây Nhập Khẩu vs Trái Cây Nội Địa',
        slug: 'trai-cay-nhap-khau-vs-trai-cay-noi-dia',
        excerpt: 'So sánh chi tiết về chất lượng, giá cả và dinh dưỡng...',
        content: 'Nội dung bài viết đầy đủ...',
        coverImage: null,
        author: 'Admin',
        status: 'draft',
        publishedAt: null,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25'),
        tags: ['so sánh', 'nhập khẩu'],
        views: 0,
    },
];

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
    const [isLoading] = useState(false);

    // Filter Logic
    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch =
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'all' || blog.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Calculate Stats
    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter((b) => b.status === 'published').length;
    const draftBlogs = blogs.filter((b) => b.status === 'draft').length;
    const totalViews = blogs.reduce((sum, b) => sum + b.views, 0);

    const handleDelete = (blog: BlogPost) => {
        if (confirm(`Bạn có chắc muốn xóa "${blog.title}"?`)) {
            setBlogs(blogs.filter((b) => b.id !== blog.id));
        }
    };

    const handleEdit = (blog: BlogPost) => {
        alert(`Chỉnh sửa: ${blog.title}`);
    };

    const handleView = (blog: BlogPost) => {
        alert(`Xem bài viết: ${blog.title}`);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-black text-text-main dark:text-white tracking-tight">
                        Quản lý Blog
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        Danh sách bài viết và nội dung blog
                    </p>
                </div>

                <button
                    onClick={() => alert('Thêm bài viết mới')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-text-main rounded-lg font-bold shadow-lg shadow-primary/30 transition-all transform hover:scale-105 text-sm"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Thêm bài viết
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-gray-100 dark:border-border-dark flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <span className="material-symbols-outlined text-[20px]">article</span>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Tổng bài viết</p>
                        <p className="text-lg font-black text-text-main dark:text-white">{totalBlogs}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-gray-100 dark:border-border-dark flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Đã xuất bản</p>
                        <p className="text-lg font-black text-text-main dark:text-white">{publishedBlogs}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-gray-100 dark:border-border-dark flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Bản nháp</p>
                        <p className="text-lg font-black text-text-main dark:text-white">{draftBlogs}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-gray-100 dark:border-border-dark flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Lượt xem</p>
                        <p className="text-lg font-black text-text-main dark:text-white">{totalViews}</p>
                    </div>
                </div>
            </div>

            {/* Controls: Search & Filter */}
            <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-gray-100 dark:border-border-dark shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <span className="material-symbols-outlined text-[18px]">search</span>
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm tiêu đề bài viết..."
                        className="block w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-white/5 text-text-main dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter Status */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="published">Đã xuất bản</option>
                    <option value="draft">Bản nháp</option>
                </select>
            </div>

            {/* Blog Table */}
            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
            ) : (
                <BlogTable
                    blogs={filteredBlogs}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            )}
        </div>
    );
}
