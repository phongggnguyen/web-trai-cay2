import React from 'react';
import { Page } from '../types';

interface OrderSuccessProps {
  onNavigate: (page: Page) => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center py-8 px-4 md:px-10 lg:px-40 w-full max-w-[1440px] mx-auto gap-8">
      {/* Success Hero */}
      <section className="flex flex-col items-center gap-6 w-full max-w-3xl text-center py-8 animate-fade-in-up">
        <div className="relative">
          <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40">
              <span className="material-symbols-outlined text-4xl">check</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 rotate-12 bg-white dark:bg-surface-dark px-3 py-1 rounded-full border border-border-color dark:border-border-dark shadow-sm">
            <span className="text-xs font-bold text-primary">Success!</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-4xl font-extrabold text-text-main dark:text-white tracking-tight">Cảm ơn bạn, Minh!</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Đơn hàng <span className="font-bold text-text-main dark:text-white">#TQN-8829</span> của bạn đã được tiếp nhận thành công. 
            <br className="hidden md:block"/>
            <span className="italic text-primary font-medium">"Nghiệp này là nghiệp tốt!"</span> Trái cây tươi ngon sẽ sớm đến tay bạn.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <button className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-black font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/25">
            <span className="material-symbols-outlined mr-2 text-xl">local_shipping</span>
            Theo dõi đơn hàng
          </button>
          <button 
            onClick={() => onNavigate(Page.PRODUCT_LIST)}
            className="flex h-12 items-center justify-center rounded-full bg-background-light dark:bg-surface-dark px-8 text-primary font-bold hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </section>

