import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Terms from './pages/Terms';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import { Page, Product, CartItem } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or localStorage in a real app
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate(Page.PRODUCT_DETAIL);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ!`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={handleNavigate} onProductClick={handleProductClick} />;
      case Page.PRODUCT_DETAIL:
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        ) : <Home onNavigate={handleNavigate} onProductClick={handleProductClick} />;
      case Page.PRODUCT_LIST:
        return <ProductList onNavigate={handleNavigate} onProductClick={handleProductClick} />;
      case Page.CART:
        return (
          <Cart 
            items={cartItems} 
            onUpdateQuantity={handleUpdateQuantity} 
            onRemove={handleRemoveFromCart}
            onNavigate={handleNavigate} 
          />
        );
      case Page.CHECKOUT:
        return (
          <Checkout 
            items={cartItems}
            onNavigate={handleNavigate}
            onClearCart={handleClearCart}
          />
        );
      case Page.ORDER_SUCCESS:
        return <OrderSuccess onNavigate={handleNavigate} />;
      case Page.LOGIN:
        return <Auth onNavigate={handleNavigate} />;
      case Page.ABOUT:
        return <About onNavigate={handleNavigate} />;
      case Page.CONTACT:
        return <Contact onNavigate={handleNavigate} />;
      case Page.BLOG:
        return <Blog onNavigate={handleNavigate} />;
      case Page.TERMS:
        return <Terms onNavigate={handleNavigate} type="TERMS" />;
      case Page.PRIVACY:
        return <Terms onNavigate={handleNavigate} type="PRIVACY" />;
      case Page.ADMIN:
        return <Admin onNavigate={handleNavigate} />;
      default:
        return (
           <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">construction</span>
            <h1 className="text-2xl font-bold text-text-main dark:text-white mb-2">Trang này đang bảo trì</h1>
            <p className="text-gray-500 mb-6">Xin lỗi vì sự bất tiện này. Chúng tôi sẽ quay lại sớm!</p>
            <button onClick={() => handleNavigate(Page.HOME)} className="text-primary font-bold hover:underline">Quay về trang chủ</button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark transition-colors duration-200">
      <Header 
        cartCount={cartCount} 
        onNavigate={handleNavigate} 
        activePage={currentPage}
        toggleTheme={toggleTheme}
        isDark={isDark}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;