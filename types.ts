/**
 * Core Product Types
 * These types represent the domain models for the e-commerce platform
 */

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

/**
 * Represents a product available for purchase
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  tag?: string;
  tagColor?: 'red' | 'primary' | 'orange';
  category?: string;
  rating?: number;
  reviews?: number;
  origin?: string;
  description?: string;
  slug?: string;
  images?: string[];
  stock?: number;
  weight?: string;
  organic?: boolean;
}

/**
 * Represents a product in the shopping cart with quantity
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Cart pricing breakdown
 */
export interface CartPricing {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

/**
 * Shipping method options
 */
export type ShippingMethod = 'standard' | 'express' | 'same-day';

/**
 * Payment method options
 */
export type PaymentMethod = 'cod' | 'card' | 'qr' | 'wallet';

/**
 * Blog & Content Types
 */

/**
 * Represents a blog post article
 */
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  views: string;
  slug?: string;
  content?: string;
  author?: Author;
  publishedAt?: string;
  tags?: string[];
  readTime?: number; // in minutes
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

/**
 * Global State & Context Types
 */

/**
 * Global application state managed by Context API
 */
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

/**
 * Form & Validation Types
 */

/**
 * Customer information for checkout
 */
export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

/**
 * Shipping address details
 */
export interface ShippingAddress {
  street: string;
  ward?: string;
  district: string;
  city: string;
  zipCode?: string;
}

/**
 * Complete checkout form data
 */
export interface CheckoutFormData {
  customerInfo: CustomerInfo;
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  notes?: string;
}

/**
 * Order after successful checkout
 */
export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  shippingAddress: ShippingAddress;
  pricing: CartPricing;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipping'
  | 'delivered'
  | 'cancelled';

/**
 * API Response Types
 * Namespace for API-related types
 */
export namespace API {
  export interface Response<T> {
    data: T;
    message?: string;
    success: boolean;
  }

  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }

  export interface ErrorResponse {
    message: string;
    code: string;
    details?: Record<string, string[]>;
  }
}

/**
 * Utility Types
 */

/**
 * Makes specific properties required
 */
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Extract nullable properties
 */
export type Nullable<T> = T | null;

/**
 * Product with all required fields for display
 */
export type ProductDisplay = WithRequired<Product, 'category' | 'rating'>;

/**
 * Component Props Types
 */

/**
 * Common props for components that can be loading
 */
export interface LoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * Common props for error display
 */
export interface ErrorProps {
  error?: Error | string;
  onRetry?: () => void;
}