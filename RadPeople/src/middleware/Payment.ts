// RadPeople/src/middleware/Payment.ts
import axios from 'axios';
import { CartItem } from '../contexts/CartContext';
import { ShippingInfo } from '../components/ShippingInformationForm';

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
 * Creates a Stripe payment intent for the current checkout session.
 * 
 * @param cartItems - Array of cart items to be purchased.
 * @param checkoutToken - Token generated from cart validation (prevents tampering).
 * @returns An object containing the Stripe payment intent client secret and paymentIntentId.
 * 
 * This function is called when the checkout page loads to initialize the payment process.
 * The client secret is used by Stripe Elements on the frontend to securely collect payment details.
 */
export const createPaymentIntent = async (
  cartItems: CartItem[],
  checkoutToken: string
): Promise<{ clientSecret: string, paymentIntentId: string }> => {
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

/**
 * Updates an existing Stripe payment intent with the latest shipping information.
 * 
 * @param shipping - The user's shipping information (name, address, etc).
 * @param paymentIntentId - The ID of the payment intent to update.
 * @returns The updated payment intent data (structure may vary).
 * 
 * This function is called after validating shipping fields and before confirming payment.
 * It ensures the payment intent reflects the latest shipping details for compliance and receipts.
 */
export const updatePaymentIntent = async(
  shipping: ShippingInfo,
  paymentIntentId: string | null
): Promise<{ something: any }> => {
  try {
    const response = await api.post('/api/payment/update-intent', {
      shipping: shipping,
      paymentIntentId: paymentIntentId,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating payment intent:', error);
    throw error;
  }
}