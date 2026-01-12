interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
    unit: string;
}

interface OrderData {
    id: string;
    total_amount: number;
    shipping_fee: number;
    payment_method: string;
    created_at: string;
    order_items: OrderItem[];
}

interface ReceiptProps {
    orderData: OrderData;
}

export function Receipt({ orderData }: ReceiptProps) {
    return (
        <div className="mt-6 md:mt-0 md:absolute md:right-[5%] md:top-[30%] w-72 bg-white p-6 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] rotate-3 animate-float hidden lg:block">
            <div className="absolute -top-5 -right-5 text-3xl">🍓</div>
            <div className="absolute -bottom-3 -left-3 text-3xl">🍇</div>

            <div className="flex flex-col gap-3 text-sm">
                {orderData.order_items && orderData.order_items.length > 0 ? (
                    <>
                        {orderData.order_items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">{item.product_name}</span>
                                <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-gray-500 text-center py-2">Không có sản phẩm</div>
                )}

                <div className="border-t border-gray-200 my-2"></div>

                <div className="flex justify-between items-center text-gray-600">
                    <span>Giao hàng</span>
                    <span className="font-semibold text-green-600">
                        {orderData.shipping_fee > 0 ? orderData.shipping_fee.toLocaleString('vi-VN') + 'đ' : 'Tặng'}
                    </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Thanh toán</span>
                    <span className="font-semibold text-gray-900">
                        {orderData.payment_method === 'cod' ? 'COD' : orderData.payment_method.toUpperCase()}
                    </span>
                </div>

                <div className="border-t-2 border-gray-300 my-2"></div>

                <div className="flex justify-between items-center font-bold">
                    <span className="text-base text-gray-900">Tổng cộng</span>
                    <span className="text-lg text-orange-600">{orderData.total_amount.toLocaleString('vi-VN')}đ</span>
                </div>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute top-1/2 -left-3 w-5 h-5 bg-white border-l-[3px] border-b-[3px] border-black transform rotate-45"></div>
        </div>
    );
}
