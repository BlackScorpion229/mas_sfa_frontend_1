/**
 * Hook for fetching industry benchmark data
 * 
 * Provides a simple data-fetching interface that can be easily
 * swapped to SWR/React Query later if needed.
 */

import { useState, useEffect, useCallback } from 'react';
import { postIndustryBenchmark, isApiError } from '@/lib/api';
import type { IndustryBenchmark } from '@/types';

interface UseIndustryBenchmarkResult {
  data: IndustryBenchmark | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Fetch industry benchmark data for a given industry
 * 
 * @param industryName - The industry to fetch data for
 * @returns Object containing data, loading state, error, and refresh function
 * 
 * @example
 * const { data, isLoading, error, refresh } = useIndustryBenchmark('Banking');
 */
export function useIndustryBenchmark(
  industryName: string | undefined
): UseIndustryBenchmarkResult {
  const [data, setData] = useState<IndustryBenchmark | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!industryName) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await postIndustryBenchmark(industryName);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          if (isApiError(err)) {
            setError(err.message);
          } else {
            setError('An unexpected error occurred');
          }
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [industryName, refreshKey]);

  return { data, isLoading, error, refresh };
}
