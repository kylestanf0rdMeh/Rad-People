import React from 'react';
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
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    setError(null);
    setPaymentError(null);

    // 1. Validate shipping fields
    const errors = validateShipping(shipping);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setProcessing(false);
      return; // Don't update intent or proceed
    }

    // 2. Submit PaymentElement first (required for deferred payment methods)
    if (elements) {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPaymentError(submitError.message || 'Payment details are incomplete.');
        setProcessing(false);
        return;
      }
    }

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      return;
    }

    if (!shipping.name || !shipping.address1 || !shipping.city || !shipping.state || !shipping.zip || !shipping.email) {
      setError('Please fill out all required shipping fields.');
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