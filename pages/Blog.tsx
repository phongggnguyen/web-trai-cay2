import React, { useState } from 'react';
import { Page } from '../types';
import { BLOG_POSTS, PRODUCTS } from '../constants';

interface BlogProps {
  onNavigate: (page: Page) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  
  // Data extraction
  const featuredPost = BLOG_POSTS[0];
  const gridPosts = BLOG_POSTS.slice(1);
  // Add a dummy post to match the design's grid count if needed, or just use what we have.
  // Using PRODUCTS for the sidebar widget
  const hotProducts = PRODUCTS.slice(0, 3);

  const categories = [
    { name: 'Tất cả', icon: 'grid_view' },
    { name: 'Sức khỏe', icon: 'favorite' },
    { name: 'Mẹo vặt', icon: 'lightbulb' },
    { name: 'Công thức', icon: 'local_fire_department' },
    { name: 'Bảo quản', icon: 'inventory_2' },
  ];

  return (
    <div className="w-full">
      {/* HeroSection */}
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
              "Nghiệp tụ vành môi - Ăn vô trôi hết." <br className="hidden sm:block"/> Khám phá bí quyết chọn quả ngon, công thức detox và sống khỏe mỗi ngày cùng Tiệm Quả Nghiệp.
            </h2>
          </div>
          <div className="w-full max-w-[600px] z-10 mt-4 px-4">
            <label className="flex flex-col h-14 w-full shadow-lg rounded-xl">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-white dark:bg-surface-dark p-1">
                <div className="text-text-muted flex items-center justify-center pl-3">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input 
                  className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white px-3 text-base" 
                  placeholder="Bạn muốn tìm hiểu về loại quả nào?" 
                />
                <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-full bg-primary hover:bg-primary-dark text-text-main text-base font-bold transition-colors">
                  <span>Tìm kiếm</span>
                </button>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex h-full grow flex-col w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Filter Chips */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar flex-nowrap">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-6 transition-all shadow-sm ${
                  activeCategory === cat.name 
                    ? 'bg-text-main dark:bg-primary text-white dark:text-text-main shadow-md transform scale-105'
                    : 'bg-white dark:bg-surface-dark border border-border-color dark:border-border-dark hover:border-primary group'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeCategory === cat.name ? '' : 'text-gray-500 group-hover:text-primary'}`}>
                  {cat.icon}
                </span>
                <p className={`text-sm font-medium ${activeCategory === cat.name ? 'font-bold' : 'text-text-main dark:text-white'}`}>
                  {cat.name}
                </p>
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-text-muted cursor-pointer hover:text-primary">
            <span>Sắp xếp: Mới nhất</span>
            <span className="material-symbols-outlined text-[18px]">sort</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Blog Grid */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-text-main dark:text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full block"></span>
              Bài viết nổi bật
            </h3>
            
            {/* Featured Post (Large) */}
            {featuredPost && (
              <div className="@container w-full">
                <div className="flex flex-col items-stretch justify-start rounded-2xl @xl:flex-row @xl:items-stretch shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-surface-dark overflow-hidden group h-full border border-border-color dark:border-border-dark">
                  <div 
                    className="w-full @xl:w-2/5 bg-center bg-no-repeat bg-cover min-h-[240px] group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: `url("${featuredPost.image}")` }}
                  >
                  </div>
                  <div className="flex w-full @xl:w-3/5 flex-col justify-center p-6 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/20 text-green-700 dark:text-primary text-xs font-bold px-2 py-1 rounded-md">{featuredPost.category}</span>
                      <span className="text-gray-400 text-xs font-medium">• {featuredPost.date}</span>
                    </div>
                    <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="pt-2">
                      <button className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                        Đọc tiếp <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {gridPosts.map((post) => (
                <div key={post.id} className="flex flex-col bg-white dark:bg-surface-dark rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-border-color dark:border-border-dark">
                  <div 
                    className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: `url('${post.image}')` }}
                  >
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted text-xs font-bold uppercase tracking-wider">{post.category}</span>
                      <span className="text-gray-400 text-xs">{post.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-text-main dark:text-white leading-snug group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              ))}
              {/* Extra dummy post for layout if needed */}
              <div className="flex flex-col bg-white dark:bg-surface-dark rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-border-color dark:border-border-dark">
                  <div 
                    className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5e3bqokHwRElkzwA9d4jK0PwOL5UmbA7JQWt-17P10RjLmngqAw45Tu8ZTUGWHHAL0TU04-oQA8lkAMQ6Hc1farv6J5OSVR--jiE9adUvCAlVOQuh5mWcts_ARz0Cs4-ro-UA3aRama3G1o8VcXJjccDNKjtPYuebfvHySyIz2R_OV0OIhaXhFJwwknSchre_PmOdqBcmvPx6D0VKX8xpylxKFo1wKcI9yZ4TU94j7oB3RdEEgixofsJmPciIFgM6rNSfWYo3K61v')" }}
                  >
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Công thức</span>
                      <span className="text-gray-400 text-xs">01/05/2024</span>
                    </div>
                    <h4 className="text-lg font-bold text-text-main dark:text-white leading-snug group-hover:text-primary transition-colors cursor-pointer">
                      3 món ăn sáng nhanh gọn với Bơ sáp
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                      Bữa sáng đầy năng lượng chỉ trong 5 phút. Bơ sáp không chỉ ngon mà còn giúp đẹp da, giữ dáng tuyệt vời.
                    </p>
                  </div>
                </div>
            </div>

            <div className="flex justify-center mt-8">
              <button className="px-8 py-3 rounded-full border-2 border-border-color dark:border-border-dark text-text-main dark:text-white font-bold text-sm hover:bg-primary hover:border-primary hover:text-text-main transition-all">
                Xem thêm bài viết cũ hơn
              </button>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Widget: Recommended Products */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border-color dark:border-border-dark">
              <h3 className="text-lg font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                Sản phẩm đang hot
              </h3>
              <div className="flex flex-col gap-4">
                {hotProducts.map(product => (
                  <div key={product.id} className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate(Page.PRODUCT_DETAIL)}>
                    <div 
                      className="size-16 rounded-xl bg-gray-100 dark:bg-black/20 bg-cover bg-center shrink-0 border border-border-color dark:border-border-dark" 
                      style={{ backgroundImage: `url('${product.image}')` }}
                    ></div>
                    <div className="flex flex-col flex-1">
                      <h5 className="text-sm font-bold text-text-main dark:text-white group-hover:text-primary transition-colors line-clamp-1">{product.name}</h5>
                      {product.originalPrice && <span className="text-xs text-gray-500 dark:text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</span>}
                      <span className="text-sm font-bold text-primary">{product.price.toLocaleString('vi-VN')}đ/{product.unit}</span>
                    </div>
                    <button className="size-8 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-primary hover:bg-primary hover:text-text-main transition-colors">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget: Newsletter */}
            <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 size-32 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="size-12 bg-white dark:bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                  <span className="material-symbols-outlined text-[24px]">mail</span>
                </div>
                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">Đăng ký nhận tin</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Nhận ngay mẹo chọn quả ngon và mã giảm giá 10% hàng tuần.</p>
                <div className="flex flex-col gap-2">
                  <input 
                    className="w-full rounded-xl border-none bg-white dark:bg-surface-dark px-4 py-3 text-sm focus:ring-2 focus:ring-primary placeholder:text-gray-400 text-text-main dark:text-white" 
                    placeholder="Email của bạn..." 
                    type="email"
                  />
                  <button className="w-full rounded-xl bg-primary hover:bg-primary-dark text-text-main font-bold py-3 text-sm transition-colors">
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Widget: Popular Posts List */}
            <div className="bg-transparent rounded-2xl p-0">
              <h3 className="text-lg font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">trending_up</span>
                Được đọc nhiều nhất
              </h3>
              <div className="flex flex-col gap-0 divide-y divide-border-color dark:divide-border-dark">
                {gridPosts.map((post, idx) => (
                   <a key={post.id} className="py-3 flex gap-3 group cursor-pointer" onClick={() => onNavigate(Page.BLOG)}>
                    <span className="text-2xl font-black text-gray-200 dark:text-white/10 group-hover:text-primary transition-colors">0{idx + 1}</span>
                    <div>
                      <h5 className="text-sm font-bold text-text-main dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h5>
                      <span className="text-xs text-gray-500">{post.views} lượt xem</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;