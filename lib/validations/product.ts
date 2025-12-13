import { z } from 'zod';

/**
 * Product validation schema
 * Ensures product data integrity
 */
export const productSchema = z.object({
    id: z.string().min(1, 'ID không được để trống'),
    name: z.string().min(2, 'Tên sản phẩm phải có ít nhất 2 ký tự'),
    price: z.number().positive('Giá phải lớn hơn 0'),
    originalPrice: z.number().positive().optional(),
    image: z.string().url('URL hình ảnh không hợp lệ'),
    unit: z.string().min(1, 'Đơn vị không được để trống'),
    tag: z.string().optional(),
    tagColor: z.enum(['red', 'primary', 'orange']).optional(),
    category: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    reviews: z.number().min(0).optional(),
    origin: z.string().optional(),
    description: z.string().optional(),
});

/**
 * Cart item validation (extends product with quantity)
 */
export const cartItemSchema = productSchema.extend({
    quantity: z.number().int().positive('Số lượng phải là số nguyên dương'),
});

/**
 * Infer TypeScript types from schemas
 */
export type ProductInput = z.infer<typeof productSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
