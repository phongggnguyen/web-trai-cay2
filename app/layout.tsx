import React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { GlobalProvider } from '../context/GlobalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-display',
  display: 'swap',
});

const fontBody = Manrope({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tiệm Quả Nghiệp | Sống Xanh Ăn Lành',
    template: '%s | Tiệm Quả Nghiệp',
  },
  description: 'Cửa hàng trái cây tươi nhập khẩu và đặc sản Việt Nam. Nghiệp tụ vành môi, ăn vô trôi hết.',
  keywords: ['trái cây', 'hoa quả tươi', 'trái cây nhập khẩu', 'đặc sản Việt Nam', 'trái cây sạch', 'mua trái cây online'],
  authors: [{ name: 'Tiệm Quả Nghiệp' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Tiệm Quả Nghiệp',
    title: 'Tiệm Quả Nghiệp | Sống Xanh Ăn Lành',
    description: 'Cửa hàng trái cây tươi nhập khẩu và đặc sản Việt Nam',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${fontBody.variable} ${fontDisplay.variable} font-body bg-background-light dark:bg-background-dark text-text-main dark:text-white antialiased selection:bg-primary selection:text-black`}>
        <GlobalProvider>
          <div className="flex min-h-screen flex-col transition-colors duration-200">
            <Header />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--color-surface-light)',
                  color: 'var(--color-text-main)',
                },
                success: {
                  iconTheme: {
                    primary: '#4CDF20',
                    secondary: '#0d160b',
                  },
                },
              }}
            />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
