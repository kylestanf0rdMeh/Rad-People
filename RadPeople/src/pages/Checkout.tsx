import React, { useEffect, useState } from 'react';
import type { Appearance } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../middleware/Payment';
import CheckoutCartList from '../components/CheckoutCartList';
import ShippingInformationForm, { ShippingInfo } from '../components/ShippingInformationForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    borderRadius: '0px',
    fontFamily: 'system-ui, sans-serif',
    fontWeightNormal: '500',
    fontWeightBold: '600',
    colorBackground: '#fafbfc',
  },
  rules: {
    '.Input:focus': {
      boxShadow: 'none',
      borderColor: '#222',
    },
    '.Input': {
      boxShadow: 'none',
      borderColor: '#d1d5db',
    },
  },
};

const Checkout: React.FC = () => {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    email: '',
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const checkoutToken = (location.state as any)?.checkoutToken;
  const cartItems = (location.state as any)?.cartItems || [];

  useEffect(() => {
    if (!checkoutToken) {
      setError(`No checkout token found. Please return to cart.`);
      setLoading(false);
      return;
    }
    if (clientSecret) return;

    createPaymentIntent(cartItems, checkoutToken)
      .then(data => {
        if (data.clientSecret && !clientSecret) {
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
  }, [checkoutToken, clientSecret]);

  if (loading) return <div>Loading payment...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!clientSecret) return null;
  if (success) return <div>Payment successful! Thank you for your order.</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '95vw',           // Responsive width for mobile
            maxWidth: 480,           // Desktop/tablet max width
            background: '#fff',
            borderRadius: 8,
            padding: 16,             // Slightly smaller padding for mobile
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            boxSizing: 'border-box',
          }}
        >
          <ShippingInformationForm
            shipping={shipping}
            onChange={(field, value) => setShipping(prev => ({ ...prev, [field]: value }))}
          />
          <div>
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, color: '#222' }}>Card Details</h3>
            <PaymentElement />
          </div>
          <CheckoutCartList
            items={cartItems}
            shipping={shipping}
            processing={processing}
            setProcessing={setProcessing}
            setError={setError}
            setSuccess={setSuccess}
          />
          {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginTop: 10 }}>Order submitted!</div>}
        </div>
        {/* Responsive font size for Stripe and native inputs */}
        <style>
          {`
            @media (max-width: 762px) {
              .StripeElement,
              input, select {
                font-size: 16px !important;
              }
            }
          `}
        </style>
      </div>
    </Elements>
  );
};

export default Checkout;