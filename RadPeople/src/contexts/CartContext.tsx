import React, { createContext, useState, useContext, ReactNode } from 'react';
import { validateCartItem, validateCart, createPaymentIntent } from '../middleware/Cart';

interface ValidatedPrice {
  itemId: string;
  price: number;
  timestamp: number;
  signature: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  priceValidation?: ValidatedPrice;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>; // Changed to return Promise<void>
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  validateCartForCheckout: () => Promise<string | null>;
  totalItems: number;
  totalPrice: number;
  isValidating: boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: async () => {}, // Updated to match new signature
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  validateCartForCheckout: async () => null,
  totalItems: 0,
  totalPrice: 0,
  isValidating: false
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState<string | null>(null);

  // Helper function to check if a price validation is still valid
  const isPriceValidationValid = (validation?: ValidatedPrice) => {
    if (!validation) return false;
    
    // Check if the validation is recent (within 15 minutes)
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const isRecent = Date.now() - validation.timestamp < fifteenMinutesInMs;
    
    return isRecent;
  };

  const addItem = async(item: CartItem): Promise<void> => {
    setIsValidating(true);
    
    // Use the middleware to validate the item
    return validateCartItem(item)
      .then((validatedPrice) => {
        setItems(prevItems => {
          // Check if item already exists in cart
          const existingItem = prevItems.find(i => i.id === item.id);
          
          if (existingItem) {
            // Update quantity if item exists
            return prevItems.map(i => 
              i.id === item.id 
                ? { 
                    ...i, 
                    quantity: i.quantity + item.quantity,
                    priceValidation: validatedPrice 
                  } 
                : i
            );
          } else {
            // Add new item if it doesn't exist
            return [...prevItems, { 
              ...item, 
              priceValidation: validatedPrice 
            }];
          }
        });
        
        // Reset checkout token since cart has changed
        setCheckoutToken(null);
      })
      .catch(error => {
        console.error("Error validating price:", error);
        throw new Error("Failed to add item to the cart")
      })
      .finally(() => {
        setIsValidating(false);
      });
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    // Reset checkout token since cart has changed
    setCheckoutToken(null);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setIsValidating(true);
    
    const item = items.find(i => i.id === id);
    if (!item) {
      setIsValidating(false);
      return;
    }
    
    // Use the middleware to validate the updated item
    validateCartItem({...item, quantity})
      .then((validatedPrice) => {
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === id 
              ? { 
                  ...item, 
                  quantity: Math.max(1, quantity),
                  priceValidation: validatedPrice
                } 
              : item
          )
        );
        
        // Reset checkout token since cart has changed
        setCheckoutToken(null);
      })
      .catch(error => {
        console.error("Error validating quantity update:", error);
      })
      .finally(() => {
        setIsValidating(false);
      });
  };

  const clearCart = () => {
    setItems([]);
    setCheckoutToken(null);
  };

  // New function to validate the entire cart before checkout
  const validateCartForCheckout = async (): Promise<string | null> => {
    if (items.length === 0) return null;
    
    setIsValidating(true);
    
    try {
      // If we already have a valid checkout token, return it
      if (checkoutToken) {
        return checkoutToken;
      }
      
      // Otherwise validate the cart
      const result = await validateCart(items);
      
      // Update items with validated prices
      setItems(result.validatedItems);
      
      // Store the checkout token
      setCheckoutToken(result.checkoutToken);
      
      return result.checkoutToken;
    } catch (error) {
      console.error("Error validating cart for checkout:", error);
      return null;
    } finally {
      setIsValidating(false);
    }
  };

  // Calculate total items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = items.reduce((sum, item) => {
    // Use validated price if available and valid
    if (item.priceValidation && isPriceValidationValid(item.priceValidation)) {
      return sum + (item.priceValidation.price);
    }
    // Fall back to client price if no validation (temporary)
    return sum + (item.price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      validateCartForCheckout,
      totalItems,
      totalPrice,
      isValidating
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);