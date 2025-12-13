/**
 * Utility functions for common operations
 */

/**
 * Formats a number as Vietnamese currency (VND)
 * @param price - The price to format
 * @returns Formatted price string with currency symbol
 * @example formatPrice(100000) // "100.000đ"
 */
export const formatPrice = (price: number): string => {
    return `${price.toLocaleString('vi-VN')}đ`;
};

/**
 * Calculates the total price of cart items
 * @param items - Array of cart items
 * @returns Total price
 */
export const calculateCartTotal = (items: { price: number; quantity: number }[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Safely parses JSON from localStorage
 * @param key - localStorage key
 * @param fallback - Default value if parsing fails
 * @returns Parsed value or fallback
 */
export const safeJSONParse = <T>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;

    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return fallback;
    }
};

/**
 * Safely stringifies and saves to localStorage
 * @param key - localStorage key
 * @param value - Value to save
 */
export const safeJSONStringify = <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
    }
};

/**
 * Generates a unique ID
 * @returns Unique identifier string
 */
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Truncates text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};

/**
 * Debounce function to limit execution rate
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Validates Vietnamese phone number format
 * @param phone - Phone number to validate
 * @returns True if valid
 */
export const isValidPhone = (phone: string): boolean => {
    return /^0\d{9}$/.test(phone);
};

/**
 * Validates email format
 * @param email - Email to validate
 * @returns True if valid
 */
export const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
