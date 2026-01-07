'use client';

import React, { useState, useEffect } from 'react';
import type { BlogPost, BlogFormData } from '../types';
import { generateSlug } from '../utils/generateSlug';

interface BlogFormProps {
    blog: BlogPost | null;
    onSubmit: (data: BlogFormData, imageFile?: File | null, currentImageUrl?: string | null) => Promise<void>;
    onCancel: () => void;
}

export const BlogForm: React.FC<BlogFormProps> = ({ blog, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [status, setStatus] = useState<'draft' | 'published'>('draft');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load blog data if editing
    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setExcerpt(blog.excerpt);
            setContent(blog.content);
            setTags(blog.tags || []);
            setStatus(blog.status);
            setImagePreview(blog.cover_image);
        }
    }, [blog]);

    // Generate slug preview
    const slugPreview = generateSlug(title);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setCoverImage(null);
        setImagePreview(null);
    };

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim().toLowerCase();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !excerpt.trim() || !content.trim()) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        setIsSubmitting(true);
        try {
            const formData: BlogFormData = {
                title: title.trim(),
                excerpt: excerpt.trim(),
                content: content.trim(),
                coverImage: coverImage,
                tags,
                status,
            };

            await onSubmit(formData, coverImage, blog?.cover_image || null);
        } catch (err) {
            console.error('Form submit error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề bài viết..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                />
                {title && (
                    <p className="text-xs text-gray-400 mt-1">Slug: {slugPreview}</p>
                )}
            </div>

            {/* Excerpt */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Mô tả ngắn <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Nhập mô tả ngắn (200-300 ký tự)..."
                    rows={3}
                    maxLength={300}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    required
                />
                <p className="text-xs text-gray-400 mt-1">{excerpt.length}/300 ký tự</p>
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập nội dung bài viết..."
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    required
                />
            </div>

            {/* Cover Image */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Ảnh bìa
                </label>
                {imagePreview ? (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Cover preview"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <span className="material-symbols-outlined text-[48px] text-gray-400 mb-3">cloud_upload</span>
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click để upload</span> hoặc kéo thả
                            </p>
                            <p className="text-xs text-gray-400">PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Tags
                </label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        placeholder="Nhập tag và Enter..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-text-main rounded-lg font-bold transition-colors"
                    >
                        Thêm
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="text-gray-500 hover:text-red-500"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Trạng thái
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="draft"
                            checked={status === 'draft'}
                            onChange={() => setStatus('draft')}
                            className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm text-text-main dark:text-white">Bản nháp</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="published"
                            checked={status === 'published'}
                            onChange={() => setStatus('published')}
                            className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm text-text-main dark:text-white">Xuất bản</span>
                    </label>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-border-dark">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-text-main rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {isSubmitting && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-text-main border-t-transparent"></div>
                    )}
                    {blog ? 'Cập nhật' : 'Tạo bài viết'}
                </button>
            </div>
        </form>
    );
};
