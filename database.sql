-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categories (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  image_url text,
  description text,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.order_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  product_id bigint,
  product_name text NOT NULL,
  product_image text,
  quantity integer NOT NULL,
  price numeric NOT NULL,
  unit text,
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id uuid DEFAULT auth.uid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  shipping_address text NOT NULL,
  shipping_city text,
  shipping_district text,
  payment_method text NOT NULL,
  shipping_method text NOT NULL,
  shipping_fee numeric NOT NULL,
  total_amount numeric NOT NULL,
  status USER-DEFINED DEFAULT 'pending'::order_status,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.products (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  price numeric NOT NULL,
  original_price numeric,
  image_url text NOT NULL,
  unit text DEFAULT 'kg'::text,
  stock integer DEFAULT 100,
  is_best_seller boolean DEFAULT false,
  tags ARRAY,
  category_id bigint,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text,
  phone_number text,
  address text,
  avatar_url text,
  updated_at timestamp with time zone,
  role text DEFAULT 'customer'::text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id bigint NOT NULL,
  order_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT reviews_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE,
  CONSTRAINT reviews_user_product_order_unique UNIQUE (user_id, product_id, order_id)
);
