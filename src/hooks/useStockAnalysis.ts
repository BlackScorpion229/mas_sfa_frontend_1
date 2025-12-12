/**
 * Hook for fetching stock analysis data
 * 
 * Provides a simple data-fetching interface that can be easily
 * swapped to SWR/React Query later if needed.
 */

import { useState, useEffect, useCallback } from 'react';
import { postStockFundamentals, isApiError } from '@/lib/api';
import type { StockAnalysis } from '@/types';

interface UseStockAnalysisResult {
  data: StockAnalysis | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Fetch stock analysis data for a given ticker
 * 
 * @param ticker - The stock ticker to fetch data for
 * @param industry - Optional industry for context
 * @returns Object containing data, loading state, error, and refresh function
 * 
 * @example
 * const { data, isLoading, error, refresh } = useStockAnalysis('RELIANCE', 'Energy');
 */
export function useStockAnalysis(
  ticker: string | undefined,
  industry?: string
): UseStockAnalysisResult {
  const [data, setData] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!ticker) {
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
        const result = await postStockFundamentals(ticker, industry, true);
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
  }, [ticker, industry, refreshKey]);

  return { data, isLoading, error, refresh };
}
