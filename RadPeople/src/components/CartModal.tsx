import React, { useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CartContent, CartFooter, CartItemActions, CartItemContainer, CartItemDetails, CartItemHeader, CartItemImage, CartItemName, CartItemPrice, CartItemSize, CartItemsList, CartTitle, CartTotal, CheckoutButton, CloseButton, EmptyCartMessage, ModalContainer, ModalHeader, ModalOverlay, QuantityButton, QuantityControl, QuantityDisplay, RemoveButton } from '../styles/CartModalStyles';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { items, totalPrice, removeItem, updateQuantity, isValidating, validateCartForCheckout } = useCart();
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Handle quantity changes safely
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  // Handle checkout button click
  const handleCheckout = async () => {
    setCheckoutInProgress(true);
    setCheckoutError(null);
    
    try {
      // Validate the cart before proceeding to checkout
      const token = await validateCartForCheckout();
      
      if (token) {
        // Navigate to checkout page with the token
        navigate('/checkout', { state: { checkoutToken: token, cartItems: items } });
        onClose(); // Close the cart modal
      } else {
        setCheckoutError('Unable to proceed to checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError('An error occurred during checkout. Please try again.');
    } finally {
      setCheckoutInProgress(false);
    }
  };

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContainer ref={modalRef} isOpen={isOpen}>
        <ModalHeader>
          <CartTitle>CART</CartTitle>
          <CloseButton onClick={onClose}>
            <IoCloseOutline size={24} />
          </CloseButton>
        </ModalHeader>
        
        <CartContent>
          {items.length === 0 ? (
            <EmptyCartMessage>YOUR CART IS EMPTY</EmptyCartMessage>
          ) : (
            <CartItemsList>
              {items.map((item) => (
                <CartItemContainer key={item.id}>
                  <CartItemImage src={item.image} alt={item.name} />
                  <CartItemDetails>
                    <CartItemHeader>
                      <CartItemName>{item.name}</CartItemName>
                      <CartItemPrice>${item.price}</CartItemPrice>
                    </CartItemHeader>
                    <CartItemSize>Size: {item.size}</CartItemSize>
                    
                    <CartItemActions>
                      <QuantityControl>
                        <QuantityButton 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isValidating}
                        >
                          -
                        </QuantityButton>
                        <QuantityDisplay>
                          {isValidating ? '...' : item.quantity}
                        </QuantityDisplay>
                        <QuantityButton 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={isValidating}
                        >
                          +
                        </QuantityButton>
                      </QuantityControl>
                      <RemoveButton
                        onClick={() => removeItem(item.id)}
                        disabled={isValidating}
                      >
                        Remove
                      </RemoveButton>
                    </CartItemActions>
                  </CartItemDetails>
                </CartItemContainer>
              ))}
            </CartItemsList>
          )}
          
          {checkoutError && (
            <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
              {checkoutError}
            </div>
          )}
        </CartContent>
        
        <CartFooter>
          <CartTotal>
            <span>Total</span>
            {isValidating ? (
              <span>Validating...</span>
            ) : (
              <span>${totalPrice.toFixed(2)}</span>
            )}
          </CartTotal>
          <CheckoutButton 
            disabled={items.length === 0 || isValidating || checkoutInProgress}
            onClick={handleCheckout}
          >
            {checkoutInProgress ? 'PROCESSING...' : 
             isValidating ? 'VALIDATING...' : 'CHECKOUT'}
          </CheckoutButton>
        </CartFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CartModal;