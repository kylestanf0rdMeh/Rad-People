// RadPeople/src/middleware/Payment.ts
import axios from 'axios';
import { CartItem } from '../contexts/CartContext';

// Get API URL from environment variables
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:2000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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