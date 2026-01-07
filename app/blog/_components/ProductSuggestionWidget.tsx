'use client';

import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    unit: string;
}

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
        unit: 'kg'
    };

    const displayProduct = product || defaultProduct;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#111b0e] text-white p-6 text-center">
            <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                    Sản phẩm hot
                </span>

                <div className="size-24 rounded-full bg-white p-1 mb-1">
                    <div
                        className="w-full h-full rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${displayProduct.image}")` }}
                    />
                </div>

                <h4 className="text-xl font-bold">{displayProduct.name}</h4>
                <p className="text-sm text-gray-300">{displayProduct.description}</p>

                <Link
                    href={`/products/${displayProduct.id}`}
                    className="mt-2 w-full py-2 bg-primary text-text-main font-bold rounded-full hover:bg-opacity-90 transition text-center block"
                >
                    Mua ngay
                </Link>
            </div>

            {/* Abstract Background Pattern */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 rounded-full bg-primary opacity-20 blur-xl" />
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 size-32 rounded-full bg-primary opacity-20 blur-xl" />
        </div>
    );
}
