export default function ProductsLoading() {
    return (
        <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-10">
            {/* Header Skeleton */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                    <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
                {/* Sidebar Skeleton */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="space-y-6 rounded-2xl border border-border-color bg-surface-light p-6 dark:border-border-dark dark:bg-surface-dark">
                        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid Skeleton */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border-color bg-surface-light dark:border-border-dark dark:bg-surface-dark">
                                <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="flex items-center justify-between">
                                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                        <div className="size-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
