import { useEffect } from 'react';
import { usePrefetchData } from '../hooks/usePrefetchData';

const AppPrefetcher = () => {
  const { prefetchAllData } = usePrefetchData();

  useEffect(() => {
    prefetchAllData();
  }, [prefetchAllData]);

  return null; // This component does not render anything
};

export default AppPrefetcher;