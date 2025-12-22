import { z } from 'zod';

// Type definitions for Categories module
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    product_count?: number; // Number of products in this category
}

export interface CategoryFormData {
    name: string;
    description?: string;
}

// Validation schema với Zod
export const categorySchema = z.object({
    name: z.string()
        .min(2, 'Tên danh mục phải có ít nhất 2 ký tự')
        .max(50, 'Tên danh mục không được quá 50 ký tự'),

    description: z.string()
        .max(200, 'Mô tả không được quá 200 ký tự')
        .optional()
        .or(z.literal('')),
});

export type CategoryFormInput = z.infer<typeof categorySchema>;
