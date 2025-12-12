import React from 'react';
import { Page } from '../types';

interface TermsProps {
  onNavigate: (page: Page) => void;
  type?: 'TERMS' | 'PRIVACY'; // Keep prop for compatibility but this page is now Terms specific
}

const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-12 relative">
        {/* Sidebar Navigation (Sticky) */}
        <aside className="hidden lg:block w-1/4 relative">
          <div className="sticky top-28 space-y-6">
            {/* User Profile / Icon Card */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-gray-100 dark:border-border-dark flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">gavel</span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight text-text-main dark:text-white">Mục Lục</h3>
                <p className="text-xs text-text-muted">Điều hướng nhanh</p>
              </div>
            </div>
            {/* Navigation List */}
            <nav className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-gray-100 dark:border-border-dark flex flex-col gap-1">
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-semibold transition-all" href="#intro">
                <span className="material-symbols-outlined text-[20px]">info</span>
                <span className="text-sm">Giới thiệu chung</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-text-main dark:text-gray-300 font-medium transition-all group" href="#responsibilities">
                <span className="material-symbols-outlined text-[20px] text-text-muted group-hover:text-primary">person</span>
                <span className="text-sm">Trách nhiệm người dùng</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-text-main dark:text-gray-300 font-medium transition-all group" href="#store-rights">
                <span className="material-symbols-outlined text-[20px] text-text-muted group-hover:text-primary">storefront</span>
                <span className="text-sm">Quyền lợi cửa hàng</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-text-main dark:text-gray-300 font-medium transition-all group" href="#ordering">
                <span className="material-symbols-outlined text-[20px] text-text-muted group-hover:text-primary">payments</span>
                <span className="text-sm">Đặt hàng & Thanh toán</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-text-main dark:text-gray-300 font-medium transition-all group" href="#shipping">
                <span className="material-symbols-outlined text-[20px] text-text-muted group-hover:text-primary">local_shipping</span>
                <span className="text-sm">Vận chuyển & Giao nhận</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-text-main dark:text-gray-300 font-medium transition-all group" href="#refunds">
                <span className="material-symbols-outlined text-[20px] text-text-muted group-hover:text-primary">published_with_changes</span>
                <span className="text-sm">Đổi trả & Hoàn tiền</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-text-main dark:text-gray-300 font-medium transition-all group" href="#contact">
                <span className="material-symbols-outlined text-[20px] text-text-muted group-hover:text-primary">support_agent</span>
                <span className="text-sm">Liên hệ & Hỗ trợ</span>
              </a>
            </nav>
            {/* Help Banner */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-green-600 p-6 text-white shadow-lg">
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Cần giúp đỡ?</h4>
                <p className="text-sm opacity-90 mb-4">Đội ngũ "Quả Nghiệp" luôn sẵn sàng hỗ trợ bạn 24/7.</p>
                <button 
                  onClick={() => onNavigate(Page.CONTACT)}
                  className="w-full bg-white text-primary font-bold py-2 rounded-full text-sm hover:bg-green-50 transition-colors"
                >
                  Chat Ngay
                </button>
              </div>
              {/* Abstract circles for decoration */}
              <div className="absolute -bottom-4 -right-4 size-24 rounded-full bg-white/20"></div>
              <div className="absolute -top-4 -left-4 size-16 rounded-full bg-white/10"></div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="w-full lg:w-3/4 flex flex-col gap-8">
          {/* Page Header */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span>Chính sách & Quy định</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-tight tracking-tight">
                Điều Khoản Sử Dụng
              </h1>
              <p className="text-lg text-text-muted dark:text-gray-400 max-w-2xl">
                Chào mừng bạn đến với Tiệm Quả Nghiệp. Dưới đây là các quy định "xanh - sạch - đẹp" để đảm bảo quyền lợi cho cả bạn và chúng mình.
              </p>
            </div>
            {/* Last Updated & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-border-dark shadow-sm">
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <span className="material-symbols-outlined text-lg">schedule</span>
                <span>Cập nhật lần cuối: 24/05/2024</span>
              </div>
              <div className="relative w-full md:w-80 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors">search</span>
                </div>
                <input 
                  className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl leading-5 bg-background-light dark:bg-background-dark text-text-main dark:text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-sm transition-all" 
                  placeholder="Tìm kiếm nội dung (VD: Đổi trả)..." 
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Section 1: Intro */}
            <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-dark scroll-mt-32" id="intro">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">waving_hand</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-main dark:text-white mb-2">1. Giới thiệu chung</h2>
                  <p className="text-text-muted dark:text-gray-400 leading-relaxed">
                    Cảm ơn bạn đã ghé thăm Tiệm Quả Nghiệp. Khi bạn truy cập vào trang web của chúng tôi, bạn đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Quy định và Điều kiện sử dụng này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước.
                  </p>
                </div>
              </div>
              <div className="bg-background-light dark:bg-background-dark p-4 rounded-xl border-l-4 border-primary">
                <p className="italic text-sm text-text-main dark:text-gray-300">
                  "Nghiệp tụ vành môi - Ăn vô trôi hết." - Chúng mình cam kết mang lại những trải nghiệm trái cây tươi ngon nhất, nhưng cũng cần những quy tắc nhỏ để cuộc chơi công bằng.
                </p>
              </div>
            </section>

            {/* Section 2: User Responsibilities */}
            <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-dark scroll-mt-32" id="responsibilities">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">group_add</span>
                <h2 className="text-2xl font-bold text-text-main dark:text-white">2. Trách nhiệm người dùng</h2>
              </div>
              <div className="space-y-4 text-text-main dark:text-gray-300 leading-relaxed">
                <p>Khi sử dụng dịch vụ của Tiệm Quả Nghiệp, bạn cần đảm bảo:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
                    <span>Cung cấp thông tin đầy đủ và chính xác khi đăng ký tài khoản hoặc đặt hàng (Tên, SĐT, Địa chỉ nhận hàng).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
                    <span>Bảo mật thông tin tài khoản và mật khẩu của mình. Chúng tôi không chịu trách nhiệm cho các thiệt hại do lộ thông tin từ phía bạn.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
                    <span>Không sử dụng trang web vào mục đích trái pháp luật hoặc gây rối loạn hoạt động kinh doanh của Tiệm.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Store Rights */}
            <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-dark scroll-mt-32" id="store-rights">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                <h2 className="text-2xl font-bold text-text-main dark:text-white">3. Quyền lợi & Trách nhiệm cửa hàng</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background-light dark:bg-background-dark p-5 rounded-2xl">
                  <h3 className="font-bold text-lg mb-2 text-primary">Cam kết chất lượng</h3>
                  <p className="text-sm text-text-main dark:text-gray-300">
                    Chúng tôi đảm bảo cung cấp trái cây tươi, sạch, rõ nguồn gốc xuất xứ. Hình ảnh sản phẩm trên website là hình ảnh thực tế hoặc minh họa sát nhất với sản phẩm.
                  </p>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-5 rounded-2xl">
                  <h3 className="font-bold text-lg mb-2 text-primary">Quyền từ chối</h3>
                  <p className="text-sm text-text-main dark:text-gray-300">
                    Tiệm có quyền từ chối hoặc hủy đơn hàng trong trường hợp không liên lạc được với khách hàng, thông tin sai lệch, hoặc sản phẩm hết hàng đột xuất.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Ordering & Payment */}
            <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-dark scroll-mt-32" id="ordering">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">shopping_cart_checkout</span>
                <h2 className="text-2xl font-bold text-text-main dark:text-white">4. Đặt hàng & Thanh toán</h2>
              </div>
              <div className="space-y-4 text-text-main dark:text-gray-300">
                <p>Khách hàng có thể đặt hàng trực tiếp qua website, fanpage hoặc hotline. Chúng tôi hỗ trợ các phương thức thanh toán sau:</p>
                <div className="flex flex-wrap gap-3 my-4">
                  <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm border border-green-100">COD (Thanh toán khi nhận hàng)</span>
                  <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm border border-green-100">Chuyển khoản ngân hàng</span>
                  <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm border border-green-100">Ví điện tử (Momo, ZaloPay)</span>
                </div>
                <p className="text-sm text-text-muted italic">*Lưu ý: Đối với các đơn hàng giá trị trên 2.000.000đ, quý khách vui lòng chuyển khoản cọc trước 30%.</p>
              </div>
            </section>

            {/* Section 5: Shipping */}
            <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-dark scroll-mt-32" id="shipping">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                <h2 className="text-2xl font-bold text-text-main dark:text-white">5. Vận chuyển & Giao nhận</h2>
              </div>
              <div className="relative rounded-xl overflow-hidden mb-6 h-48 w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 flex items-center px-8">
                  <p className="text-white text-lg font-medium max-w-md">Giao hàng hỏa tốc trong 2h nội thành để đảm bảo độ tươi ngon.</p>
                </div>
                {/* Abstract map background description */}
                <div 
                  className="w-full h-full bg-cover bg-center" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDfMHOqTw7fK2C0irbSIvLbfsaZxTWv91DZ0BNVOZcdNWrNHIeTUPzdWxrQHDsYfgDdIfFBNcRk4VlkpY9bov20GiGvUJO3OwcwHhra8lDV-JyXR37g2A849u1_vOkv9OGTyDMSYpDhTQAPZJT117EgUdPkLYxLmQje27spngzngn-Nnlj5eRBlGvcvn7JG8Jd0RM7yT7kBApOVZqysyrU5Zjp7TEjgMn1kJt4mgCl4Gz4N929Xsqpjad0a1I4ruLG4beb6rGv0rJK5")'}}
                ></div>
              </div>
              <div className="space-y-3 text-text-main dark:text-gray-300">
                <p><strong>Phí vận chuyển:</strong> Tính theo khoảng cách thực tế từ cửa hàng đến địa chỉ nhận (App Ahamove/Grab).</p>
                <p><strong>Kiểm tra hàng:</strong> Quý khách vui lòng kiểm tra kỹ tình trạng trái cây (dập, nát, hỏng) ngay khi nhận hàng từ shipper. Tiệm sẽ không giải quyết các khiếu nại về ngoại quan sau khi shipper đã rời đi.</p>
              </div>
            </section>

            {/* Section 6: Refunds */}
            <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-dark scroll-mt-32 border-l-8 border-l-primary" id="refunds">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">assignment_return</span>
                <h2 className="text-2xl font-bold text-text-main dark:text-white">6. Đổi trả & Hoàn tiền</h2>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl mb-4">
                <p className="text-orange-800 dark:text-orange-200 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined">warning</span>
                  Lưu ý quan trọng: Trái cây là hàng tươi sống, dễ hư hỏng.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-text-main dark:text-gray-300 ml-2">
                <li><strong>Thời gian khiếu nại:</strong> Trong vòng 24h kể từ khi nhận hàng.</li>
                <li><strong>Điều kiện đổi trả:</strong> Trái cây bị hư hỏng bên trong (sượng, thối, không ăn được) mà không thể phát hiện bằng mắt thường khi nhận.</li>
                <li><strong>Quy trình:</strong> Chụp ảnh/quay video sản phẩm lỗi gửi qua Fanpage/Zalo. Tiệm sẽ bù 1-1 hoặc hoàn tiền tương ứng giá trị phần hư hỏng.</li>
                <li><strong>Không áp dụng:</strong> Đổi trả vì lý do "không hợp khẩu vị" (chua, ngọt tùy cảm nhận) hoặc bảo quản sai cách.</li>
              </ul>
            </section>

            {/* Section 7: Contact */}
            <section className="bg-surface-light dark:bg-surface-dark p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-dark scroll-mt-32" id="contact">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">contact_support</span>
                <h2 className="text-2xl font-bold text-text-main dark:text-white">7. Liên hệ & Hỗ trợ</h2>
              </div>
              <p className="mb-6 text-text-main dark:text-gray-300">Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ với chúng tôi:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <a className="flex flex-col items-center justify-center p-6 bg-background-light dark:bg-background-dark rounded-xl hover:shadow-md transition-shadow text-center" href="#">
                  <span className="material-symbols-outlined text-primary text-3xl mb-2">call</span>
                  <span className="font-bold text-text-main dark:text-white">Hotline</span>
                  <span className="text-sm text-text-muted">1900 8888</span>
                </a>
                <a className="flex flex-col items-center justify-center p-6 bg-background-light dark:bg-background-dark rounded-xl hover:shadow-md transition-shadow text-center" href="#">
                  <span className="material-symbols-outlined text-primary text-3xl mb-2">mail</span>
                  <span className="font-bold text-text-main dark:text-white">Email</span>
                  <span className="text-sm text-text-muted">cs@tiemquanghiep.com</span>
                </a>
                <a className="flex flex-col items-center justify-center p-6 bg-background-light dark:bg-background-dark rounded-xl hover:shadow-md transition-shadow text-center" href="#">
                  <span className="material-symbols-outlined text-primary text-3xl mb-2">location_on</span>
                  <span className="font-bold text-text-main dark:text-white">Cửa hàng</span>
                  <span className="text-sm text-text-muted">Quận 1, TP.HCM</span>
                </a>
              </div>
            </section>
          </div>

          {/* Footer Call to Action */}
          <div className="mt-12 text-center border-t border-gray-200 dark:border-border-dark pt-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-700 mb-4">
              "Nghiệp tụ vành môi - Ăn vô trôi hết"
            </h3>
            <p className="text-text-muted mb-8">Cảm ơn bạn đã tin tưởng và đồng hành cùng Tiệm Quả Nghiệp!</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => onNavigate(Page.PRODUCT_LIST)}
                className="bg-primary hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/40 transition-all transform hover:-translate-y-1"
              >
                Mua Sắm Ngay
              </button>
              <button 
                onClick={() => onNavigate(Page.HOME)}
                className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:border-primary text-text-main dark:text-white font-bold py-3 px-8 rounded-full shadow-sm transition-all"
              >
                Về Trang Chủ
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-border-dark p-3 rounded-full shadow-lg hover:shadow-xl hover:text-primary transition-all group z-40"
      >
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary">arrow_upward</span>
      </button>
    </div>
  );
};

export default Terms;