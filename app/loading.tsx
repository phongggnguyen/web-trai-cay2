export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="text-center space-y-4">
                <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Đang tải...</p>
            </div>
        </div>
    );
}
