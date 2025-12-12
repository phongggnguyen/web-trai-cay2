import React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import { GlobalProvider } from '../context/GlobalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../index.css'; // Assuming Tailwind directives are here or in globals.css

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
  title: 'Tiệm Quả Nghiệp | Sống Xanh Ăn Lành',
  description: 'Cửa hàng trái cây tươi nhập khẩu và đặc sản Việt Nam. Nghiệp tụ vành môi, ăn vô trôi hết.',
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
        {/* Tailwind script for dev/demo purposes if local build not available */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    primary: "#4cdf20",
                    "primary-dark": "#3bc015",
                    "background-light": "#f9fbf8",
                    "background-dark": "#152111",
                    "surface-light": "#ffffff",
                    "surface-dark": "#1e2e19",
                    "text-main": "#111b0e",
                    "text-muted": "#609550",
                    "border-color": "#eaf3e8",
                    "border-dark": "#2a3f23",
                  },
                  fontFamily: {
                    display: ["Plus Jakarta Sans", "sans-serif"],
                    body: ["Manrope", "sans-serif"],
                  },
                  borderRadius: {
                    DEFAULT: "1rem",
                    lg: "1.5rem",
                    xl: "2rem",
                    "2xl": "3rem",
                  },
                },
              },
            }
          `
        }} />
      </head>
      <body className={`${fontBody.variable} ${fontDisplay.variable} font-body bg-background-light dark:bg-background-dark text-text-main dark:text-white antialiased selection:bg-primary selection:text-black`}>
        <GlobalProvider>
          <div className="flex min-h-screen flex-col transition-colors duration-200">
            <Header />
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