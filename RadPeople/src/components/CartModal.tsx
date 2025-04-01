import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { items, totalPrice, removeItem, updateQuantity, isValidating } = useCart();

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
            disabled={items.length === 0 || isValidating}
          >
            {isValidating ? 'VALIDATING...' : 'CHECKOUT'}
          </CheckoutButton>
        </CartFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Existing Styled Components
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
  z-index: 1000;
`;

const ModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 400px;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease-in-out;
  z-index: 1001;
  border-left: 1px solid black;
  
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.001rem;
  border-bottom: 1px solid black;
`;

const CartTitle = styled.h2`
  font-family: 'Sequel Sans Regular';
  font-size: 0.9rem;
  color: black;
  margin: 0;
  margin-left: 0.8rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: opacity 0.2s;
  color: black;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:focus {
    outline: none;
  }
`;

// New Styled Components for Cart Items
const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  font-family: 'Sequel Sans Regular';
  color: black;
  font-size: 0.8rem;
  margin: auto;
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid black;
`;

const CartItemImage = styled.img`
  width: 95px;
  height: 110px;
  object-fit: cover;
  border: 1px solid #eee;
  border-right: 1px solid black;
`;

const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const CartItemName = styled.h3`
  font-family: 'Sequel Sans Regular';
  font-size: 0.85rem;
  margin: 0;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CartItemSize = styled.p`
  font-family: 'Sequel Sans Regular';
  font-size: 0.75rem;
  color: #444;
  margin: 0;
  text-transform: uppercase;
`;

const CartItemPrice = styled.p`
  font-family: 'Sequel Sans Regular';
  font-size: 0.8rem;
  color: black;
  margin: 0;
  margin-right: 1rem; // Add margin to keep price away from the edge
  flex-shrink: 0;
`;

const CartItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  // controls size of the box (width)
  gap: 0.5rem;
  border: 1px solid black;
`;

const QuantityButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: black;
  outline: none;
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
  }
  
  /* Remove the active state styling */
  &:active {
    outline: none;
  }
`;

const QuantityDisplay = styled.span`
  font-family: 'Sequel Sans Regular';
  font-size: 0.8rem;
  color: black;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  font-family: 'Sequel Sans Regular';
  font-size: 0.7rem;
  color: #888;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    color: black;
  }

  &:active {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      color: #888;
    }
  }
`;

const CartFooter = styled.div`
  border-top: 1px solid black;
  padding: 1rem;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Sequel Sans';
  font-size: 0.8rem;
  color: black;
  margin-bottom: 1rem;
  
  span {
    font-size: 0.8rem;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #1404FB;
  color: white;
  border: 1px solid black;
  font-family: 'Sequel Sans Regular';
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0; /* Add this to ensure square corners */
  
  &:hover {
    background-color: white;
    color: black;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    &:hover {
      color: white;
    }
  }
  
  &:focus {
    outline: none;
  }
`;

export default CartModal;