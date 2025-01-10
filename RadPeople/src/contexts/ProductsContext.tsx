import React, { createContext, useContext, useState } from 'react';
import { ProductItem } from '../models/Product.model';
import { useDataFetching } from '../hooks/useDataFetching';
import { fetchProducts } from '../middleware/Product';

interface ProductsContextType {
  products: ProductItem[];
  loading: boolean;
  error: Error | null;
  prefetchProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, loading, error } = useDataFetching<ProductItem[]>(
    'products',
    fetchProducts,
    { maxAge: 5 * 60 * 1000 },
    shouldFetch
  );

  const prefetchProducts = () => {
    setShouldFetch(true);
  };

  return (
    <ProductsContext.Provider value={{
      products: data || [],
      loading,
      error,
      prefetchProducts
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}; 