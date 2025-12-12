export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  tag?: string;
  tagColor?: string; // 'red' | 'primary' | 'orange'
  category?: string;
  rating?: number;
  reviews?: number;
  origin?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  views: string;
}

// Context Types
export interface GlobalState {
  cartItems: CartItem[];
  isDark: boolean;
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleTheme: () => void;
  cartCount: number;
}

export enum Page {
  HOME = 'HOME',
  PRODUCT_LIST = 'PRODUCT_LIST',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  ORDER_SUCCESS = 'ORDER_SUCCESS',
  LOGIN = 'LOGIN',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  BLOG = 'BLOG',
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY',
  ADMIN = 'ADMIN'
}