/**
 * Phân loại khách hàng dựa trên tổng chi tiêu
 */
export function getCustomerType(totalSpent: number): 'VIP Gold' | 'VIP' | 'Thành viên' | 'Thân thiết' | 'Khách mới' {
    if (totalSpent >= 10000000) return 'VIP Gold'; // >= 10 triệu
    if (totalSpent >= 5000000) return 'VIP'; // >= 5 triệu
    if (totalSpent >= 2000000) return 'Thân thiết'; // >= 2 triệu
    if (totalSpent >= 500000) return 'Thành viên'; // >= 500k
    return 'Khách mới';
}

/**
 * Format số tiền theo định dạng VN
 */
export function formatCurrency(amount: number): string {
    if (amount === 0) return '0đ';

    // Format với dấu phẩy ngăn cách hàng nghìn
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
}

/**
 * Tính giá trị trung bình mỗi đơn hàng
 */
export function calculateAvgOrderValue(totalSpent: number, orderCount: number): string {
    if (orderCount === 0) return '0đ';

    const avg = totalSpent / orderCount;

    // Format số ngắn gọn (1.2tr, 500k)
    if (avg >= 1000000) {
        return `~${(avg / 1000000).toFixed(1)}tr`;
    }
    if (avg >= 1000) {
        return `~${Math.round(avg / 1000)}k`;
    }
    return `${Math.round(avg)}đ`;
}

/**
 * Format thời gian tương đối (hôm nay, hôm qua, 3 ngày trước, etc)
 */
export function getRelativeTime(dateString: string | null): string {
    if (!dateString) return '-';

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
        if (diffMinutes <= 1) return 'Vừa xong';
        return `${diffMinutes} phút trước`;
    }

    if (diffHours < 24) {
        return `${diffHours} giờ trước`;
    }

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} tuần trước`;
    }
    if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} tháng trước`;
    }

    const years = Math.floor(diffDays / 365);
    return `${years} năm trước`;
}

/**
 * Tạo avatar URL từ tên nếu không có avatar
 */
export function getAvatarUrl(name: string | null, avatarUrl: string | null): string {
    if (avatarUrl) return avatarUrl;

    const displayName = name || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
}

/**
 * Format ngày theo định dạng dd/mm/yyyy
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
