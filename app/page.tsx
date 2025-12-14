'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobal } from '../context/GlobalContext';
import { supabase } from '../lib/supabase';

export default function HomePage() {
  const { addToCart } = useGlobal();
  const [bestSellers, setBestSellers] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Parallel fetching
        const [bestSellersRes, categoriesRes] = await Promise.all([
          supabase
            .from('products')
            .select(`
              *,
              categories ( name )
            `)
            .eq('is_best_seller', true)
            .limit(4),
          supabase
            .from('categories')
            .select('*')
            .limit(4)
        ]);

        if (bestSellersRes.error) throw bestSellersRes.error;
        if (categoriesRes.error) throw categoriesRes.error;

        if (bestSellersRes.data) {
          const mappedProducts = bestSellersRes.data.map((item: any) => ({
            ...item,
            image: item.image_url,
            originalPrice: item.original_price,
            category: item.categories?.name,
            tag: item.tags?.[0],
            tagColor: item.tags?.[0] === 'HOT' ? 'red' : item.tags?.[0] === 'MỚI' ? 'orange' : 'primary'
          }));
          setBestSellers(mappedProducts);
        }

        if (categoriesRes.data) {
          const mappedCategories = categoriesRes.data.map((item: any) => ({
            title: item.name,
            desc: item.description,
            img: item.image_url
          }));
          setCategories(mappedCategories);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative px-4 py-6 md:px-10 lg:py-10">
        <div className="mx-auto max-w-[1440px]">
          <div
            className="relative overflow-hidden rounded-2xl md:rounded-[3rem] min-h-[500px] flex flex-col justify-end p-6 md:p-12 lg:p-16 bg-cover bg-center group transition-all"
            style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPinBOZpe7w4KtiE6KjCRvkNhecbJW_rGRq08ACc9aLNTkKaLGvikTVy_0bl3YyDnDRfRJvnKsG-OD13TXA-5y0TDnNTSVaI3O8Ot92flzNlzNugK25cZ8JHEmKcva4zSAFW5Vc8tCXTieNF9WF7F0hxgOxHvxRyVlcwh0xa5amguJ8FiMQL1YYryCEPqy1BnlTfc2l0BdnvXrOSms-MbmWuJ3BVY5mAjI2Ue6_TvCsbM6BRw1ajGOBtGPZv1TaaebxBx_0md_Fqtr')" }}
          >
            <div className="relative z-10 max-w-2xl animate-fade-in-up">
              <span className="mb-4 inline-block rounded-full bg-primary/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-background-dark backdrop-blur-sm">
                Tươi Ngon Mỗi Ngày
              </span>
              <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                TIỆM QUẢ NGHIỆP
              </h1>
              <p className="mb-8 text-lg font-medium text-gray-200 md:text-xl max-w-lg">
                "Nghiệp tụ vành môi - Ăn vô trôi hết." <br />
                Thưởng thức hương vị trái cây tươi mát, đánh tan mọi ưu phiền.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-background-dark transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(76,223,32,0.4)]"
                >
                  <span className="material-symbols-outlined mr-2 text-[20px]">local_mall</span>
                  Ăn Ngay Kẻo Lỡ
                </Link>
                <button className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 px-8 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20">
                  Xem Khuyến Mãi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-text-main dark:text-white">Danh Mục Trái Cây</h2>
              <p className="mt-2 text-gray-500 dark:text-text-muted">Chọn loại "nghiệp" bạn muốn giải hôm nay</p>
            </div>
            <Link href="/products" className="hidden text-sm font-bold text-primary hover:underline md:block">Xem tất cả -&gt;</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(categories.length > 0 ? categories : [
              // Fallback skeleton or default if needed to avoid layout shift, currently simplified
            ]).map((cat, idx) => (
              <Link key={idx} href="/products" className="group relative overflow-hidden rounded-2xl bg-surface-dark aspect-[4/3] md:aspect-auto md:h-64 cursor-pointer">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${cat.img}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                  <p className="mt-1 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white dark:bg-surface-dark/30 px-4 py-16 md:px-10 transition-colors duration-200">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 text-center">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Best Sellers</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl text-text-main dark:text-white">Sản Phẩm "Giải Nghiệp"</h2>
            <p className="mt-4 text-gray-500 dark:text-text-muted max-w-2xl mx-auto">Những loại trái cây được yêu thích nhất tuần qua. Ăn vào mát lòng mát dạ, nghiệp chướng tiêu tan.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-background-light dark:bg-surface-dark border border-border-color dark:border-border-dark transition-all hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
              >
                <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/20">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.tag && (
                    <div className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold text-white ${product.tagColor === 'red' ? 'bg-red-500' : product.tagColor === 'orange' ? 'bg-orange-500' : 'bg-primary'}`}>
                      {product.tag}
                    </div>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-text-main dark:text-white line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-text-muted mt-1">{product.category}</p>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex flex-col">
                      {product.originalPrice && <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</span>}
                      <span className="text-xl font-bold text-primary">{product.price.toLocaleString('vi-VN')}đ<span className="text-xs text-gray-500 dark:text-gray-400 font-normal">/{product.unit}</span></span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, 1);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-text-main shadow-lg hover:brightness-110 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full border border-gray-300 dark:border-border-dark bg-transparent px-6 font-bold text-text-main dark:text-white transition-colors hover:bg-white dark:hover:bg-surface-dark hover:border-transparent"
            >
              Xem Toàn Bộ Sản Phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto max-w-[1440px] rounded-[2.5rem] bg-[#20321b] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="relative z-10 grid gap-10 md:grid-cols-3">
            {[
              { icon: 'eco', title: '100% Organic', desc: 'Trái cây sạch, nguồn gốc rõ ràng, không chất bảo quản.' },
              { icon: 'rocket_launch', title: 'Giao Hàng Hỏa Tốc', desc: 'Nhận hàng trong 2h tại nội thành. Tươi ngon như vừa hái.' },
              { icon: 'sentiment_very_satisfied', title: 'Bao Ăn Bao Đổi', desc: 'Không ngon hoàn tiền. Cam kết chất lượng dịch vụ "siêu cấp".' }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-[32px]">{feature.icon}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border-color dark:border-border-dark bg-white dark:bg-background-dark px-4 py-16 md:px-10 transition-colors duration-200">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="material-symbols-outlined mb-6 text-5xl text-primary">mark_email_unread</span>
          <h2 className="mb-4 text-3xl font-black text-text-main dark:text-white md:text-5xl">Gia Nhập "Hội Đồng Nghiệp"</h2>
          <p className="mb-8 text-lg text-gray-500 dark:text-text-muted">Đăng ký để nhận voucher giảm giá bí mật và thông tin trái cây mới về hàng ngày.</p>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              className="h-12 w-full rounded-full border border-gray-300 dark:border-border-dark bg-transparent px-6 text-text-main dark:text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-dark"
              placeholder="Email của bạn..."
              type="email"
            />
            <button
              type="button"
              className="h-12 rounded-full bg-primary px-8 font-bold text-text-main transition-transform hover:scale-105"
            >
              Đăng Ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}