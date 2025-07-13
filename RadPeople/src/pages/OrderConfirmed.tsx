import React, { useEffect } from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { ShippingInfo } from '../components/ShippingInformationForm';
import { storeOrder } from '../middleware/Product';

import NFUltraRegular from '../assets/NFUltra-Regular.otf'; // adjust path if needed

const nfultraFont = `
    @font-face {
        font-family: 'NFUltra';
        src: url(${NFUltraRegular}) format('opentype');
        font-weight: normal;
        font-style: normal;
    }
`;

const OrderConfirmed: React.FC = () => {
    const { clearCart, items } = useCart();
    const data = JSON.parse(sessionStorage.getItem('orderConfirmedData') || '{}');
    const cartItems: CartItem[] = data.cartItems || [];
    const shipping: ShippingInfo = data.shipping;

    

    useEffect(() => {
        // If no cart items or shipping info, redirect
        if ((!cartItems || cartItems.length === 0) && (!items || items.length === 0)) {
            window.location.href = '/';
            return;
        }

        // Only store order if not already stored in this session
        if (sessionStorage.getItem('orderStored') === 'true') {
            clearCart();
            return;
        }

        const storeOrderInMongo = async () => {
            try {
                await storeOrder({
                    cartItems,
                    shipping,
                    timestamp: new Date().toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                });
                sessionStorage.setItem('orderStored', 'true');
            } catch (e) {
                console.error('Error storing Order to Mongo: ', e);
            }
            clearCart();
        };

        storeOrderInMongo();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // This will run after the DOM and content are painted
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100); // 50ms is usually enough, you can try 100 if needed
    }, []);

    return (
        <div
            style={{
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 64,
            }}
        >
            <style>{nfultraFont}</style>
            <div
                style={{
                    width: '95vw',
                    maxWidth: 480,
                    background: '#fff',
                    borderRadius: 8,
                    padding: 16,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 32,
                    boxSizing: 'border-box',
                    alignItems: 'center',
                }}
            >
                <h1
                    style={{
                        fontFamily: 'NFUltra, system-ui, sans-serif',
                        fontWeight: 700,
                        fontSize: 32,
                        letterSpacing: 2,
                        textAlign: 'center',
                        marginBottom: 24,
                        color: '#1404FB',
                    }}
                >
                    ORDER CONFIRMED
                </h1>
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: '#222', textAlign: 'center' }}>
                        Your Items
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {cartItems.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#888' }}>Your cart is empty.</div>
                        ) : (
                            cartItems.map(item => (
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
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmed;