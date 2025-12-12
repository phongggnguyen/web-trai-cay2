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

export enum Page {
  HOME = 'HOME',
  PRODUCT_LIST = 'PRODUCT_LIST',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  ORDER_SUCCESS = 'ORDER_SUCCESS',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  BLOG = 'BLOG',
  LOGIN = 'LOGIN',
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY',
  ADMIN = 'ADMIN'
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