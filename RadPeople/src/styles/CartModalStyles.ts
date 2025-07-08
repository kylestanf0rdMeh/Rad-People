import styled from "styled-components";

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
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

export const ModalContainer = styled.div<{ isOpen: boolean }>`
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
    height: 100%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.001rem;
  border-bottom: 1px solid black;
`;

export const CartTitle = styled.h2`
  font-family: 'Sequel Sans Regular';
  font-size: 0.9rem;
  color: black;
  margin: 0;
  margin-left: 0.8rem;
`;

export const CloseButton = styled.button`
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
export const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const EmptyCartMessage = styled.p`
  text-align: center;
  font-family: 'Sequel Sans Regular';
  color: black;
  font-size: 0.8rem;
  margin: auto;
`;

export const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CartItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid black;
`;

export const CartItemImage = styled.img`
  width: 95px;
  height: 110px;
  object-fit: cover;
  border: 1px solid #eee;
  border-right: 1px solid black;
`;

export const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const CartItemName = styled.h3`
  font-family: 'Sequel Sans Regular';
  font-size: 0.85rem;
  margin: 0;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CartItemSize = styled.p`
  font-family: 'Sequel Sans Regular';
  font-size: 0.75rem;
  color: #444;
  margin: 0;
  text-transform: uppercase;
`;

export const CartItemPrice = styled.p`
  font-family: 'Sequel Sans Regular';
  font-size: 0.8rem;
  color: black;
  margin: 0;
  margin-right: 1rem; // Add margin to keep price away from the edge
  flex-shrink: 0;
`;

export const CartItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  // controls size of the box (width)
  gap: 0.5rem;
  border: 1px solid black;
`;

export const QuantityButton = styled.button`
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

export const QuantityDisplay = styled.span`
  font-family: 'Sequel Sans Regular';
  font-size: 0.8rem;
  color: black;
  min-width: 20px;
  text-align: center;
`;

export const RemoveButton = styled.button`
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

export const CartFooter = styled.div`
  border-top: 1px solid black;
  padding: 1rem;
`;

export const CartTotal = styled.div`
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

export const CheckoutButton = styled.button`
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