import React, { useState } from 'react';

interface ImageUploadProps {
    currentImage?: string | null;
    onImageSelect: (file: File | null) => void;
    uploading?: boolean;
}

export function ImageUpload({ currentImage, onImageSelect, uploading }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImage || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            // Validate file type
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                alert('Chỉ chấp nhận file JPG, PNG, WEBP');
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5000000) {
                alert('Ảnh không được lớn hơn 5MB');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            onImageSelect(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onImageSelect(null);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-bold text-text-main dark:text-white">
                Ảnh sản phẩm
            </label>

            {preview ? (
                <div className="relative inline-block">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-48 w-48 rounded-xl border-2 border-gray-200 object-cover shadow-sm dark:border-gray-700"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
            ) : (
                <label className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition-colors hover:border-primary hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/5">
                    <span className="material-symbols-outlined text-5xl text-gray-400">add_photo_alternate</span>
                    <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Click để chọn ảnh
                    </span>
                    <span className="mt-1 text-xs text-gray-400">
                        JPG, PNG, WEBP (Max 5MB)
                    </span>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            )}

            {uploading && (
                <div className="flex items-center gap-2 text-sm text-primary">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    Đang upload...
                </div>
            )}
        </div>
    );
}
