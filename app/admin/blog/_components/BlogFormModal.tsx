'use client';

import React from 'react';
import type { BlogPost, BlogFormData } from '../types';
import { BlogForm } from './BlogForm';

interface BlogFormModalProps {
    isOpen: boolean;
    blog: BlogPost | null;
    onClose: () => void;
    onSubmit: (data: BlogFormData, imageFile?: File | null, currentImageUrl?: string | null) => Promise<void>;
}

export const BlogFormModal: React.FC<BlogFormModalProps> = ({
    isOpen,
    blog,
    onClose,
    onSubmit,
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleBackdropClick}
        >
            <div
                className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-surface-dark rounded-2xl shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black text-text-main dark:text-white">
                        {blog ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px] text-gray-500">close</span>
                    </button>
                </div>

                <BlogForm blog={blog} onSubmit={onSubmit} onCancel={onClose} />
            </div>
        </div>
    );
};
