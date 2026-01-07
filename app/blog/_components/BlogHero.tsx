export default function BlogHero() {
    return (
        <div className="@container w-full">
            <div
                className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 relative"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlmsnJNJGhGGUmBIbAX9XGq935Fq3jTm-kmw8K-cRwuhFa0rmY_b_MuZ2jbtxA18bplJuqiPrIzg9zw9AVVx9YQhwuhT1ZdXc4_jIShitxn23ObEmY96DgdbN1CfmzhFVIVfJUYjRItPoNW8F7HB2WiY9TI5e2qsgZ3g0knjBr1MJM-XWqJJifxQBkxUv8kBHBoKAbiCszpN6HIoz0y-o2tJBY-kXbWaPk-BHt1xwDIvSUTXPdVFVewDuFR2lcSg9gkAtXGTUCjQrH")'
                }}
            >
                <div className="flex flex-col gap-3 text-center z-10 max-w-3xl">
                    <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md mx-auto mb-2">
                        <span className="material-symbols-outlined text-primary text-sm">eco</span>
                        <span className="text-primary font-bold text-xs uppercase tracking-wider">Sống Xanh Ăn Lành</span>
                    </div>

                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl lg:text-6xl drop-shadow-sm">
                        Góc Kiến Thức Trái Cây
                    </h1>

                    <h2 className="text-gray-200 text-base font-medium leading-relaxed @[480px]:text-lg max-w-2xl mx-auto drop-shadow-sm">
                        "Nghiệp tụ vành môi - Ăn vô trôi hết." <br className="hidden sm:block" />
                        Khám phá bí quyết chọn quả ngon, công thức detox và sống khỏe mỗi ngày cùng Tiệm Quả Nghiệp.
                    </h2>
                </div>
            </div>
        </div>
    );
}
