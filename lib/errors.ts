/**
 * Custom Error Classes
 * Provides structured error handling throughout the application
 */

/**
 * Base application error
 * All custom errors should extend this class
 */
export class AppError extends Error {
    constructor(
        message: string,
        public code: string = 'APP_ERROR',
        public statusCode: number = 500
    ) {
        super(message);
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            statusCode: this.statusCode,
        };
    }
}

/**
 * Validation error for form/data validation failures
 */
export class ValidationError extends AppError {
    constructor(
        message: string,
        public field?: string,
        public details?: Record<string, string[]>
    ) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    toJSON() {
        return {
            ...super.toJSON(),
            field: this.field,
            details: this.details,
        };
    }
}

/**
 * API error for failed API requests
 */
export class APIError extends AppError {
    constructor(
        message: string,
        public endpoint?: string,
        statusCode: number = 500
    ) {
        super(message, 'API_ERROR', statusCode);
        this.name = 'APIError';
        Object.setPrototypeOf(this, APIError.prototype);
    }

    toJSON() {
        return {
            ...super.toJSON(),
            endpoint: this.endpoint,
        };
    }
}

/**
 * Not found error for missing resources
 */
export class NotFoundError extends AppError {
    constructor(
        public resourceType: string,
        public resourceId?: string
    ) {
        super(
            resourceId
                ? `${resourceType} với ID "${resourceId}" không tìm thấy`
                : `${resourceType} không tìm thấy`,
            'NOT_FOUND',
            404
        );
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    toJSON() {
        return {
            ...super.toJSON(),
            resourceType: this.resourceType,
            resourceId: this.resourceId,
        };
    }
}

/**
 * Authentication error
 */
export class AuthenticationError extends AppError {
    constructor(message: string = 'Vui lòng đăng nhập để tiếp tục') {
        super(message, 'AUTHENTICATION_ERROR', 401);
        this.name = 'AuthenticationError';
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}

/**
 * Authorization error (forbidden)
 */
export class AuthorizationError extends AppError {
    constructor(message: string = 'Bạn không có quyền truy cập tài nguyên này') {
        super(message, 'AUTHORIZATION_ERROR', 403);
        this.name = 'AuthorizationError';
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
}

/**
 * Cart error for cart-related issues
 */
export class CartError extends AppError {
    constructor(message: string) {
        super(message, 'CART_ERROR', 400);
        this.name = 'CartError';
        Object.setPrototypeOf(this, CartError.prototype);
    }
}

/**
 * Payment error
 */
export class PaymentError extends AppError {
    constructor(
        message: string,
        public paymentMethod?: string,
        public transactionId?: string
    ) {
        super(message, 'PAYMENT_ERROR', 402);
        this.name = 'PaymentError';
        Object.setPrototypeOf(this, PaymentError.prototype);
    }

    toJSON() {
        return {
            ...super.toJSON(),
            paymentMethod: this.paymentMethod,
            transactionId: this.transactionId,
        };
    }
}

/**
 * Helper function to check if error is an instance of AppError
 */
export function isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
}

/**
 * Helper function to format error for display
 */
export function formatErrorMessage(error: unknown): string {
    if (isAppError(error)) {
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
}

/**
 * Helper function to handle error logging
 */
export function logError(error: unknown, context?: string): void {
    if (process.env.NODE_ENV === 'development') {
        console.error(
            `[Error${context ? ` - ${context}` : ''}]:`,
            isAppError(error) ? error.toJSON() : error
        );
    }

    // In production, send to error tracking service (e.g., Sentry)
    // Sentry.captureException(error);
}
