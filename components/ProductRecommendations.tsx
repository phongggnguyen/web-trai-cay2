'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProductRecommendations } from '../hooks/useProductRecommendations';
import { useGlobal } from '../context/GlobalContext';

interface ProductRecommendationsProps {
    userId: string | null;
}

export default function ProductRecommendations({ userId }: ProductRecommendationsProps) {
    const { addToCart } = useGlobal();
    const { recommendations, isLoading, error } = useProductRecommendations(userId);

    // Không hiển thị gì nếu:
    // - User chưa đăng nhập
    // - Đang loading
    // - Có lỗi
    // - Không có sản phẩm gợi ý
    if (!userId || isLoading || error || recommendations.length === 0) {
        return null;
    }

    return (
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-surface-dark/30 dark:to-background-dark px-4 py-16 md:px-10 transition-colors duration-200">
            <div className="mx-auto max-w-[1440px]">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Dành Riêng Cho Bạn</span>
                    </div>
                    <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl text-text-main dark:text-white">
                        Gợi Ý Cho Bạn
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-text-muted max-w-2xl mx-auto">
                        Dựa trên lịch sử mua hàng của bạn, chúng tôi nghĩ bạn sẽ thích những sản phẩm này
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {recommendations.map((product) => (
                        <div
                            key={product.id}
                            className="group flex flex-col overflow-hidden rounded-2xl bg-background-light dark:bg-surface-dark border border-border-color dark:border-border-dark transition-all hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
                        >
                            {/* Product Image */}
                            <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/20">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Product Tag */}
                                {product.tag && (
                                    <div className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold text-white ${product.tagColor === 'red'
                                            ? 'bg-red-500'
                                            : product.tagColor === 'orange'
                                                ? 'bg-orange-500'
                                                : 'bg-primary'
                                        }`}>
                                        {product.tag}
                                    </div>
                                )}
                            </Link>

                            {/* Product Info */}
                            <div className="flex flex-1 flex-col p-5">
                                <Link href={`/products/${product.id}`}>
                                    <h3 className="text-lg font-bold text-text-main dark:text-white line-clamp-1 hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-500 dark:text-text-muted mt-1">{product.category}</p>

                                {/* Price and Add to Cart */}
                                <div className="mt-auto flex items-end justify-between pt-4">
                                    <div className="flex flex-col">
                                        {product.originalPrice && (
                                            <span className="text-xs text-gray-400 line-through">
                                                {product.originalPrice.toLocaleString('vi-VN')}đ
                                            </span>
                                        )}
                                        <span className="text-xl font-bold text-primary">
                                            {product.price.toLocaleString('vi-VN')}đ
                                            <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                                                /{product.unit}
                                            </span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product, 1);
                                        }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-text-main shadow-lg hover:brightness-110 active:scale-95 transition-all"
                                    >
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
