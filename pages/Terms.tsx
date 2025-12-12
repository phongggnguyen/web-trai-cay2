import React from 'react';
import { Page } from '../types';

interface TermsProps {
  onNavigate: (page: Page) => void;
  type: 'TERMS' | 'PRIVACY';
}

const Terms: React.FC<TermsProps> = ({ onNavigate, type }) => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-10">
      <div className="rounded-2xl border border-border-color bg-surface-light p-8 dark:border-border-dark dark:bg-surface-dark md:p-12">
        <h1 className="mb-8 text-3xl font-black text-text-main dark:text-white">
          {type === 'TERMS' ? 'Điều Khoản Dịch Vụ' : 'Chính Sách Bảo Mật'}
        </h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-gray-500 dark:text-gray-400">
            Cập nhật lần cuối: 20/05/2024
          </p>
          
          <div className="mt-8 space-y-6">
            <section>
              <h3 className="mb-3 text-xl font-bold text-text-main dark:text-white">1. Giới thiệu chung</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chào mừng bạn đến với Tiệm Quả Nghiệp. Khi truy cập website của chúng tôi, bạn đồng ý với các điều khoản này. Website này thuộc quyền sở hữu và quản lý của Công ty TNHH MTV Giải Nghiệp.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-text-main dark:text-white">2. Quy định sử dụng</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bạn cam kết sử dụng dịch vụ của chúng tôi cho các mục đích hợp pháp. Nghiêm cấm mọi hành vi phá hoại, gây ảnh hưởng đến hệ thống hoặc uy tín của Tiệm.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-bold text-text-main dark:text-white">3. Chính sách đổi trả</h3>
              <p className="text-gray-600 dark:text-gray-300">
                - Đổi trả miễn phí trong vòng 24h nếu sản phẩm bị dập, hỏng do vận chuyển.<br/>
                - Hoàn tiền 100% nếu phát hiện trái cây kém chất lượng, không đúng nguồn gốc.<br/>
                - Vui lòng quay video khi mở hàng để được hỗ trợ nhanh nhất.
              </p>
            </section>

             <section>
              <h3 className="mb-3 text-xl font-bold text-text-main dark:text-white">4. Bảo mật thông tin</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. Thông tin chỉ được sử dụng để xử lý đơn hàng và gửi các thông tin khuyến mãi (nếu bạn đăng ký).
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button onClick={() => onNavigate(Page.HOME)} className="rounded-full bg-primary px-8 py-3 font-bold text-text-main transition-transform hover:scale-105">
            Đã hiểu & Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;