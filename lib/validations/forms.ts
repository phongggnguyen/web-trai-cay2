import { z } from 'zod';

/**
 * Customer information validation
 */
export const customerInfoSchema = z.object({
    name: z
        .string()
        .min(2, 'Tên phải có ít nhất 2 ký tự')
        .max(100, 'Tên không được quá 100 ký tự'),

    email: z
        .string()
        .email('Email không hợp lệ')
        .toLowerCase(),

    phone: z
        .string()
        .regex(/^0\d{9}$/, 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0'),
});

/**
 * Shipping address validation
 */
export const shippingAddressSchema = z.object({
    street: z
        .string()
        .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
        .max(200, 'Địa chỉ không được quá 200 ký tự'),

    ward: z.string().optional(),

    district: z
        .string()
        .min(2, 'Quận/Huyện không được để trống'),

    city: z
        .string()
        .min(2, 'Thành phố không được để trống'),

    zipCode: z
        .string()
        .regex(/^\d{5,6}$/, 'Mã bưu điện phải có 5-6 chữ số')
        .optional(),
});

/**
 * Complete checkout form validation
 */
export const checkoutFormSchema = z.object({
    customerInfo: customerInfoSchema,
    shippingAddress: shippingAddressSchema,
    shippingMethod: z.enum(['standard', 'express', 'same-day']),
    paymentMethod: z.enum(['cod', 'card', 'qr', 'wallet']),
    notes: z.string().max(500, 'Ghi chú không được quá 500 ký tự').optional(),
});

/**
 * Contact form validation
 */
export const contactFormSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    subject: z.string().min(5, 'Tiêu đề phải có ít nhất 5 ký tự').max(100, 'Tiêu đề không được quá 100 ký tự'),
    message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự').max(1000, 'Nội dung không được quá 1000 ký tự'),
});

/**
 * Newsletter subscription validation
 */
export const newsletterSchema = z.object({
    email: z.string().email('Email không hợp lệ').toLowerCase(),
});

/**
 * Infer TypeScript types from schemas
 */
export type CustomerInfoInput = z.infer<typeof customerInfoSchema>;
export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;
export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
