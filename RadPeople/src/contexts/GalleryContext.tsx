import React, { createContext, useContext, useState } from 'react';
import { GalleryItem } from '../models/Gallery.model';
import { useDataFetching } from '../hooks/useDataFetching';
import { fetchGalleryImages } from '../middleware/Gallery';

interface GalleryContextType {
  images: GalleryItem[];
  loading: boolean;
  error: Error | null;
  prefetchGallery: () => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, loading, error } = useDataFetching<GalleryItem[]>(
    'gallery',
    fetchGalleryImages,
    { maxAge: 15 * 60 * 1000 }, // 15 minutes cache
    shouldFetch
  );

  const prefetchGallery = () => {
    setShouldFetch(true);
  };

  return (
    <GalleryContext.Provider value={{
      images: data || [],
      loading,
      error,
      prefetchGallery
    }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
}; 