import React from 'react';
import CheckoutPayButton from './PaymentButton';
import type { ShippingInfo } from './ShippingInformationForm';

interface CheckoutCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface CheckoutCartListProps {
  items: CheckoutCartItem[];
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

const SHIPPING_COST = 5.0;
const AUSTIN_TEXAS_TAX_RATE = 0.0825;

function calculateTaxes(items: CheckoutCartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return subtotal * AUSTIN_TEXAS_TAX_RATE;
}

const CheckoutCartList: React.FC<CheckoutCartListProps> = ({
  items,
  shipping,
  processing,
  setProcessing,
  setError,
  setSuccess,
  clientSecret,
  paymentIntentId,
  setFieldErrors,
  setPaymentError
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedTaxes = calculateTaxes(items);
  const total = subtotal + SHIPPING_COST + estimatedTaxes;

  return (
    <div style={{ width: '100%' }}>
    <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: '#222' }}>Cart Overview</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              gap: 16,
              paddingBottom: 12,
              alignItems: 'center',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: 60,
                height: 80,
                background: '#fff',
                border: '1px solid #eee',
                display: 'block',
                margin: '0 auto',
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 16, color: '#222' }}>{item.name}</div>
                <div style={{ fontWeight: 500, fontSize: 15, color: '#222', minWidth: 60, textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>Size: {item.size.toUpperCase()}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>Qty: {item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 20,
        fontWeight: 500,
        fontSize:  12,
        color: 'black',
        paddingTop: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span>Shipping</span>
          <span>${SHIPPING_COST.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span>Estimated Taxes</span>
          <span>${estimatedTaxes.toFixed(2)}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 18,
          marginTop: 16,
          paddingTop: 12,
        }}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <CheckoutPayButton
        shipping={shipping}
        processing={processing}
        setProcessing={setProcessing}
        setError={setError}
        setSuccess={setSuccess}
        clientSecret={clientSecret}
        paymentIntentId={paymentIntentId}
        setFieldErrors={setFieldErrors}
        setPaymentError={setPaymentError}
      />
    </div>
  );
};

export default CheckoutCartList;