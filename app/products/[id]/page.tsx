'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '../../../constants';
import { useGlobal } from '../../../context/GlobalContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useGlobal();
  const id = params.id as string;

  const product = PRODUCTS.find(p => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('1kg');
  const [activeTab, setActiveTab] = useState<'description' | 'origin' | 'shipping'>('description');

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-20">
        <h2 className="text-2xl font-bold">Không tìm thấy sản phẩm</h2>
        <Link href="/products" className="text-primary hover:underline mt-4">Quay lại danh sách</Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 mb-8 items-center text-sm">
        <Link href="/" className="text-text-muted dark:text-gray-400 font-medium hover:underline">Trang chủ</Link>
        <span className="text-text-muted dark:text-gray-600">/</span>
        <Link href="/products" className="text-text-muted dark:text-gray-400 font-medium hover:underline">{product.category || 'Trái cây nhập khẩu'}</Link>
        <span className="text-text-muted dark:text-gray-600">/</span>
        <span className="text-text-main dark:text-primary font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-background-light dark:bg-surface-dark group border border-border-color dark:border-border-dark">
            {product.tag && (
              <span className={`absolute top-4 left-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${
                product.tagColor === 'red' ? 'bg-red-500' : product.tagColor === 'orange' ? 'bg-orange-500' : 'bg-primary text-text-main'
              }`}>
                {product.tag}
              </span>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
            />
            <button className="absolute bottom-4 right-4 bg-surface-light/90 dark:bg-black/50 p-2.5 rounded-full shadow-lg backdrop-blur-sm hover:bg-primary transition-colors group/zoom text-text-main dark:text-white hover:text-text-main">
              <span className="material-symbols-outlined group-hover/zoom:text-text-main">zoom_in</span>
            </button>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto hide-scrollbar py-1">
             {[product.image, product.image, product.image].map((img, idx) => (
                <button 
                  key={idx} 
                  className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    idx === 0 
                      ? 'border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-background-dark' 
                      : 'border-transparent hover:border-primary/50'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
             ))}
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Header Info */}
          <div className="border-b border-border-color dark:border-border-dark pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-border-color dark:bg-primary/20 text-secondary dark:text-primary text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">Best Seller</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-yellow-400 text-[18px] fill-current">star</span>
                <span className="text-sm font-bold dark:text-white">{product.rating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews} đánh giá)</span>
              </div>
            </div>
            <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-black leading-tight mb-3 tracking-tight">{product.name}</h1>
            <p className="text-text-muted dark:text-gray-400 text-base leading-relaxed">
              {product.description || "Nhập khẩu trực tiếp. Vị ngọt đậm đà, giòn tan trong miệng, hậu vị thanh mát. Ăn một quả là dính ngay cái nghiệp 'nghiện'!"}
            </p>
          </div>

          {/* Price & Options */}
          <div className="flex flex-col gap-6">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-primary tracking-tight">{product.price.toLocaleString('vi-VN')}đ</span>
              {product.originalPrice && <span className="text-xl text-gray-400 line-through mb-1 font-medium">{product.originalPrice.toLocaleString('vi-VN')}đ</span>}
              <span className="text-sm text-gray-500 mb-1 font-medium">/ {product.unit}</span>
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-text-main dark:text-white">Chọn trọng lượng:</label>
              <div className="flex flex-wrap gap-3">
                {['500g', '1kg', 'Thùng 2kg', 'Thùng 5kg'].map((w) => (
                  <button 
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-6 py-2.5 rounded-full border font-bold transition-all ${
                      selectedWeight === w 
                        ? 'bg-primary text-text-main border-primary shadow-lg shadow-primary/20' 
                        : 'border-gray-200 dark:border-border-dark text-text-main dark:text-gray-300 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center h-14 bg-background-light dark:bg-surface-dark rounded-full px-2 w-fit border border-gray-200 dark:border-border-dark">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="size-10 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-gray-700 text-text-main dark:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <input className="w-12 text-center bg-transparent border-none focus:ring-0 text-lg font-bold text-text-main dark:text-white" readOnly value={quantity} />
                <button onClick={() => setQuantity(quantity + 1)} className="size-10 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-gray-700 text-text-main dark:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 h-14 bg-primary hover:bg-primary-dark text-text-main text-lg font-bold rounded-full flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                <span className="material-symbols-outlined">shopping_bag</span>
                Thêm vào giỏ hàng
              </button>
              <button className="size-14 bg-background-light dark:bg-surface-dark border border-gray-200 dark:border-border-dark hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined fill-current">favorite</span>
              </button>
            </div>
          </div>

          {/* Policies */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-color dark:border-border-dark">
            {[
              { icon: 'local_shipping', title: 'Giao siêu tốc 2h', sub: 'Nội thành TP.HCM', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
              { icon: 'verified_user', title: 'Bảo hành 1 đổi 1', sub: 'Trong 24h nếu hư hỏng', color: 'text-secondary dark:text-primary', bg: 'bg-primary/20' },
              { icon: 'eco', title: '100% Tự nhiên', sub: 'Không chất bảo quản', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`${p.bg} p-2.5 rounded-xl ${p.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-main dark:text-white">{p.title}</h4>
                  <p className="text-xs text-gray-500">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Info Tabs */}
      <div className="mt-16 md:mt-24">
        <div className="border-b border-gray-200 dark:border-border-dark">
          <nav className="-mb-px flex space-x-8 overflow-x-auto hide-scrollbar">
            {[
              { id: 'description', label: 'Mô tả sản phẩm' },
              { id: 'origin', label: 'Nguồn gốc & Xuất xứ' },
              { id: 'shipping', label: 'Chính sách giao hàng' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-lg transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-text-main dark:hover:text-white hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="py-8 text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl space-y-4 animate-fade-in-up">
          {activeTab === 'description' && (
            <>
              <p>{product.name} được mệnh danh là "Kim cương của các loại hoa quả" không chỉ bởi giá thành đắt đỏ mà còn bởi những giá trị dinh dưỡng tuyệt vời mà nó mang lại. Tại Tiệm Quả Nghiệp, chúng tôi tuyển chọn những quả to nhất, mọng nhất để phục vụ các "thượng đế".</p>
              <p className="font-bold text-text-main dark:text-white mt-4">Đặc điểm nổi bật:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                <li>Vỏ màu đỏ thẫm sang trọng, bóng mượt không tì vết.</li>
                <li>Thịt quả chắc, dày, hạt nhỏ.</li>
                <li>Vị ngọt đậm đà, giòn tan trong miệng, hậu vị thanh mát.</li>
                <li>Cuống xanh tươi như vừa hái tại vườn.</li>
              </ul>
            </>
          )}
          {activeTab === 'origin' && (
            <div className="space-y-4">
              <p>Sản phẩm được nhập khẩu chính ngạch, có đầy đủ giấy tờ kiểm dịch thực vật và chứng nhận nguồn gốc xuất xứ (CO/CQ).</p>
              <p>Chúng tôi hợp tác trực tiếp với các nông trại đạt chuẩn GlobalGAP tại {product.origin || 'nước ngoài'}, đảm bảo quy trình canh tác an toàn, không sử dụng thuốc trừ sâu độc hại.</p>
            </div>
          )}
          {activeTab === 'shipping' && (
             <div className="space-y-4">
               <p>Giao hàng hỏa tốc trong 2 giờ áp dụng cho các quận nội thành TP.HCM.</p>
               <p>Phí vận chuyển:</p>
               <ul className="list-disc pl-5 space-y-2">
                 <li>Miễn phí cho đơn hàng từ 500.000đ.</li>
                 <li>30.000đ cho đơn hàng dưới 500.000đ.</li>
               </ul>
             </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20 mb-10">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-text-main dark:text-white">Có thể bạn cũng thích</h2>
          <Link href="/products" className="text-primary font-bold hover:underline">Xem tất cả</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map(p => (
            <Link key={p.id} href={`/products/${p.id}`} className="group flex flex-col gap-3 cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-background-light dark:bg-surface-dark border border-border-color dark:border-border-dark">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button className="absolute bottom-3 right-3 size-10 bg-surface-light/90 dark:bg-black/50 rounded-full flex items-center justify-center text-text-main dark:text-white shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-text-main">
                  <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                </button>
              </div>
              <div>
                <h3 className="font-bold text-base text-text-main dark:text-white group-hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-text-main dark:text-primary">{p.price.toLocaleString('vi-VN')}đ</span>
                  {p.originalPrice && <span className="text-sm text-gray-400 line-through">{p.originalPrice.toLocaleString('vi-VN')}đ</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}