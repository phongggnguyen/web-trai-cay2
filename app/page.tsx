'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobal } from '../context/GlobalContext';
import { supabase } from '../lib/supabase';
import ProductRecommendations from '../components/ProductRecommendations';
import HeroCarousel from '../components/Hero/HeroCarousel';

export default function HomePage() {
  const { addToCart, user } = useGlobal();
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
            img: item.background_image || item.image_url // Ưu tiên background_image, fallback về image_url
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
      <HeroCarousel />

      {/* Categories */}
      <section className="px-4 py-10 md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight md:text-2xl text-text-main dark:text-white">Danh Mục Trái Cây</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-text-muted">Chọn loại "nghiệp" bạn muốn giải hôm nay</p>
            </div>
            <Link href="/products" className="hidden text-sm font-bold text-primary hover:underline md:block">Xem tất cả -&gt;</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(categories.length > 0 ? categories : [
              // Fallback skeleton or default if needed to avoid layout shift, currently simplified
            ]).map((cat, idx) => (
              <Link key={idx} href="/products" className="group relative overflow-hidden rounded-3xl bg-surface-dark aspect-[4/3] md:aspect-auto md:h-60 cursor-pointer hover-lift shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" style={{ backgroundImage: `url('${cat.img}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-primary/40 group-hover:via-black/30 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent-warm/0 group-hover:from-primary/30 group-hover:to-accent-warm/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-all duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-lg font-black text-white mb-1.5 drop-shadow-lg">{cat.title}</h3>
                  <p className="text-xs text-gray-200 font-medium max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">{cat.desc}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-primary-light opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <span className="text-xs font-bold">Khám phá</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white dark:bg-surface-dark/30 px-4 py-12 md:px-10 transition-colors duration-200">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 text-center">
            <span className="text-primary font-bold tracking-wider uppercase text-xs">Best Sellers</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl text-text-main dark:text-white">Sản Phẩm "Giải Nghiệp"</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-text-muted max-w-xl mx-auto">Những loại trái cây được yêu thích nhất tuần qua. Ăn vào mát lòng mát dạ, nghiệp chướng tiêu tan.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white/80 dark:bg-surface-dark/60 backdrop-blur-sm border border-border-color/30 dark:border-border-dark/30 transition-all duration-300 hover-lift shadow-lg hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/10 cursor-pointer"
              >
                <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black/20 dark:to-black/40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />
                  {product.tag && (
                    <div className={`absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-black text-white shadow-lg backdrop-blur-sm ${product.tagColor === 'red' ? 'bg-red-500/90' : product.tagColor === 'orange' ? 'bg-gradient-to-r from-orange-500 to-accent-warm' : 'bg-gradient-to-r from-primary to-primary-light'}`}>
                      {product.tag}
                    </div>
                  )}
                  {/* Quick Add overlay - appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, 1);
                      }}
                      className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-5 py-2.5 text-xs font-black text-background-dark shadow-xl hover:scale-105 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      Thêm vào giỏ
                    </button>
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-base font-black text-text-main dark:text-white line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-text-muted dark:text-text-secondary mt-1 font-medium">{product.category}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex flex-col gap-0.5">
                      {product.originalPrice && <span className="text-[10px] text-gray-400 line-through font-medium">{product.originalPrice.toLocaleString('vi-VN')}đ</span>}
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">{product.price.toLocaleString('vi-VN')}đ</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold">/{product.unit}</span>
                      </div>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary group-hover:from-primary group-hover:to-primary-light group-hover:text-background-dark transition-all duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-full border border-gray-300 dark:border-border-dark bg-transparent px-6 text-sm font-bold text-text-main dark:text-white transition-colors hover:bg-white dark:hover:bg-surface-dark hover:border-transparent"
            >
              Xem Toàn Bộ Sản Phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* Product Recommendations - Chỉ hiển thị khi user đã đăng nhập */}
      {user && <ProductRecommendations userId={user.id} />}

      {/* Features */}
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-[1280px] rounded-[2.5rem] bg-[#20321b] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="relative z-10 grid gap-8 md:grid-cols-3">
            {[
              { icon: 'eco', title: '100% Organic', desc: 'Trái cây sạch, nguồn gốc rõ ràng, không chất bảo quản.' },
              { icon: 'rocket_launch', title: 'Giao Hàng Hỏa Tốc', desc: 'Nhận hàng trong 2h tại nội thành. Tươi ngon như vừa hái.' },
              { icon: 'sentiment_very_satisfied', title: 'Bao Ăn Bao Đổi', desc: 'Không ngon hoàn tiền. Cam kết chất lượng dịch vụ "siêu cấp".' }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-[28px]">{feature.icon}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border-color dark:border-border-dark bg-white dark:bg-background-dark px-4 py-12 md:px-10 transition-colors duration-200">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
          <span className="material-symbols-outlined mb-4 text-4xl text-primary">mark_email_unread</span>
          <h2 className="mb-3 text-2xl font-black text-text-main dark:text-white md:text-4xl">Gia Nhập "Hội Đồng Nghiệp"</h2>
          <p className="mb-6 text-base text-gray-500 dark:text-text-muted">Đăng ký để nhận voucher giảm giá bí mật và thông tin trái cây mới về hàng ngày.</p>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              className="h-11 w-full rounded-full border border-gray-300 dark:border-border-dark bg-transparent px-5 text-sm text-text-main dark:text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-dark"
              placeholder="Email của bạn..."
              type="email"
            />
            <button
              type="button"
              className="h-11 rounded-full bg-primary px-6 text-sm font-bold text-text-main transition-transform hover:scale-105"
            >
              Đăng Ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}