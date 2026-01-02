'use client';

import React, { useState, useRef } from 'react';
import { fileToBase64, validateImageSize } from '../lib/gemini';
import { useRouter } from 'next/navigation';

interface ImageSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ImageSearchModal: React.FC<ImageSearchModalProps> = ({ isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check if it's an image
        if (!file.type.startsWith('image/')) {
            setError('Vui lòng chọn file ảnh (JPG, PNG, etc.)');
            return;
        }

        try {
            const base64 = await fileToBase64(file);

            // Validate size
            if (!validateImageSize(base64)) {
                setError('Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 4MB');
                return;
            }

            setSelectedImage(base64);
            setError(null);
        } catch (err) {
            setError('Không thể đọc file ảnh');
            console.error(err);
        }
    };

    const handleSearch = async () => {
        if (!selectedImage) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/search/ai/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: selectedImage }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Có lỗi xảy ra');
            }

            // Use AI description as search query
            const searchQuery = data.description || '';

            // Navigate to products page with search query
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            onClose();

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không thể tìm kiếm bằng ảnh');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-color dark:border-border-dark p-6 shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="material-symbols-outlined text-[28px]">image_search</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-text-main dark:text-white">Tìm kiếm bằng ảnh</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Upload ảnh trái cây để AI nhận dạng</p>
                        </div>
                    </div>
                </div>

                {/* Upload Area */}
                {!selectedImage ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black/20 p-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
                    >
                        <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">add_photo_alternate</span>
                        <p className="text-base font-bold text-text-main dark:text-white mb-1">Chọn ảnh để tìm kiếm</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">JPG, PNG - Tối đa 4MB</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Image Preview */}
                        <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-black/20">
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="w-full h-64 object-contain"
                            />
                            <button
                                onClick={handleReset}
                                className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="w-full h-12 rounded-full bg-primary text-text-main font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-text-main border-t-transparent"></div>
                                    <span>AI đang phân tích...</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                                    <span>Tìm kiếm với AI</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            {error}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageSearchModal;
