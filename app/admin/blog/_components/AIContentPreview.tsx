'use client';

import type { BlogGenerationOutput } from '@/lib/blog/ai-generator';

interface AIContentPreviewProps {
    content: BlogGenerationOutput;
    onEdit: () => void;
    onRegenerate: () => void;
    onAccept: () => void;
    isRegenerating?: boolean;
}

export function AIContentPreview({
    content,
    onEdit,
    onRegenerate,
    onAccept,
    isRegenerating = false
}: AIContentPreviewProps) {
    return (
        <div className="border-2 border-primary/30 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-primary/20">
                <span className="material-symbols-outlined text-primary text-2xl animate-pulse">auto_awesome</span>
                <h4 className="text-lg font-black text-text-main dark:text-white">
                    ✨ AI đã tạo nội dung cho bạn
                </h4>
            </div>

            {/* Title Preview */}
            <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1 block">
                    📌 Tiêu đề
                </label>
                <p className="text-xl font-bold text-text-main dark:text-white leading-tight">
                    {content.title}
                </p>
            </div>

            {/* Excerpt Preview */}
            <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1 block">
                    📝 Mô tả ngắn
                </label>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    {content.excerpt}
                </p>
            </div>

            {/* Content Preview */}
            <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1 block">
                    📄 Nội dung ({content.content.split(' ').length} từ)
                </label>
                <div className="max-h-48 overflow-y-auto bg-white dark:bg-surface-dark/50 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        {content.content.split('\n\n').slice(0, 3).map((paragraph, index) => (
                            <p key={index} className="mb-2">{paragraph}</p>
                        ))}
                        {content.content.split('\n\n').length > 3 && (
                            <p className="text-gray-500 italic">... (xem toàn bộ khi chỉnh sửa)</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Tags Preview */}
            <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                    🏷️ Tags đề xuất
                </label>
                <div className="flex flex-wrap gap-2">
                    {content.suggestedTags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary dark:text-primary rounded-full text-sm font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-primary/20">
                <button
                    type="button"
                    onClick={onRegenerate}
                    disabled={isRegenerating}
                    className="px-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isRegenerating ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-text-main dark:border-white border-t-transparent"></div>
                            Đang tạo lại...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[18px]">refresh</span>
                            Tạo lại
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onEdit}
                    className="px-4 py-2 border-2 border-primary rounded-lg text-primary hover:bg-primary/10 transition-colors font-bold flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Chỉnh sửa
                </button>

                <button
                    type="button"
                    onClick={onAccept}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-text-main rounded-lg font-black transition-colors flex items-center gap-2 shadow-md"
                >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Sử dụng nội dung này
                </button>
            </div>
        </div>
    );
}
