'use client';

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    productName: string;
    productImage: string;
    orderId: string;
    userId: string;
    onSuccess?: () => void;
}

export default function ReviewModal({
    isOpen,
    onClose,
    productId,
    productName,
    productImage,
    orderId,
    userId,
    onSuccess
}: ReviewModalProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('reviews')
                .insert({
                    user_id: userId,
                    product_id: productId,
                    order_id: orderId,
                    rating,
                    comment
                });

            if (error) throw error;

            toast.success('Đánh giá của bạn đã được gửi thành công!');
            setComment('');
            setRating(5);
            onClose();
            if (onSuccess) onSuccess();
        } catch (error: any) {
            toast.error('Lỗi khi gửi đánh giá: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-main dark:text-white">Đánh giá sản phẩm</h2>
                    <button
                        onClick={onClose}
                        className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-border-dark transition-colors"
                    >
                        <span className="material-symbols-outlined text-gray-500">close</span>
                    </button>
                </div>

                {/* Product Info */}
                <div className="flex items-center gap-4 p-6 border-b border-gray-100 dark:border-border-dark">
                    <div className="size-16 rounded-lg overflow-hidden border border-gray-200 dark:border-border-dark shrink-0">
                        <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-text-main dark:text-white line-clamp-2">{productName}</h3>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Rating */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-text-main dark:text-white">
                            Đánh giá của bạn <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`material-symbols-outlined text-3xl transition-all ${rating >= star
                                            ? 'text-yellow-400 fill-current scale-110'
                                            : 'text-gray-300 hover:text-yellow-300'
                                        }`}
                                >
                                    star
                                </button>
                            ))}
                            <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                {rating === 5 ? 'Tuyệt vời' : rating === 4 ? 'Tốt' : rating === 3 ? 'Bình thường' : rating === 2 ? 'Tệ' : 'Rất tệ'}
                            </span>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-text-main dark:text-white">
                            Nhận xét của bạn <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                            className="w-full p-4 rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-background-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-h-[120px] dark:text-white resize-none"
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-11 rounded-lg border border-gray-200 dark:border-border-dark text-text-main dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-border-dark transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || !comment.trim()}
                            className="flex-1 h-11 bg-primary hover:bg-primary-dark text-text-main font-bold rounded-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
