import { useCallback } from 'react';
import { useEvents } from '../contexts/EventsContext';
import { useProducts } from '../contexts/ProductsContext';
import { useGallery } from '../contexts/GalleryContext';
import { isCacheValid } from './useDataFetching';


export const usePrefetchData = () => {
  const { prefetchEvents } = useEvents();
  const { prefetchProducts } = useProducts();
  const { prefetchGallery } = useGallery();

  const prefetchAllData = useCallback(async () => {
    const prefetchPromises = [];

    if (!isCacheValid('events', 30 * 60 * 1000)) {
      prefetchPromises.push(prefetchEvents());
    }
    if (!isCacheValid('products', 5 * 60 * 1000)) {
      prefetchPromises.push(prefetchProducts());
    }
    if (!isCacheValid('gallery', 15 * 60 * 1000)) {
      prefetchPromises.push(prefetchGallery());
    }

    if (prefetchPromises.length === 0) {
      console.log('All data already cached');
      return;
    }

    try {
      await Promise.all(prefetchPromises);
      console.log('All data prefetched successfully');
    } catch (error) {
      console.error('Error prefetching data:', error);
    }
  }, [prefetchEvents, prefetchProducts, prefetchGallery]);

  return { prefetchAllData };
};