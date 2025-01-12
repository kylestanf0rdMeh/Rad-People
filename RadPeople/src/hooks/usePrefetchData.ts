import { useCallback } from 'react';
import { useEvents } from '../contexts/EventsContext';
import { useProducts } from '../contexts/ProductsContext';
import { useGallery } from '../contexts/GalleryContext';

export const usePrefetchData = () => {
  const { prefetchEvents } = useEvents();
  const { prefetchProducts } = useProducts();
  const { prefetchGallery } = useGallery();

  const prefetchAllData = useCallback(async () => {
    try {
      // Use Promise.all to fetch data concurrently
      await Promise.all([
        prefetchEvents(),
        prefetchProducts(),
        prefetchGallery()
      ]);
      console.log('All data prefetched successfully');
    } catch (error) {
      console.error('Error prefetching data:', error);
    }
  }, [prefetchEvents, prefetchProducts, prefetchGallery]);

  return { prefetchAllData };
};