      {/* Order Status Tracker */}
      <section className="w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-color dark:border-border-dark p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Trạng thái đơn hàng</h3>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Đang xử lý</span>
          </div>
          <div className="relative pt-2">
            {/* Progress Bar Background */}
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[35%] rounded-full shadow-[0_0_10px_rgba(76,223,32,0.6)]"></div>
            </div>
            {/* Milestones */}
            <div className="flex justify-between mt-4 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="text-primary font-bold flex flex-col items-center gap-1 relative">
                <span className="size-2 bg-primary rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2"></span>
                Đã đặt hàng
                <span className="font-normal text-[10px] opacity-80">14:30, 14/10</span>
              </div>
              <div className="text-primary font-bold flex flex-col items-center gap-1 relative">
                <span className="size-2 bg-primary rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2"></span>
                Đang xử lý
              </div>
              <div className="flex flex-col items-center gap-1">
                Đang giao hàng
              </div>
              <div className="flex flex-col items-center gap-1">
                Đã giao hàng
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl mt-2">
            <span className="material-symbols-outlined">schedule</span>
            Dự kiến giao hàng: <span className="font-bold">Thứ Ba, 15/10/2023</span>
          </div>
        </div>
      </section>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Left Column: Products */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-text-main dark:text-white">Chi tiết đơn hàng</h2>
          <div className="overflow-hidden rounded-2xl border border-border-color dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-color dark:border-border-dark bg-background-light dark:bg-black/20 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="p-4 font-semibold">Sản phẩm</th>
                  <th className="p-4 font-semibold text-right hidden sm:table-cell">Đơn giá</th>
                  <th className="p-4 font-semibold text-center">SL</th>
                  <th className="p-4 font-semibold text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color dark:divide-border-dark text-sm">
                <tr className="group hover:bg-background-light dark:hover:bg-black/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-xl bg-gray-100 dark:bg-gray-800 bg-cover bg-center shrink-0 border border-border-color dark:border-border-dark" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBA2uLEeKbf6wG2FIrYwDwFI827EVhpUEzcBUAE1wjcSxnh_BkXwQHMaV6pFXPVKyuCv0eD0a_KzvHtLaAym7y7Y-27E22fhFyi6tdhSR3LitR3g4vz1gLppAjL8Jof5zIKPqs_V_P_FDctI2PDZCEC52t8H_BBj6AZdlgUeT-jh8VSVxFZyamC_oPLZgm2wW3AIhRwdW_pn9ERX7fX5U4IoFBYqEYCHsQp7bMl2D24UP3PbBAdhOuNShe7fI-WyILEgOfCxkMuglGP')"}}></div>
                      <div>
                        <p className="font-bold text-text-main dark:text-white">Táo Envy Mỹ</p>
                        <p className="text-gray-500 text-xs">Size lớn • 1kg</p>
                        <p className="sm:hidden text-primary mt-1 font-medium">150.000đ</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right hidden sm:table-cell text-gray-600 dark:text-gray-300">150.000đ</td>
                  <td className="p-4 text-center font-medium text-text-main dark:text-white">1</td>
                  <td className="p-4 text-right font-bold text-primary">150.000đ</td>
                </tr>
                <tr className="group hover:bg-background-light dark:hover:bg-black/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-xl bg-gray-100 dark:bg-gray-800 bg-cover bg-center shrink-0 border border-border-color dark:border-border-dark" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASUNdB-z-54sHKp_ncTn7mWKgXdpAkfBujEurJAyPC9qAzUtiDDmxM5RSG54SRBVNushg2GTAztwdrPfdnjzw2VbZIosmRd67JDyB0hIJDaEBzjw1UhXft6tnte2iAIID8fp4dIRmMFFiNwIz40LYRLxHM2VZETOFNDoFDNciYdWD85DOATh5_15cLVXCgN7ibuI2VLZZCVMSXJ7WQX9KLIbLqqUz0M8k1Ro7WfHzZZV3Snap-smZclkS4rP1S7wQe3Hg3i5cZb3Y2')"}}></div>
                      <div>
                        <p className="font-bold text-text-main dark:text-white">Nho Mẫu Đơn</p>
                        <p className="text-gray-500 text-xs">Hàn Quốc • 500g</p>
                        <p className="sm:hidden text-primary mt-1 font-medium">300.000đ</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right hidden sm:table-cell text-gray-600 dark:text-gray-300">300.000đ</td>
                  <td className="p-4 text-center font-medium text-text-main dark:text-white">2</td>
                  <td className="p-4 text-right font-bold text-primary">600.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Info & Summary */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-text-main dark:text-white">Thông tin giao hàng</h2>
          {/* Customer Info Card */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-color dark:border-border-dark p-6 shadow-sm flex flex-col gap-6">
            {/* Address */}
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main dark:text-white mb-1">Địa chỉ nhận hàng</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Nguyễn Văn Minh<br/>
                  0909 123 456<br/>
                  123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM
                </p>
              </div>
            </div>
            <hr className="border-dashed border-gray-200 dark:border-gray-700"/>
            {/* Payment */}
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-text-main dark:text-white mb-1">Phương thức thanh toán</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Thanh toán khi nhận hàng (COD)</p>
              </div>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-green-500" title="Đã xác nhận">check_circle</span>
              </div>
            </div>
          </div>

          {/* Cost Summary Card */}
          <div className="bg-background-light dark:bg-black/20 rounded-2xl p-6 flex flex-col gap-3 border border-border-color dark:border-border-dark">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Tạm tính</span>
              <span>750.000đ</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Phí vận chuyển</span>
              <span>30.000đ</span>
            </div>
            <div className="flex justify-between text-sm text-primary">
              <span>Giảm giá</span>
              <span>-15.000đ</span>
            </div>
            <hr className="border-gray-200 dark:border-gray-700 my-1"/>
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-text-main dark:text-white">Tổng cộng</span>
              <span className="text-xl font-extrabold text-primary">765.000đ</span>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-primary text-sm transition-colors py-2">
            <span className="material-symbols-outlined text-lg">print</span>
            In hóa đơn
          </button>
        </div>
      </div>

      {/* Recommendations (Fresh Picks) */}
      <section className="w-full max-w-5xl mt-8 pt-8 border-t border-border-color dark:border-border-dark">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-text-main dark:text-white">
            <span className="material-symbols-outlined text-primary">eco</span>
            Có thể bạn sẽ thích
          </h2>
          <button onClick={() => onNavigate(Page.PRODUCT_LIST)} className="text-sm font-medium text-primary hover:underline">Xem tất cả</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Dâu Tây Đà Lạt', price: '120.000đ', unit: '500g', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDxAvPr0A0nd1C2fwXxoPTn0gQ72Q4KmzXiWAKauOn8M1PpviaY9lS_VYRZUMVenYrq36wQAIPZovjIydiZJ7fl_q8M5QOoMs4J9ISsrq0Jm1KMepAC7PtxJ26w0JFbQ-Xkz-J4OVGkeQQnaW1LDz_RYk14eDXFKOZEJWKtRoPH6dxqwoWRm1nHLNugZpPJvfUEtQsN2opk-ZOat6nOPaYzjZdgum7I66Ycswdl9ci8g8PZPWY6jE5ZG6P7_8ux1vqi7JYDoIAQ6wr' },
            { name: 'Kiwi Xanh New Zealand', price: '85.000đ', unit: 'kg', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpKgJ9yrA9qIEf6R-ByqrxL0s7a_CT5gkAbkCKLkPW2-x9aJ9k4862o-wC_RG4U85bULN9-_gMRgX0BEqkaqW0XpE7XVS6DuGrPQARpvs_843Yv-FTdA9rFStv_xfJO9BW98kgl3rg3CwzbbdczIxhbcMiE2os0F-r2bN_RVlaQc1SvwGfsJkt1iZbpiQtaY071s6Z2QUSy_-_fD_ovty11BYMQfCYo763TPU6ezFaG11s6uVR827Pn9s6lkdS0PgRs89gzg5c4Ng' },
            { name: 'Thơm Mật (Dứa)', price: '25.000đ', unit: 'trái', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9Kw5xbmWLtzsWjJqex5H8Ar94PHLwtUtntaTnJFrc_mZJjOYozSDX-4WQKIOT5ROLx4qLZgh3zFl9iCKVSO7AsJ4VGDjyj2lwXaeO8EmftMhKZoVQsixaxXqkNhuaKV1rZqAv6Sbb9aK4CFK7yCLnodqaURX-j5UeC2IvqZKQq48yb04FoiiyL_FxOgfgWT96qw4EsWOrD7WHtLy565LUi-OODWafxbP11FXKmngiBc3D0m1wKvMTBoeYxtXIneaAU7VmVgkQGuS', discount: '-10%' },
            { name: 'Cam Vàng Navel', price: '65.000đ', unit: 'kg', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo7_bq0mZJbD0XJsWaoEdn7AFLZJUX8wIe3iApARxfopmrrCw4tuU5G6XSKeU0La4JzWf_MRpGl5WnUkCtrZ68uciVeFvRG6mXLoq0sXJy-Z3V_eUwViODnE67RhvDIHI1Yk2MMfJ0bPFpijmX-FnhbetIySGaVcCxC1aNoiADFpNPMGCh6-yls0b7K3D_JLdy6T8z9uMf2r-AOClXHPfKpTncQ-NFq-XPEBJtgs4uxVyPQq6I-nTivuoS_4TBKunL83hNyIz6aw3z' },
          ].map((prod, idx) => (
            <div key={idx} className="group relative flex flex-col rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-color dark:border-border-dark overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300">
              <div className="aspect-square w-full bg-gray-100 dark:bg-black/20 relative overflow-hidden">
                {prod.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">{prod.discount}</div>
                )}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: `url('${prod.img}')`}}></div>
                <button className="absolute bottom-3 right-3 size-10 rounded-full bg-white dark:bg-surface-dark text-primary shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center hover:bg-primary hover:text-text-main">
                  <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                </button>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <h3 className="font-bold text-text-main dark:text-white truncate">{prod.name}</h3>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-primary">{prod.price} <span className="text-gray-400 text-xs font-normal">/ {prod.unit}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OrderSuccess;