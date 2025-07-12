import { useState, useEffect } from 'react';

/**
 * A custom hook that handles data fetching with caching to prevent unnecessary API calls.
 * Implements a localStorage-based caching strategy with configurable expiration times.
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheConfig {
  maxAge: number; // Duration in milliseconds before cache is considered stale
}

/**
 * @param key - Unique identifier for caching the data
 * @param fetchFn - Async function that fetches the data
 * @param config - Optional cache configuration (defaults to 5 minutes)
 * @param shouldFetch - Optional boolean to control when fetching occurs
 * 
 * @example
 * const { data, loading, error } = useDataFetching(
 *   'products',
 *   fetchProducts,
 *   { maxAge: 5 * 60 * 1000 }
 * );
 */
export function useDataFetching<T>(
  key: string,
  fetchFn: () => Promise<T>,
  config: CacheConfig = { maxAge: 5 * 60 * 1000 },
  shouldFetch: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const fetchData = async () => {
      try {
        // Try to load from cache before making API call
        const cached = localStorage.getItem(key);
        if (cached) {
          const { data: cachedData, timestamp }: CacheItem<T> = JSON.parse(cached);
          const age = Date.now() - timestamp;
          
          // Return cached data if it's still fresh
          if (age < config.maxAge) {
            setData(cachedData);
            setLoading(false);
            return;
          }
        }

        // Cache miss or stale data: fetch fresh data
        const freshData = await fetchFn();
        const cacheItem: CacheItem<T> = {
          data: freshData,
          timestamp: Date.now()
        };

        
        localStorage.setItem(key, JSON.stringify(cacheItem));
        setData(freshData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, fetchFn, config.maxAge, shouldFetch]);

  return { data, loading, error };
}

export function isCacheValid(key: string, maxAge: number): boolean {
  const cached = localStorage.getItem(key);
  if (!cached) return false;
  try {
    const { timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;
    return age < maxAge;
  } catch {
    return false;
  }
}