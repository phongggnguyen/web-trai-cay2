import Link from 'next/link';

export function ActionButtons() {
    return (
        <>
            {/* Buttons Group */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 md:mt-12 w-full max-w-2xl">
                {/* Home Button */}
                <Link href="/" className="group relative flex items-center justify-center min-w-[200px]">
                    <div className="absolute inset-0 bg-yellow-600 rounded-full translate-y-1.5 group-hover:translate-y-2.5 transition-transform"></div>
                    <div className="relative bg-[#FF9900] border-[3px] border-black px-6 py-3 rounded-full flex items-center gap-2 w-full justify-center group-hover:-translate-y-1 transition-transform group-active:translate-y-1">
                        <span className="text-2xl filter drop-shadow">🏠</span>
                        <div className="flex flex-col items-start leading-none text-white drop-shadow-sm">
                            <span className="font-bold text-base uppercase">TRANG CHỦ</span>
                            <span className="font-bold text-xs">Về Cửa Hàng</span>
                        </div>
                    </div>
                </Link>

                {/* View Details Button */}
                <Link href="/profile" className="group relative flex items-center justify-center min-w-[200px]">
                    <div className="absolute inset-0 bg-green-700 rounded-full translate-y-1.5 group-hover:translate-y-2.5 transition-transform"></div>
                    <div className="relative bg-[#76E032] border-[3px] border-black px-6 py-3 rounded-full flex items-center gap-2 w-full justify-center group-hover:-translate-y-1 transition-transform group-active:translate-y-1">
                        <span className="text-2xl filter drop-shadow">📄</span>
                        <div className="flex flex-col items-start leading-none text-white drop-shadow-sm">
                            <span className="font-bold text-base uppercase">XEM CHI TIẾT</span>
                            <span className="font-bold text-xs">Đơn Hàng</span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
                <button className="bg-black text-white p-1.5 rounded-full hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">facebook</span>
                </button>
                <button className="bg-black text-white p-1.5 rounded-full hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">photo_camera</span>
                </button>
                <button className="bg-black text-white p-1.5 rounded-full hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">smart_display</span>
                </button>
            </div>
        </>
    );
}
