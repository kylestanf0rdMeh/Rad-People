import React from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import type { ShippingInfo } from './ShippingInformationForm';

const BLUE_COLOR = '#1404FB';

interface CheckoutPayButtonProps {
  shipping: ShippingInfo;
  processing: boolean;
  setProcessing: (b: boolean) => void;
  setError: (e: string | null) => void;
  setSuccess: (b: boolean) => void;
}

const CheckoutPayButton: React.FC<CheckoutPayButtonProps> = ({
  shipping, processing, setProcessing, setError, setSuccess
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      return;
    }

    if (!shipping.name || !shipping.address1 || !shipping.city || !shipping.state || !shipping.zip || !shipping.email) {
      setError('Please fill out all required shipping fields.');
      return;
    }

    setProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        shipping: {
          name: shipping.name,
          address: {
            line1: shipping.address1,
            line2: shipping.address2,
            city: shipping.city,
            state: shipping.state,
            postal_code: shipping.zip,
            country: shipping.country,
          },
        },
        receipt_email: shipping.email,
      },
      redirect: 'if_required',
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed');
      setProcessing(false);
    } else {
      setSuccess(true);
      setProcessing(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={processing}
      style={{
        width: '100%',
        background: BLUE_COLOR, // Use your blue color
        color: '#fff',
        fontWeight: 600,
        fontSize: 16,
        border: 'none',
        borderRadius: 0,
        padding: '12px 0',
        marginTop: 24,
        marginBottom: 50,
        cursor: processing ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
      }}
    >
      {processing ? 'Processing...' : 'Pay Now'}
    </button>
  );
};

export default CheckoutPayButton;