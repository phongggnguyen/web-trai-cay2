import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 mb-6">
                    <span className="material-symbols-outlined text-5xl text-gray-400">article</span>
                </div>

                <h1 className="text-4xl font-black text-text-main dark:text-white mb-4">
                    Bài viết không tồn tại
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                </p>

                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-text-main font-bold transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Quay lại Blog
                </Link>
            </div>
        </div>
    );
}
