'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { CartItem, Product, GlobalState } from '../types';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

// Extend GlobalState to include user
interface GlobalContextType extends GlobalState {
  user: User | null;
  logout: () => Promise<void>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }
      }
    }
  }, []);

  // Load theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && isSystemDark)) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Sync theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Persist cart changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && cartItems.length >= 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Auth Listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ!`, {
      duration: 2500,
      position: 'bottom-center',
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    toast.success('Đã đăng xuất thành công');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = React.useMemo(() => ({
    cartItems,
    isDark,
    user,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleTheme,
    logout,
    cartCount
  }), [cartItems, isDark, user, cartCount, addToCart, updateQuantity, removeFromCart, clearCart, toggleTheme, logout]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
