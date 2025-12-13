import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '../../types';

export interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    showAddButton?: boolean;
    className?: string;
}

/**
 * Reusable Product Card component
 * Displays product information with image, price, and optional add to cart button
 */
export function ProductCard({
    product,
    onAddToCart,
    showAddButton = true,
    className = '',
}: ProductCardProps) {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart?.(product);
    };

    return (
        <div className={`group flex flex-col overflow-hidden rounded-2xl bg-background-light dark:bg-surface-dark border border-border-color dark:border-border-dark transition-all hover:shadow-xl hover:shadow-primary/10 cursor-pointer ${className}`}>
            <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/20">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.tag && (
                    <div className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold text-white ${product.tagColor === 'red' ? 'bg-red-500' :
                            product.tagColor === 'orange' ? 'bg-orange-500' :
                                'bg-primary'
                        }`}>
                        {product.tag}
                    </div>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-5">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-text-main dark:text-white line-clamp-1 hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {product.category && (
                    <p className="text-sm text-gray-500 dark:text-text-muted mt-1">{product.category}</p>
                )}

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

                    {showAddButton && onAddToCart && (
                        <button
                            onClick={handleAddToCart}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-text-main shadow-lg hover:brightness-110 active:scale-95 transition-all"
                            aria-label={`Thêm ${product.name} vào giỏ hàng`}
                        >
                            <span className="material-symbols-outlined">add_shopping_cart</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
