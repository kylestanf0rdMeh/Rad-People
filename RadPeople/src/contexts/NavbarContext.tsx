import React, { createContext, useContext, useCallback } from 'react';

interface NavbarContextType {
  prefetchData: () => void;
}

const NavbarContext = createContext<NavbarContextType | null>(null);

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefetchData = useCallback(() => {
    // Implement prefetch logic here without depending on other contexts
  }, []);

  return (
    <NavbarContext.Provider value={{ prefetchData }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within NavbarProvider');
  }
  return context;
}; 