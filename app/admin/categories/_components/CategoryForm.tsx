'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type CategoryFormInput, type Category } from '../types';

interface Props {
    category?: Category | null;
    onSubmit: (data: CategoryFormInput) => Promise<void>;
    onCancel: () => void;
}

export function CategoryForm({ category, onSubmit, onCancel }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CategoryFormInput>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || '',
            description: category?.description || '',
        },
    });

    const handleFormSubmit = async (data: CategoryFormInput) => {
        try {
            await onSubmit(data);
        } catch (error) {
            // Error handling done in hook
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Category Name */}
            <div>
                <label className="block text-sm font-bold text-white mb-2">
                    Tên danh mục <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background-dark text-white placeholder:text-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Ví dụ: Trái cây nhập khẩu"
                />
                {errors.name && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">error</span>
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-bold text-white mb-2">
                    Mô tả
                </label>
                <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background-dark text-white placeholder:text-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Mô tả ngắn gọn về danh mục..."
                />
                {errors.description && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">error</span>
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Slug Preview */}
            {category && (
                <div className="p-3 bg-background-dark rounded-lg border border-white/5">
                    <p className="text-xs text-text-secondary mb-1">Slug (URL)</p>
                    <code className="text-sm text-primary font-mono">{category.slug}</code>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-primary hover:bg-green-400 text-black font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_15px_rgba(76,223,32,0.3)]"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Đang xử lý...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[18px]">
                                {category ? 'check_circle' : 'add_circle'}
                            </span>
                            {category ? 'Cập nhật' : 'Thêm mới'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
