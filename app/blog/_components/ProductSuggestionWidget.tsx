'use client';

import Link from 'next/link';
import type { Product } from '@/lib/products/queries';

interface ProductSuggestionWidgetProps {
    product?: Product | null;
}

export default function ProductSuggestionWidget({ product }: ProductSuggestionWidgetProps) {
    // Default product if none provided
    const defaultProduct: Product = {
        id: '1',
        name: 'Dâu Tây Mộc Châu',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYbAD0bUL9_PmKKGwmIZpV1nyrH8z-h3dj1Y0GuyisdkZEbzGsxO-PqK8un2Do8l-1-7yMxUGtGvQTUg6Z4kuYroEixTMhOt26xNVzqkmVxovHH1U5sjRhLJyxjS9gHupwgWbeRURS_l0qJp2i8HIK07nAApAd-a7atnhUNEi7ZgX4OzrIMALTJFA794fJXXJpoHrENFfI7QOrq_3V8g_Dw1WM4lTQ3FLRIy6zTXvzxloCC-n1WAE2nCb1nfFQDc-7RjEhlaLnSOwG',
        description: 'Ngọt lịm, mọng nước, hái tại vườn.',
        price: 120000,
        unit: 'kg',
        category: 'Trái Cây',
        stock: 100
    };

    const displayProduct = product || defaultProduct;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a472a] via-primary/80 to-red-600 text-white p-6 text-center shadow-lg group hover:shadow-red-500/30 transition-all duration-500 border border-white/10">
            {/* Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent mix-blend-overlay"></div>

            <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 shadow-inner">
                    <span className="material-symbols-outlined text-[16px] text-red-500 animate-pulse">local_fire_department</span>
                    <span className="text-white text-xs font-bold uppercase tracking-widest text-shadow-sm">
                        Sản phẩm hot
                    </span>
                </div>

                <div className="size-28 rounded-full bg-white p-1 my-2 shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-green-400 to-red-500 opacity-70 blur animate-pulse"></div>
                    <div
                        className="w-full h-full rounded-full bg-cover bg-center relative z-10 border-2 border-white"
                        style={{ backgroundImage: `url("${displayProduct.image || (displayProduct as any).image_url}")` }}
                    />
                </div>

                <h4 className="text-2xl font-black text-white drop-shadow-md">{displayProduct.name}</h4>
                <p className="text-sm text-gray-100 font-medium">{displayProduct.description}</p>

                <div className="flex items-center justify-center gap-2 mt-2 mb-1">
                    <span className="text-2xl font-bold text-white">{displayProduct.price.toLocaleString()}đ</span>
                    <span className="text-sm text-white/80">/{displayProduct.unit}</span>
                </div>

                <Link
                    href={`/products/${displayProduct.id}`}
                    className="w-full py-2.5 bg-white text-red-600 font-black uppercase tracking-wide rounded-full hover:bg-red-50 hover:scale-105 hover:shadow-lg transition-all transform shadow-md flex items-center justify-center gap-2"
                >
                    <span>Mua ngay</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
            </div>

            {/* Abstract Background Patterns - Green & Red blending */}
            <div className="absolute -bottom-12 -right-12 size-48 rounded-full bg-red-600 opacity-40 blur-3xl animate-pulse" />
            <div className="absolute -top-12 -left-12 size-48 rounded-full bg-primary opacity-30 blur-3xl" />
        </div>
    );
}
