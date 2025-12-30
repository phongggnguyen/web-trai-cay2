'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Review } from '../types';

interface ReviewSectionProps {
    productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select(`
          *,
          user:profiles(full_name, avatar_url)
        `)
                .eq('product_id', productId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReviews(data || []);
        } catch (error) {
            console.error('Error fetching reviews:', JSON.stringify(error, null, 2));
        } finally {
            setLoading(false);
        }
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    return (
        <div className="mt-16 border-t border-gray-200 dark:border-border-dark pt-10">
            <h2 className="text-2xl font-bold text-text-main dark:text-white mb-6">Đánh giá khách hàng</h2>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-border-dark">
                    <span className="text-4xl font-black text-primary">{avgRating}</span>
                    <div className="flex gap-1 my-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <span
                                key={s}
                                className={`material-symbols-outlined text-[18px] ${s <= Math.round(parseFloat(avgRating))
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                            >
                                star
                            </span>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">{reviews.length} đánh giá</span>
                </div>
            </div>

            {/* Review List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                    </div>
                ) : reviews.length === 0 ? (
                    <p className="text-gray-500 italic">Chưa có đánh giá nào cho sản phẩm này.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="flex gap-4 pb-6 border-b border-gray-100 dark:border-border-dark last:border-0">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                                {review.user?.avatar_url ? (
                                    <img src={review.user.avatar_url} alt={review.user.full_name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    (review.user?.full_name?.[0] || 'U')
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white">{review.user?.full_name || 'Người dùng ẩn danh'}</h4>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <span
                                                    key={s}
                                                    className={`material-symbols-outlined text-[14px] ${s <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                        }`}
                                                >
                                                    star
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(review.created_at).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
