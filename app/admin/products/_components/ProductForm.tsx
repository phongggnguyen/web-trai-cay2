import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type Product, type ProductFormInput } from '../types';
import { ImageUpload } from './ImageUpload';

interface ProductFormProps {
    product?: Product | null;
    onSubmit: (data: any, imageFile?: File | null, currentImageUrl?: string | null) => Promise<void>;
    onCancel: () => void;
}

const CATEGORIES = [
    { value: '', label: 'Chọn danh mục' },
    { value: 'fruits', label: 'Trái cây' },
    { value: 'vegetables', label: 'Rau củ' },
    { value: 'meat', label: 'Thịt' },
    { value: 'seafood', label: 'Hải sản' },
    { value: 'dairy', label: 'Sữa & Trứng' },
    { value: 'other', label: 'Khác' },
];

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormInput>({
        resolver: zodResolver(productSchema),
        defaultValues: product
            ? {
                name: product.name,
                description: product.description || '',
                price: product.price,
                stock: product.stock,
                category: product.category,
            }
            : {
                name: '',
                description: '',
                price: 0,
                stock: 0,
                category: '',
            },
    });

    const handleFormSubmit = async (data: ProductFormInput) => {
        try {
            setIsSubmitting(true);
            await onSubmit(data, imageFile, product?.image_url);
        } catch (error) {
            console.error('Form submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Image Upload */}
            <ImageUpload
                currentImage={product?.image_url}
                onImageSelect={setImageFile}
                uploading={isSubmitting}
            />

            {/* Product Name */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                    {...register('name')}
                    type="text"
                    placeholder="VD: Táo Envy Mỹ"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 dark:bg-surface-dark dark:text-white ${errors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-primary focus:ring-primary/20 dark:border-gray-700'
                        }`}
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                )}
            </div>

            {/* Price & Stock Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div>
                    <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                        Giá (đ) <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('price', { valueAsNumber: true })}
                        type="number"
                        step="1000"
                        placeholder="50000"
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 dark:bg-surface-dark dark:text-white ${errors.price
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 focus:border-primary focus:ring-primary/20 dark:border-gray-700'
                            }`}
                    />
                    {errors.price && (
                        <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
                    )}
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                        Số lượng <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('stock', { valueAsNumber: true })}
                        type="number"
                        placeholder="100"
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 dark:bg-surface-dark dark:text-white ${errors.stock
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-200 focus:border-primary focus:ring-primary/20 dark:border-gray-700'
                            }`}
                    />
                    {errors.stock && (
                        <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>
                    )}
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                    {...register('category')}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 dark:bg-surface-dark dark:text-white ${errors.category
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-primary focus:ring-primary/20 dark:border-gray-700'
                        }`}
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                    Mô tả
                </label>
                <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Mô tả chi tiết về sản phẩm..."
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 dark:bg-surface-dark dark:text-white ${errors.description
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-primary focus:ring-primary/20 dark:border-gray-700'
                        }`}
                />
                {errors.description && (
                    <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-primary px-4 py-2.5 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                            Đang lưu...
                        </span>
                    ) : product ? (
                        'Cập nhật'
                    ) : (
                        'Thêm sản phẩm'
                    )}
                </button>
            </div>
        </form>
    );
}
