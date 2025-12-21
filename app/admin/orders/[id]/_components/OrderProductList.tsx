import React from 'react';

interface OrderItem {
    id: string;
    product_name: string;
    product_image: string | null;
    quantity: number;
    price: number;
}

interface OrderProductListProps {
    items: OrderItem[];
    status: string;
}

export function OrderProductList({ items, status }: OrderProductListProps) {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-text-main dark:text-white">
                    <span className="material-symbols-outlined text-primary">shopping_bag</span>
                    Sản phẩm ({items.length})
                </h3>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 dark:border-border-dark text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-right">Tổng</div>
            </div>

            {/* Items */}
            <div className="flex flex-col">
                {items.map((item) => (
                    <div key={item.id} className="py-4 border-b border-gray-100 dark:border-border-dark last:border-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 md:col-span-6 flex gap-4">
                            {item.product_image && (
                                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700">
                                    <img className="w-full h-full object-cover" src={item.product_image} alt={item.product_name} />
                                </div>
                            )}
                            <div className="flex flex-col justify-center">
                                <p className="font-bold text-text-main dark:text-white">{item.product_name}</p>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-2 md:gap-0">
                            <span className="md:hidden text-gray-500 text-sm">Đơn giá:</span>
                            <span className="font-medium text-text-main dark:text-white">{item.price.toLocaleString()}đ</span>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-2 md:gap-0">
                            <span className="md:hidden text-gray-500 text-sm">Số lượng:</span>
                            <span className="font-medium text-text-main dark:text-white">{item.quantity}</span>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex md:justify-end items-center gap-2 md:gap-0">
                            <span className="md:hidden text-gray-500 text-sm">Thành tiền:</span>
                            <span className="font-bold text-primary">{(item.price * item.quantity).toLocaleString()}đ</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
