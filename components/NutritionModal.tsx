'use client';

import React, { useEffect, useState } from 'react';
import { NutritionResponse } from '../types';
import { useGlobal } from '../context/GlobalContext';
import toast from 'react-hot-toast';

interface NutritionModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

export default function NutritionModal({ isOpen, onClose, orderId }: NutritionModalProps) {
    const { addToCart } = useGlobal();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nutritionData, setNutritionData] = useState<NutritionResponse | null>(null);

    useEffect(() => {
        if (isOpen && orderId) {
            fetchNutritionData();
        }
    }, [isOpen, orderId]);

    const fetchNutritionData = async () => {
        setLoading(true);
        setError(null);

        // Check cache first
        const cacheKey = `nutrition_${orderId}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheExpiry = localStorage.getItem(`${cacheKey}_expiry`);

        if (cached && cacheExpiry && Date.now() < parseInt(cacheExpiry)) {
            setNutritionData(JSON.parse(cached));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/nutrition/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId }),
            });

            if (!response.ok) {
                throw new Error('Không thể phân tích dinh dưỡng');
            }

            const data: NutritionResponse = await response.json();
            setNutritionData(data);

            // Cache for 7 days
            localStorage.setItem(cacheKey, JSON.stringify(data));
            localStorage.setItem(`${cacheKey}_expiry`, (Date.now() + 7 * 24 * 60 * 60 * 1000).toString());
        } catch (err: any) {
            setError(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product: any) => {
        addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                unit: product.unit,
            },
            1
        );
        toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
    };

    const getNutritionColor = (level: 'low' | 'medium' | 'high') => {
        switch (level) {
            case 'high':
                return 'text-primary';
            case 'medium':
                return 'text-yellow-500';
            case 'low':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getNutritionLabel = (level: 'low' | 'medium' | 'high') => {
        switch (level) {
            case 'high':
                return 'Cao';
            case 'medium':
                return 'Trung bình';
            case 'low':
                return 'Thấp';
            default:
                return '';
        }
    };

    const formatNutrientName = (key: string) => {
        const names: { [key: string]: string } = {
            vitamin_c: 'Vitamin C',
            fiber: 'Chất xơ',
            antioxidants: 'Chất chốngoxy hóa',
            sugar: 'Đường',
            potassium: 'Kali',
            vitamin_a: 'Vitamin A',
            protein: 'Protein',
            fat: 'Chất béo',
        };
        return names[key] || key;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-surface-dark rounded-2xl shadow-2xl animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-b border-gray-200 dark:border-border-dark backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-2xl">restaurant_menu</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-text-main dark:text-white">Tư Vấn Dinh Dưỡng</h2>
                            <p className="text-sm text-text-muted dark:text-text-secondary">Phân tích bởi AI</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-border-dark rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-text-main dark:text-white">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                            <p className="text-text-muted dark:text-text-secondary">Đang phân tích dinh dưỡng...</p>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <span className="material-symbols-outlined text-red-500 text-5xl">error</span>
                            <p className="text-red-500 font-medium">{error}</p>
                            <button
                                onClick={fetchNutritionData}
                                className="px-4 py-2 bg-primary text-background-dark rounded-lg font-bold hover:brightness-110 transition-all"
                            >
                                Thử lại
                            </button>
                        </div>
                    )}

                    {!loading && !error && nutritionData && (
                        <>
                            {/* Analysis Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="material-symbols-outlined">analytics</span>
                                    <h3 className="text-lg font-bold">Phân Tích Dinh Dưỡng</h3>
                                </div>

                                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-xl p-5 border border-primary/20">
                                    <p className="text-text-main dark:text-white font-medium mb-2">
                                        {nutritionData.analysis.summary}
                                    </p>
                                    <p className="text-text-muted dark:text-text-secondary text-sm">
                                        💡 {nutritionData.analysis.recommendation}
                                    </p>
                                </div>

                                {/* Nutrition Breakdown */}
                                {Object.keys(nutritionData.analysis.nutritionBreakdown).length > 0 && (
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(nutritionData.analysis.nutritionBreakdown).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex items-center justify-between p-3 bg-white dark:bg-background-dark rounded-lg border border-gray-200 dark:border-border-dark"
                                            >
                                                <span className="text-sm font-medium text-text-main dark:text-white">
                                                    {formatNutrientName(key)}
                                                </span>
                                                <span className={`text-sm font-bold ${getNutritionColor(value)}`}>
                                                    {getNutritionLabel(value)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Suggested Products */}
                            {nutritionData.suggestedProducts.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary">
                                        <span className="material-symbols-outlined">recommend</span>
                                        <h3 className="text-lg font-bold">Sản Phẩm Đề Xuất</h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {nutritionData.suggestedProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex gap-4 p-4 bg-white dark:bg-background-dark rounded-xl border border-gray-200 dark:border-border-dark hover:border-primary/50 transition-all group"
                                            >
                                                <div
                                                    className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 border border-gray-200 dark:border-border-dark"
                                                    style={{ backgroundImage: `url(${product.image})` }}
                                                ></div>

                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-base font-bold text-text-main dark:text-white mb-1">
                                                            {product.name}
                                                        </h4>
                                                        <p className="text-xs text-text-muted dark:text-text-secondary line-clamp-2">
                                                            ✨ {product.reason}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-primary font-bold">
                                                            {product.price.toLocaleString('vi-VN')}đ/{product.unit}
                                                        </span>
                                                        <button
                                                            onClick={() => handleAddToCart(product)}
                                                            className="px-4 py-1.5 bg-primary text-background-dark text-sm font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">
                                                                add_shopping_cart
                                                            </span>
                                                            Thêm
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {nutritionData.suggestedProducts.length === 0 && (
                                <div className="text-center py-8">
                                    <span className="material-symbols-outlined text-gray-400 text-5xl mb-2">
                                        error
                                    </span>
                                    <p className="text-text-muted dark:text-text-secondary text-sm">
                                        Không tìm thấy sản phẩm phù hợp trong cửa hàng.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
