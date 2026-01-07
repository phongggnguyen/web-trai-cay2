'use client';

import React from 'react';
import type { BlogPost } from '../types';

interface BlogTableProps {
    blogs: BlogPost[];
    onEdit: (blog: BlogPost) => void;
    onDelete: (blog: BlogPost) => void;
    onView: (blog: BlogPost) => void;
}

export const BlogTable: React.FC<BlogTableProps> = ({ blogs, onEdit, onDelete, onView }) => {
    const formatDate = (date: Date | null) => {
        if (!date) return '-';
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-border-dark shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-border-dark text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-wider">
                            <th className="px-4 py-3 font-bold">Tiêu đề</th>
                            <th className="px-4 py-3 font-bold">Tác giả</th>
                            <th className="px-4 py-3 font-bold">Trạng thái</th>
                            <th className="px-4 py-3 font-bold">Ngày xuất bản</th>
                            <th className="px-4 py-3 font-bold">Lượt xem</th>
                            <th className="px-4 py-3 font-bold text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-border-dark/50">
                        {blogs.map((blog) => (
                            <tr
                                key={blog.id}
                                className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                                {/* Title */}
                                <td className="px-4 py-3">
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-text-main dark:text-white truncate max-w-sm">
                                            {blog.title}
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-sm">
                                            {blog.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                            {blog.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-[10px] font-bold"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </td>

                                {/* Author */}
                                <td className="px-4 py-3">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {blog.author}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-0.5 rounded text-[11px] font-bold capitalize ${blog.status === 'published'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                            }`}
                                    >
                                        {blog.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                                    </span>
                                </td>

                                {/* Published Date */}
                                <td className="px-4 py-3">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {formatDate(blog.publishedAt)}
                                    </span>
                                </td>

                                {/* Views */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-gray-400">
                                            visibility
                                        </span>
                                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                                            {blog.views.toLocaleString()}
                                        </span>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                        <button
                                            onClick={() => onView(blog)}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
                                            title="Xem"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        </button>
                                        <button
                                            onClick={() => onEdit(blog)}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                                            title="Chỉnh sửa"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(blog)}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                            title="Xóa"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {blogs.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-[48px] opacity-20">
                                            article
                                        </span>
                                        <p>Không tìm thấy bài viết nào</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
