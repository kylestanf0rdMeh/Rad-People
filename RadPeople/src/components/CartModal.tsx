import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

//   if (!isOpen) return null;

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
          {/* Cart items will go here */}
          <EmptyCartMessage>YOUR CART IS EMPTY</EmptyCartMessage>
        </CartContent>
        
        <CartFooter>
          <CartTotal>
            <span>Total</span>
            <span>$0.00</span>
          </CartTotal>
          <CheckoutButton>CHECKOUT</CheckoutButton>
        </CartFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled Components
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
  z-index: ${({ isOpen }) => (isOpen ? 1000 : -1)};
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

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  font-family: 'Sequel Sans Regular';
  color: black;
  font-size: 0.8rem;
`;

const CartFooter = styled.div`
  border-top: 1px solid black;
  padding: 1rem;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Sequel Sans Regular';
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
  
  &:focus {
    outline: none;
  }
`;

export default CartModal;