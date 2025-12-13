'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('Error caught by boundary:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
            <div className="text-center space-y-6 p-8 max-w-md">
                <div className="size-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-6xl text-red-500">error</span>
                </div>
                <h2 className="text-3xl font-bold text-text-main dark:text-white">
                    Oops! Có lỗi xảy ra
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Đừng lo, nghiệp chướng này sẽ qua thôi. Hãy thử lại nhé!
                </p>
                {process.env.NODE_ENV === 'development' && (
                    <details className="text-left bg-red-50 dark:bg-red-900/10 p-4 rounded-lg text-sm">
                        <summary className="cursor-pointer font-bold text-red-600 dark:text-red-400 mb-2">
                            Chi tiết lỗi (chỉ hiện trong development)
                        </summary>
                        <pre className="text-xs overflow-auto text-gray-700 dark:text-gray-300">
                            {error.message}
                        </pre>
                    </details>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="bg-primary text-text-main font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-all shadow-lg"
                    >
                        Thử lại
                    </button>
                    <Link
                        href="/"
                        className="bg-gray-200 dark:bg-gray-700 text-text-main dark:text-white font-bold px-6 py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}
