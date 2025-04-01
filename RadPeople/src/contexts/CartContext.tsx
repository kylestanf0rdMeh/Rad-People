import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  addItem: (item: CartItem) => void; // Changed back to sync for now
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // Changed back to sync
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isValidating: boolean; // Keep this for UI
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
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

  // const validatePrices = async (cartItems: CartItem[]) => {
  //   try {
  //     // This would be your API endpoint
  //     const response = await fetch('/api/validate-prices', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         items: cartItems.map(item => ({
  //           id: item.id,
  //           quantity: item.quantity,
  //           price: item.price,
  //         }))
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Price validation failed');
  //     }

  //     const validatedData = await response.json();
  //     return validatedData;
  //   } catch (error) {
  //     console.error('Price validation error:', error);
  //     throw error;
  //   }
  // };

  // Mock validation function until we have a backend
  const mockValidatePrice = (item: CartItem) => {
    // This simulates a delay like a real API call would have
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        // Return the same price for now, but in a real system, 
        // this would come from the server
        resolve({
          itemId: item.id,
          price: item.price * item.quantity,
          timestamp: Date.now(),
          signature: "mocksignature123" // In reality, this would be a cryptographic signature
        });
      }, 500); // Simulate network delay
    });
  };

  const addItem = (item: CartItem) => {
    setIsValidating(true);
    
    // Simulate API validation
    // const validatedPrices = await validatePrices([item]);
    mockValidatePrice(item)
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
      })
      .catch(error => {
        console.error("Error validating price:", error);
      })
      .finally(() => {
        setIsValidating(false);
      });
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setIsValidating(true);
    
    const item = items.find(i => i.id === id);
    if (!item) {
      setIsValidating(false);
      return;
    }
    
    // Simulate API validation
    mockValidatePrice({...item, quantity})
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
  };

  // Helper function to check if a price validation is still valid
  // In a real app, this would verify the cryptographic signature
  const isPriceValidationValid = (validation?: ValidatedPrice) => {
    if (!validation) return false;
    
    // Check if the validation is recent (within 15 minutes)
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const isRecent = Date.now() - validation.timestamp < fifteenMinutesInMs;
    
    // In production, you would also verify the signature here
    
    return isRecent;
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
      totalItems,
      totalPrice,
      isValidating
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);