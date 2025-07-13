import React, { useRef, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import type { ShippingInfo } from './ShippingInformationForm';
import { updatePaymentIntent } from '../middleware/Payment';

const BLUE_COLOR = '#1404FB';

interface CheckoutPayButtonProps {
  shipping: ShippingInfo;
  processing: boolean;
  setProcessing: (b: boolean) => void;
  setError: (e: string | null) => void;
  setSuccess: (b: boolean) => void;
  clientSecret: string;
  paymentIntentId: string | null;
  setFieldErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof ShippingInfo, string>>>>;
  setPaymentError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function validateShipping(shipping: ShippingInfo) {
  const errors: Partial<Record<keyof ShippingInfo, string>> = {};
  if (!shipping.name) errors.name = "Name is required.";
  if (!shipping.email) errors.email = "Email is required.";
  if (!shipping.address1) errors.address1 = "Address is required.";
  if (!shipping.city) errors.city = "City is required.";
  if (!shipping.state) errors.state = "State is required.";
  if (!shipping.zip) errors.zip = "ZIP is required.";
  // country is always US, so skip
  return errors;
}

const CheckoutPayButton: React.FC<CheckoutPayButtonProps> = ({
  shipping, processing, setProcessing, setError, setSuccess, clientSecret, paymentIntentId, setFieldErrors, setPaymentError
}) => {
  const [pressed, setPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  // Press button effects
  const handleMouseDown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPressed(true);
  };

  const handleMouseUp = () => {
    timeoutRef.current = setTimeout(() => {
      setPressed(false);
    }, 200); // 200ms, adjust as desired
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPressed(false);
  };

  const handleSubmit = async () => {
    setError(null);
    setPaymentError(null);

    // 1. Validate shipping fields
    const errors = validateShipping(shipping);
    setFieldErrors(errors);

    const hasShippingErrors = Object.keys(errors).length > 0;


    // 2. Submit PaymentElement first (required for deferred payment methods)
    if (elements) {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPaymentError(submitError.message || 'Payment details are incomplete.');
        setProcessing(false);
        return;
      }
    }

    if (hasShippingErrors) {
      setProcessing(false);
      return;
    }

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      setProcessing(false);
      return;
    }

    setProcessing(true);

    // 3. Only update payment intent if no errors
    try {
      await updatePaymentIntent(shipping, paymentIntentId);
    } catch (err) {
      setError('Failed to update payment intent.');
      setProcessing(false);
      return;
    }
  
    // 3. Confirm payment
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.origin + '/checkout',
      },
      redirect: 'if_required',
    });
  
    if (result.error) {
      setPaymentError(result.error.message || 'Payment failed');
      setProcessing(false);
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      setSuccess(true);
      setProcessing(false);
    } else {
      setProcessing(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={processing}
      style={{
        width: '100%',
        background: BLUE_COLOR,
        color: '#fff',
        fontWeight: 600,
        fontSize: 16,
        border: 'none',
        borderRadius: 0,
        padding: '12px 0',
        marginTop: 24,
        marginBottom: 50,
        cursor: processing ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s, opacity 0.2s',
        outline: 'none',
        opacity: pressed ? 0.7 : 1
      }}
    >
      {processing ? 'Processing...' : 'Pay Now'}
    </button>
  );
};

export default CheckoutPayButton;