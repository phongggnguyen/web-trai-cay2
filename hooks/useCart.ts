import { useCallback, useMemo } from 'react';
import { useGlobal } from '../context/GlobalContext';
import type { Product, CartItem, CartPricing } from '../types';

/**
 * Custom hook for cart operations
 * Provides a clean API for cart management with memoized values
 * 
 * @returns Cart state and operations
 * 
 * @example
 * const { items, totalItems, totalPrice, addItem, removeItem } = useCart();
 */
export function useCart() {
    const context = useGlobal();

    /**
     * Add product to cart with optional quantity
     */
    const addItem = useCallback((product: Product, quantity: number = 1) => {
        context.addToCart(product, quantity);
    }, [context]);

    /**
     * Update quantity of a cart item
     */
    const updateItem = useCallback((productId: string, quantity: number) => {
        context.updateQuantity(productId, quantity);
    }, [context]);

    /**
     * Remove item from cart
     */
    const removeItem = useCallback((productId: string) => {
        context.removeFromCart(productId);
    }, [context]);

    /**
     * Clear entire cart
     */
    const clearAll = useCallback(() => {
        context.clearCart();
    }, [context]);

    /**
     * Calculate subtotal (before tax and shipping)
     */
    const subtotal = useMemo(() => {
        return context.cartItems.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
    }, [context.cartItems]);

    /**
     * Calculate estimated tax (10%)
     */
    const tax = useMemo(() => {
        return subtotal * 0.1;
    }, [subtotal]);

    /**
     * Calculate shipping cost
     * Free shipping over 500,000 VND
     */
    const shipping = useMemo(() => {
        if (subtotal === 0) return 0;
        if (subtotal >= 500000) return 0;
        return 30000; // 30k VND flat rate
    }, [subtotal]);

    /**
     * Calculate total price including tax and shipping
     */
    const total = useMemo(() => {
        return subtotal + tax + shipping;
    }, [subtotal, tax, shipping]);

    /**
     * Complete pricing breakdown
     */
    const pricing: CartPricing = useMemo(() => ({
        subtotal,
        tax,
        shipping,
        discount: 0, // TODO: Implement discount logic
        total,
    }), [subtotal, tax, shipping, total]);

    /**
     * Check if cart is empty
     */
    const isEmpty = useMemo(() => {
        return context.cartItems.length === 0;
    }, [context.cartItems]);

    /**
     * Check if product is in cart
     */
    const isInCart = useCallback((productId: string): boolean => {
        return context.cartItems.some(item => item.id === productId);
    }, [context.cartItems]);

    /**
     * Get quantity of specific product in cart
     */
    const getItemQuantity = useCallback((productId: string): number => {
        const item = context.cartItems.find(item => item.id === productId);
        return item?.quantity || 0;
    }, [context.cartItems]);

    return {
        // State
        items: context.cartItems,
        totalItems: context.cartCount,
        isEmpty,

        // Pricing
        subtotal,
        tax,
        shipping,
        total,
        pricing,

        // Operations
        addItem,
        updateItem,
        removeItem,
        clearAll,

        // Helpers
        isInCart,
        getItemQuantity,
    };
}
