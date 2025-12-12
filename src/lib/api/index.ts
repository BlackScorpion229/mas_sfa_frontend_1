/**
 * API Module
 * 
 * Central export point for all API functionality.
 * 
 * @example
 * import { postIndustryBenchmark, isApiError, getApiBaseUrl } from '@/lib/api';
 * 
 * try {
 *   const data = await postIndustryBenchmark('Banking');
 *   console.log(data);
 * } catch (error) {
 *   if (isApiError(error)) {
 *     console.error(`API Error ${error.status}: ${error.message}`);
 *   }
 * }
 */

// Client utilities
export { apiClient, getApiBaseUrl, isApiError, normalizeError } from './client';

// API endpoint functions
export {
  postIndustryBenchmark,
  postStockFundamentals,
  postAnalyzeStock,
  postChat,
} from './endpoints';

// Types
export type {
  ApiError,
  IndustryBenchmarkRequest,
  IndustryBenchmarkResponse,
  StockFundamentalsRequest,
  StockFundamentalsResponse,
  StockAnalysisRequest,
  StockAnalysisResponse,
  ChatRequest,
  ChatResponse,
} from './types';
