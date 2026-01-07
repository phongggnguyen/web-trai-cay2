import { getPublishedPosts } from '@/lib/blog/queries';
import BlogHero from './_components/BlogHero';
import BlogContent from './_components/BlogContent';
import Link from 'next/link';
import { PRODUCTS } from '../../constants';

export const metadata = {
  title: 'Blog - Góc Kiến Thức Trái Cây | Tiệm Quả Nghiệp',
  description: 'Khám phá bí quyết chọn quả ngon, công thức detox và sống khỏe mỗi ngày cùng Tiệm Quả Nghiệp',
};

export default async function BlogPage() {
  // Fetch published posts on server
  const posts = await getPublishedPosts();
  const hotProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <BlogHero />

      {/* Blog Content with Search & Filters */}
      <BlogContent initialPosts={posts} />

      {/* Sidebar - Moved to bottom on mobile */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommended Products */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border-color dark:border-border-dark">
            <h3 className="text-lg font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              Sản phẩm đang hot
            </h3>
            <div className="flex flex-col gap-4">
              {hotProducts.map(product => (
                <Link key={product.id} href={`/products/${product.id}`} className="flex items-center gap-3 group cursor-pointer">
                  <div
                    className="size-16 rounded-xl bg-gray-100 dark:bg-black/20 bg-cover bg-center shrink-0 border border-border-color dark:border-border-dark"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="flex flex-col flex-1">
                    <h5 className="text-sm font-bold text-text-main dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h5>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                        {product.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    )}
                    <span className="text-sm font-bold text-primary">
                      {product.price.toLocaleString('vi-VN')}đ/{product.unit}
                    </span>
                  </div>
                  <button className="size-8 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-primary hover:bg-primary hover:text-text-main transition-colors">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 bg-primary/10 rounded-2xl p-6 text-center border border-primary/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 size-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="size-12 bg-white dark:bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                Đăng ký nhận tin
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Nhận ngay mẹo chọn quả ngon và mã giảm giá 10% hàng tuần.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  className="flex-1 rounded-xl border-none bg-white dark:bg-surface-dark px-4 py-3 text-sm focus:ring-2 focus:ring-primary placeholder:text-gray-400 text-text-main dark:text-white"
                  placeholder="Email của bạn..."
                  type="email"
                />
                <button className="rounded-xl bg-primary hover:bg-primary-dark text-text-main font-bold px-6 py-3 text-sm transition-colors whitespace-nowrap">
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}