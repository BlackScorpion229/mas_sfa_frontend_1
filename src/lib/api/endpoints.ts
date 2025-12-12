/**
 * API Endpoints
 * 
 * Typed functions for calling specific backend routes.
 * Each function returns parsed JSON and throws ApiError on non-2xx responses.
 */

import { request } from './client';
import type {
  IndustryBenchmarkRequest,
  IndustryBenchmarkResponse,
  StockFundamentalsRequest,
  StockFundamentalsResponse,
  StockAnalysisRequest,
  StockAnalysisResponse,
  ChatRequest,
  ChatResponse,
} from './types';

/**
 * Fetch industry benchmark data
 * 
 * @param industryName - Name of the industry to analyze
 * @returns Industry benchmark data including trends, metrics, and peer stocks
 * 
 * @example
 * const data = await postIndustryBenchmark('Banking');
 */
export async function postIndustryBenchmark(
  industryName: string
): Promise<IndustryBenchmarkResponse> {
  const payload: IndustryBenchmarkRequest = {
    industry_name: industryName,
  };
  return request<IndustryBenchmarkResponse>('POST', '/industry-benchmark', payload);
}

/**
 * Fetch stock fundamentals with optional industry context
 * 
 * @param ticker - Stock ticker symbol
 * @param industry - Optional industry name for context
 * @param includeIndustryContext - Whether to include industry comparison data
 * @returns Comprehensive stock analysis data
 * 
 * @example
 * const data = await postStockFundamentals('RELIANCE', 'Energy', true);
 */
export async function postStockFundamentals(
  ticker: string,
  industry?: string,
  includeIndustryContext: boolean = true
): Promise<StockFundamentalsResponse> {
  const payload: StockFundamentalsRequest = {
    ticker,
    industry,
    include_industry_context: includeIndustryContext,
  };
  return request<StockFundamentalsResponse>('POST', '/stock-fundamentals', payload);
}

/**
 * Run stock analysis (simplified endpoint)
 * 
 * @param ticker - Stock ticker symbol
 * @returns Stock analysis data
 * 
 * @example
 * const data = await postAnalyzeStock('TCS');
 */
export async function postAnalyzeStock(
  ticker: string
): Promise<StockAnalysisResponse> {
  const payload: StockAnalysisRequest = {
    ticker,
  };
  return request<StockAnalysisResponse>('POST', '/analyze-stock', payload);
}

/**
 * Send chat message and get AI response
 * 
 * @param payload - Chat request with messages and context
 * @returns AI assistant response
 * 
 * @example
 * const response = await postChat({
 *   messages: [{ role: 'user', content: 'What are the key risks?' }],
 *   context: { includeIndustrySummary: true, includeBenchmarks: true, includeStockAnalysis: false },
 *   industry: 'Banking'
 * });
 */
export async function postChat(
  payload: ChatRequest
): Promise<ChatResponse> {
  return request<ChatResponse>('POST', '/chat', payload);
}
