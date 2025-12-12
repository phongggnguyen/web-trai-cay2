import React, { useState } from 'react';
import { Page } from '../types';

interface AuthProps {
  onNavigate: (page: Page) => void;
}

const Auth: React.FC<AuthProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center p-4 md:p-8 bg-background-light dark:bg-background-dark">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-surface-light shadow-2xl dark:bg-surface-dark dark:shadow-none border border-border-color dark:border-border-dark">
        {/* Left Side: Image (Hidden on mobile) */}
        <div className="relative hidden w-1/2 lg:block">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPinBOZpe7w4KtiE6KjCRvkNhecbJW_rGRq08ACc9aLNTkKaLGvikTVy_0bl3YyDnDRfRJvnKsG-OD13TXA-5y0TDnNTSVaI3O8Ot92flzNlzNugK25cZ8JHEmKcva4zSAFW5Vc8tCXTieNF9WF7F0hxgOxHvxRyVlcwh0xa5amguJ8FiMQL1YYryCEPqy1BnlTfc2l0BdnvXrOSms-MbmWuJ3BVY5mAjI2Ue6_TvCsbM6BRw1ajGOBtGPZv1TaaebxBx_0md_Fqtr" 
            alt="Fruit Background" 
            className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12 text-white">
            <h2 className="mb-4 text-4xl font-black leading-tight">Nghiệp Tụ Vành Môi</h2>
            <p className="text-lg opacity-90 font-medium">Ăn trái cây tươi, cười tươi cả ngày. Đăng nhập ngay để tích điểm đổi quà.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-16">
          <div className="mb-8 text-center lg:text-left">
             <h2 className="text-3xl font-black text-text-main dark:text-white tracking-tight">
              {isLogin ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              {isLogin ? 'Nhập thông tin để tiếp tục hành trình "giải nghiệp".' : 'Gia nhập hội đồng nghiệp ngay hôm nay.'}
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onNavigate(Page.HOME); }}>
            {!isLogin && (
               <div className="space-y-2">
                <label className="text-sm font-bold text-text-main dark:text-gray-300">Họ và tên</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-3 text-gray-400">person</span>
                  <input 
                    type="text" 
                    className="w-full rounded-xl border border-gray-200 bg-background-light pl-11 pr-4 py-3 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-black/20 dark:text-white"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main dark:text-gray-300">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-gray-400">mail</span>
                <input 
                  type="email" 
                  className="w-full rounded-xl border border-gray-200 bg-background-light pl-11 pr-4 py-3 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-black/20 dark:text-white"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-text-main dark:text-gray-300">Mật khẩu</label>
                {isLogin && <a href="#" className="text-sm font-bold text-primary hover:underline">Quên mật khẩu?</a>}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-gray-400">lock</span>
                <input 
                  type="password" 
                  className="w-full rounded-xl border border-gray-200 bg-background-light pl-11 pr-4 py-3 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-black/20 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button className="mt-4 w-full rounded-xl bg-primary py-4 text-base font-bold text-text-main shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]">
              {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-surface-light px-4 text-gray-500 dark:bg-surface-dark">Hoặc tiếp tục với</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-bold text-text-main transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-surface-dark dark:text-white dark:hover:bg-black/20">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-bold text-text-main transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-surface-dark dark:text-white dark:hover:bg-black/20">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5" alt="Facebook" />
                Facebook
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-gray-500">
            {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="font-bold text-primary hover:underline"
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;