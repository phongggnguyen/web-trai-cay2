import React from 'react';

interface OrderCustomerInfoProps {
    customerName: string | null;
    customerEmail: string | null;
    customerPhone: string | null;
    paymentMethod: string;
}

export function OrderCustomerInfo({
    customerName,
    customerEmail,
    customerPhone,
    paymentMethod,
}: OrderCustomerInfoProps) {
    return (
        <>
            {/* Customer Info */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-main dark:text-white">
                    <span className="material-symbols-outlined text-purple-600">person</span>
                    Khách hàng
                </h3>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-inner flex items-center justify-center text-white font-bold">
                        {customerName?.charAt(0)?.toUpperCase() || 'K'}
                    </div>
                    <div>
                        <p className="font-bold text-text-main dark:text-white">{customerName || 'Khách vãng lai'}</p>
                        {customerEmail && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{customerEmail}</p>}
                        {customerPhone && <p className="text-sm text-gray-500 dark:text-gray-400">{customerPhone}</p>}
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-main dark:text-white">
                    <span className="material-symbols-outlined text-orange-600">credit_card</span>
                    Thanh toán
                </h3>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-14 bg-white rounded border border-gray-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-gray-600">credit_card</span>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-text-main dark:text-white">{paymentMethod}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
