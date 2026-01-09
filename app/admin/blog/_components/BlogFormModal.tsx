'use client';

import React, { useState } from 'react';
import type { BlogPost, BlogFormData } from '../types';
import { BlogForm } from './BlogForm';
import { BlogFormAI } from './BlogFormAI';
import { ModeSwitcher } from './ModeSwitcher';

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
    const [mode, setMode] = useState<'manual' | 'ai'>('manual');

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Reset mode when opening for new post
    const isEditing = !!blog;

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
                    <div>
                        <h3 className="text-2xl font-black text-text-main dark:text-white">
                            {blog ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
                        </h3>
                        {!blog && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Chọn cách tạo blog: viết thủ công hoặc sử dụng AI
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Mode Switcher - only show when creating new post */}
                        {!isEditing && (
                            <ModeSwitcher mode={mode} onChange={setMode} />
                        )}

                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[24px] text-gray-500">close</span>
                        </button>
                    </div>
                </div>

                {/* Render appropriate form based on mode */}
                {isEditing || mode === 'manual' ? (
                    <BlogForm blog={blog} onSubmit={onSubmit} onCancel={onClose} />
                ) : (
                    <BlogFormAI onSubmit={onSubmit} onCancel={onClose} />
                )}
            </div>
        </div>
    );
};
