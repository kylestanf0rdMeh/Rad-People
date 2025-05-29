// RadPeople/src/pages/Checkout.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../middleware/Payment';
import CheckoutForm from '../components/CheckoutForm';

// Your Stripe publishable key
const stripePromise = loadStripe('pk_test_51QG9NlKYMzfsK7Ec0EIgWAal2Wsk7WwMxcFXY4K6uNWtDsfaomfOqngDPhtOMFvvS4x1yUA9yvrpJredIp0YQbOB008x2GCN2a');

const Checkout: React.FC = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get checkoutToken from navigation state
  const checkoutToken = (location.state as any)?.checkoutToken;

  useEffect(() => {
    if (!checkoutToken) {
      setError('No checkout token found. Please return to cart.');
      setLoading(false);
      return;
    }
  
    // You may need to get cartItems from context or navigation state
    const cartItems = (location.state as any)?.cartItems || [];
  
    createPaymentIntent(cartItems, checkoutToken)
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError('Failed to initialize payment.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to initialize payment.');
        setLoading(false);
      });
  }, [checkoutToken]);

  if (loading) return <div>Loading payment...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!clientSecret) return null;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Checkout</h2>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;