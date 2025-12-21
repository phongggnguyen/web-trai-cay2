import { z } from 'zod';

// Type definitions for Products module
export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    category: string;
    image_url: string | null;
    created_at: string;
}

export interface ProductFormData {
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    image?: File | null;
}

// Validation schema với Zod
export const productSchema = z.object({
    name: z.string()
        .min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự')
        .max(100, 'Tên sản phẩm không được quá 100 ký tự'),

    description: z.string()
        .max(500, 'Mô tả không được quá 500 ký tự')
        .optional()
        .or(z.literal('')),

    price: z.number({
        required_error: 'Giá là bắt buộc',
        invalid_type_error: 'Giá phải là số',
    })
        .positive('Giá phải lớn hơn 0')
        .max(1000000000, 'Giá không hợp lệ'),

    stock: z.number({
        required_error: 'Số lượng là bắt buộc',
        invalid_type_error: 'Số lượng phải là số',
    })
        .int('Số lượng phải là số nguyên')
        .min(0, 'Số lượng không thể âm'),

    category: z.string()
        .min(1, 'Vui lòng chọn danh mục'),
});

export type ProductFormInput = z.infer<typeof productSchema>;
