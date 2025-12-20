/**
 * API Module
 * 
 * Central export point for all API functionality.
 * 
 * @example
 * import { postIndustryBenchmark, postBorrowingsAnalyze, isApiError } from '@/lib/api';
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

// Configuration
export { API_BASE, DEFAULT_BASE_URL, REQUEST_TIMEOUT } from './config';

// Client utilities
export { apiClient, apiFetch, getApiBaseUrl, isApiError, normalizeError, request } from './client';

// Normalization utilities
export { normalizePayload, normalizeFinancialPayload, toSnakeCase, parsePercentage } from './normalize';

// API endpoint functions
export {
  // Industry & Stock endpoints
  postIndustryBenchmark,
  postStockFundamentals,
  postAnalyzeStock,
  postChat,
  isUsingMockIndustryData,
  isUsingMockStockData,
  // Module analyze endpoints
  postBorrowingsAnalyze,
  postAssetQualityAnalyze,
  postWorkingCapitalAnalyze,
  postCapexCwipAnalyze,
  postLiquidityAnalyze,
  postAllModulesAnalyze,
} from './endpoints';

// Mock data (for fallback)
export { generateMockIndustryBenchmark } from './mockIndustryBenchmark';

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
  ModuleAnalyzeResponse,
  FinancialDataPayload,
} from './types';
