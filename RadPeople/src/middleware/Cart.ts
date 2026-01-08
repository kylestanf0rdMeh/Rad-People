import axios from 'axios';
import { CartItem } from '../contexts/CartContext';

// Get API URL from environment variables
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://localhost:6996';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Validates a single cart item with the backend
 * @param item The cart item to validate
 * @returns Validated item with server-provided price and validation signature
 */
export const validateCartItem = async (item: CartItem): Promise<{
  itemId: string;
  price: number;
  timestamp: number;
  signature: string;
}> => {
  try {
    const response = await api.post('/api/cart/validate-item', {
      itemId: item.id,
      productId: item.id.split('-')[0], // Assuming format is "{productId}-{size}"
      price: item.price,
      quantity: item.quantity,
      size: item.size,
    });

    return response.data;
  } catch (error) {
    console.error('Error validating cart item:', error);
    // For development, fall back to mock validation
    // if (import.meta.env.NODE_ENV !== 'production') {
    //   return mockValidatePrice(item);
    // }
    throw error;
  }
};

/**
 * Validates the entire cart before checkout
 * @param items Array of cart items to validate
 * @returns Validated cart with updated prices and signatures
 */
export const validateCart = async (items: CartItem[]): Promise<{
  validatedItems: Array<CartItem & { validation: { signature: string; timestamp: number } }>;
  totalPrice: number;
  checkoutToken: string;
}> => {
  try {
    const response = await api.post('/api/cart/validate', { items });
    return response.data;
  } catch (error) {
    console.error('Error validating cart:', error);
    // For development, fall back to mock validation
    if (import.meta.env.NODE_ENV !== 'production') {
      return mockValidateCart(items);
    }
    throw error;
  }
};

/**
 * Creates a payment intent for checkout
 * @param cartItems Array of cart items
 * @param checkoutToken Token from cart validation
 * @returns Stripe payment intent client secret
 */
export const createPaymentIntent = async (
  cartItems: CartItem[],
  checkoutToken: string
): Promise<{ clientSecret: string }> => {
  try {
    const response = await api.post('/api/payment/create-intent', {
      items: cartItems,
      checkoutToken,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Mock functions for development

/**
 * Mock validation function until we have a backend
 * @param item Cart item to validate
 * @returns Mock validation response
 */
export const mockValidatePrice = (item: CartItem) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        itemId: item.id,
        price: item.price * item.quantity,
        timestamp: Date.now(),
        signature: "mocksignature123"
      });
    }, 500);
  });
};

/**
 * Mock cart validation function for development
 * @param items Cart items to validate
 * @returns Mock cart validation response
 */
const mockValidateCart = (items: CartItem[]) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      const validatedItems = items.map(item => ({
        ...item,
        validation: {
          signature: "mockcartsignature456",
          timestamp: Date.now()
        }
      }));
      
      const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      resolve({
        validatedItems,
        totalPrice,
        checkoutToken: "mockcheckouttoken789"
      });
    }, 700);
  });
};