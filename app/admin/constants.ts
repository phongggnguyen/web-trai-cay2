export const PAGE_SIZE = 10;

export const STATUS_META: Record<
    string,
    { label: string; badge: string }
> = {
    pending: {
        label: 'Chờ xác nhận',
        badge: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    },
    processing: {
        label: 'Đang xử lý', // Updated label for clarity
        badge: 'bg-blue-100 text-blue-700 border border-blue-200',
    },
    completed: {
        label: 'Đã giao hàng',
        badge: 'bg-green-100 text-green-700 border border-green-200',
    },
    cancelled: {
        label: 'Đã hủy',
        badge: 'bg-red-100 text-red-700 border border-red-200',
    },
};
