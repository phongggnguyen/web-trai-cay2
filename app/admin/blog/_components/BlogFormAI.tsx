'use client';

import React, { useState } from 'react';
import type { BlogFormData } from '../types';
import type { BlogGenerationOutput } from '@/lib/blog/ai-generator';
import { fileToBase64 } from '@/lib/gemini';
import { AIContentPreview } from './AIContentPreview';
import { BlogForm } from './BlogForm';

interface BlogFormAIProps {
    onSubmit: (data: BlogFormData, imageFile?: File | null, currentImageUrl?: string | null) => Promise<void>;
    onCancel: () => void;
}

type AIState = 'input' | 'generating' | 'preview' | 'editing';

export function BlogFormAI({ onSubmit, onCancel }: BlogFormAIProps) {
    // State for AI generation
    const [state, setState] = useState<AIState>('input');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [aiContent, setAIContent] = useState<BlogGenerationOutput | null>(null);
    const [generationProgress, setGenerationProgress] = useState(0);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                setError('Chỉ hỗ trợ định dạng JPG, PNG, WEBP');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Ảnh không được vượt quá 5MB');
                return;
            }

            setCoverImage(file);
            setError(null);

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
        setError(null);
    };

    const handleGenerate = async () => {
        if (!coverImage) {
            setError('Vui lòng upload ảnh bìa để tạo nội dung với AI');
            return;
        }

        if (title && title.length > 100) {
            setError('Tiêu đề không được vượt quá 100 ký tự');
            return;
        }

        setState('generating');
        setError(null);
        setGenerationProgress(0);

        try {
            // Convert image to base64
            setGenerationProgress(10);
            const imageBase64 = await fileToBase64(coverImage);

            // Call API to generate content
            setGenerationProgress(20);
            const response = await fetch('/api/blog/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageBase64,
                    title: title.trim() || undefined,
                }),
            });

            setGenerationProgress(90);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Có lỗi xảy ra khi tạo nội dung');
            }

            const result = await response.json();
            setGenerationProgress(100);

            if (result.success && result.data) {
                setAIContent(result.data);
                setState('preview');
            } else {
                throw new Error(result.error || 'Không thể tạo nội dung');
            }
        } catch (err) {
            console.error('Error generating content:', err);
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
            setState('input');
        }
    };

    const handleRegenerate = async () => {
        // Keep the same image and title, just regenerate content
        await handleGenerate();
    };

    const handleEdit = () => {
        setState('editing');
    };

    const handleAcceptAIContent = () => {
        // Move to editing mode with AI content pre-filled
        setState('editing');
    };

    const handleFormSubmit = async (data: BlogFormData, imageFile?: File | null, currentImageUrl?: string | null) => {
        // Submit with AI-generated or edited content
        await onSubmit(data, imageFile || coverImage, currentImageUrl);
    };

    // Render different UI based on state
    if (state === 'editing' && aiContent) {
        // Show full blog form with AI content pre-filled
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        Bạn có thể chỉnh sửa nội dung AI tạo trước khi lưu
                    </p>
                </div>

                <BlogForm
                    blog={{
                        id: '',
                        title: aiContent.title,
                        excerpt: aiContent.excerpt,
                        content: aiContent.content,
                        cover_image: imagePreview || '',
                        tags: aiContent.suggestedTags,
                        status: 'draft',
                        slug: '',
                        author_id: '',
                        created_at: new Date(),
                        updated_at: new Date(),
                        published_at: null,
                        views: 0,
                        author_name: ''
                    }}
                    onSubmit={handleFormSubmit}
                    onCancel={onCancel}
                />
            </div>
        );
    }

    if (state === 'preview' && aiContent) {
        // Show AI content preview
        return (
            <AIContentPreview
                content={aiContent}
                onEdit={handleEdit}
                onRegenerate={handleRegenerate}
                onAccept={handleAcceptAIContent}
            />
        );
    }

    // Default: Show input form for AI generation
    return (
        <div className="space-y-6">
            {/* Info Banner */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">auto_awesome</span>
                    <div>
                        <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-1">
                            Tạo blog tự động với AI
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                            Upload ảnh bìa (bắt buộc) và tùy chọn nhập tiêu đề. AI sẽ tự động tạo nội dung blog chi tiết, mô tả ngắn và gợi ý tags cho bạn.
                        </p>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
            )}

            {/* Cover Image Upload */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Ảnh bìa <span className="text-red-500">*</span>
                    <span className="ml-2 text-xs font-normal text-gray-500">(Bắt buộc để AI phân tích)</span>
                </label>
                {imagePreview ? (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Cover preview"
                            className="w-full h-64 object-cover rounded-lg border-2 border-primary/30"
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:border-primary/80 transition-colors bg-primary/5">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <span className="material-symbols-outlined text-[64px] text-primary mb-3">add_photo_alternate</span>
                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-semibold">Click để upload ảnh</span> hoặc kéo thả
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                JPG, PNG, WEBP (MAX. 5MB)
                            </p>
                        </div>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {/* Title Input (Optional) */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Tiêu đề (Tùy chọn)
                    <span className="ml-2 text-xs font-normal text-gray-500">(Để trống để AI tự động đề xuất)</span>
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="VD: 5 Loại Trái Cây Giúp Da Đẹp Dáng Xinh"
                    maxLength={100}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs text-gray-400 mt-1">{title.length}/100 ký tự</p>
            </div>

            {/* Generate Button */}
            {state === 'generating' ? (
                <div className="space-y-3">
                    <button
                        type="button"
                        disabled
                        className="w-full px-6 py-4 bg-primary/50 text-text-main rounded-lg font-black text-lg cursor-not-allowed"
                    >
                        <span className="flex items-center justify-center gap-3">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-text-main border-t-transparent"></div>
                            Đang tạo nội dung với AI...
                        </span>
                    </button>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-primary to-blue-500 h-full transition-all duration-500"
                            style={{ width: `${generationProgress}%` }}
                        ></div>
                    </div>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        {generationProgress < 30 && 'Đang phân tích ảnh...'}
                        {generationProgress >= 30 && generationProgress < 90 && 'Đang tạo nội dung chi tiết...'}
                        {generationProgress >= 90 && 'Hoàn tất!'}
                    </p>
                </div>
            ) : (
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-medium"
                    >
                        Hủy
                    </button>

                    <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={!coverImage}
                        className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-600 text-text-main rounded-lg font-black text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                            {title ? 'Tạo nội dung với AI' : 'Tạo tiêu đề + nội dung với AI'}
                        </span>
                    </button>
                </div>
            )}

            {/* Helper Text */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    💡 <strong>Mẹo:</strong> Chọn ảnh rõ ràng, chất lượng cao để AI hiểu đúng nội dung.
                    Bạn có thể chỉnh sửa nội dung AI tạo trước khi lưu.
                </p>
            </div>
        </div>
    );
}
