'use client';

import React, { useState } from 'react';
import type { BlogPost, BlogFormData } from './types';
import { BlogTable } from './_components/BlogTable';
import { BlogFormModal } from './_components/BlogFormModal';
import { useBlogData } from './hooks/useBlogData';

export default function AdminBlogPage() {
    const { blogs, loading, error, createBlog, updateBlog, deleteBlog } = useBlogData();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

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

    const handleFormSubmit = async (data: BlogFormData, imageFile?: File | null, currentImageUrl?: string | null) => {
        if (editingBlog) {
            await updateBlog(editingBlog.id, data, currentImageUrl);
        } else {
            await createBlog(data);
        }

        // Close form
        setIsFormOpen(false);
        setEditingBlog(null);
    };

    const handleEdit = (blog: BlogPost) => {
        setEditingBlog(blog);
        setIsFormOpen(true);
    };

    const handleDelete = async (blog: BlogPost) => {
        if (confirm(`Bạn có chắc muốn xóa "${blog.title}"?`)) {
            await deleteBlog(blog.id, blog.cover_image);
        }
    };

    const handleView = (blog: BlogPost) => {
        // TODO: Navigate to blog detail page or preview
        window.open(`/blog/${blog.slug}`, '_blank');
    };

    return (
        <div className="flex flex-col gap-4">
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
                    onClick={() => {
                        setEditingBlog(null);
                        setIsFormOpen(true);
                    }}
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
            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
            ) : error === 'DATABASE_SETUP_REQUIRED' ? (
                <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-8 dark:border-orange-800 dark:bg-orange-900/20">
                    <div className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-[48px] text-orange-500">database</span>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h3 className="text-xl font-black text-orange-900 dark:text-orange-200">
                                    Cần setup Database
                                </h3>
                                <p className="mt-1 text-sm text-orange-700 dark:text-orange-300">
                                    Bảng <code className="rounded bg-orange-200 dark:bg-orange-800 px-1.5 py-0.5 font-mono text-xs">blog_posts</code> chưa tồn tại trong Supabase.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm font-bold text-orange-900 dark:text-orange-200">
                                    📝 Hướng dẫn setup:
                                </p>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-orange-800 dark:text-orange-300">
                                    <li>
                                        Mở <strong>Supabase Dashboard</strong> → SQL Editor
                                    </li>
                                    <li>
                                        Copy toàn bộ nội dung trong file{' '}
                                        <code className="rounded bg-orange-200 dark:bg-orange-800 px-1.5 py-0.5 font-mono text-xs">
                                            migrations/create_blog_posts.sql
                                        </code>
                                    </li>
                                    <li>Paste vào SQL Editor và click <strong>Run</strong></li>
                                    <li>Refresh lại trang này</li>
                                </ol>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                                    Refresh trang
                                </button>
                                <a
                                    href="https://supabase.com/dashboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-lg border-2 border-orange-500 px-4 py-2 font-bold text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                    Mở Supabase
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
            ) : (
                <BlogTable
                    blogs={filteredBlogs}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            )}

            {/* Form Modal */}
            <BlogFormModal
                isOpen={isFormOpen}
                blog={editingBlog}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingBlog(null);
                }}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}
