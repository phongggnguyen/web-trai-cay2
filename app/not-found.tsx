import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center space-y-6">
                <div className="size-32 bg-gray-100 dark:bg-surface-dark rounded-full flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-8xl text-gray-400">search_off</span>
                </div>
                <h2 className="text-4xl font-black text-text-main dark:text-white">
                    404 - Không tìm thấy trang
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary text-text-main font-bold px-8 py-3 rounded-full hover:bg-primary-dark transition-all shadow-lg"
                >
                    <span className="material-symbols-outlined">home</span>
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}
