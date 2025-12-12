/**
 * API Endpoints
 * 
 * Typed functions for calling specific backend routes.
 * Each function returns parsed JSON and throws ApiError on non-2xx responses.
 * 
 * Module Endpoints:
 * -----------------
 * - /borrowings/analyze
 * - /asset_quality/analyze
 * - /working_capital_module/analyze
 * - /capex_cwip_module/analyze
 * - /liquidity/analyze
 * 
 * Other Endpoints:
 * ----------------
 * - /industry-benchmark (uses mock fallback if not available)
 * - /stock-fundamentals
 * - /chat
 */

import { request, apiFetch, isApiError } from './client';
import { normalizeFinancialPayload } from './normalize';
import { generateMockIndustryBenchmark } from './mockIndustryBenchmark';
import type {
  IndustryBenchmarkRequest,
  IndustryBenchmarkResponse,
  StockFundamentalsRequest,
  StockFundamentalsResponse,
  StockAnalysisRequest,
  StockAnalysisResponse,
  ChatRequest,
  ChatResponse,
  ModuleAnalyzeResponse,
} from './types';

// Flag to track if we've already warned about mock data usage
let mockWarningShown = false;

/**
 * Fetch industry benchmark data with mock fallback
 * 
 * The /industry-benchmark endpoint may not exist yet on the backend.
 * When it returns 404/501 or network error, we fall back to mock data
 * and log a console warning.
 * 
 * @param industryName - Name of the industry to analyze
 * @returns Industry benchmark data (real or mock)
 */
export async function postIndustryBenchmark(
  industryName: string
): Promise<IndustryBenchmarkResponse> {
  const payload: IndustryBenchmarkRequest = {
    industry_name: industryName,
  };
  
  try {
    const result = await request<IndustryBenchmarkResponse>('POST', '/industry-benchmark', payload);
    mockWarningShown = false; // Reset flag on successful real API call
    return result;
  } catch (error) {
    // Check if this is a "not implemented" type error
    if (isApiError(error) && (error.status === 404 || error.status === 501 || error.status === 0)) {
      if (!mockWarningShown) {
        console.warn(
          '⚠️ Using local mock for industry analysis — backend endpoint not yet available. ' +
          'Error:', error.message
        );
        mockWarningShown = true;
      }
      return generateMockIndustryBenchmark(industryName);
    }
    throw error;
  }
}

/**
 * Check if industry benchmark is using mock data
 */
export function isUsingMockIndustryData(): boolean {
  return mockWarningShown;
}

/**
 * Fetch stock fundamentals with optional industry context
 * 
 * @param ticker - Stock ticker symbol
 * @param industry - Optional industry name for context
 * @param includeIndustryContext - Whether to include industry comparison data
 * @returns Comprehensive stock analysis data
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
 */
export async function postChat(
  payload: ChatRequest
): Promise<ChatResponse> {
  return request<ChatResponse>('POST', '/chat', payload);
}

// ============================================================================
// Module Analyze Endpoints
// These call specific module routes on the backend
// ============================================================================

/**
 * Analyze borrowings for a company
 * POST /borrowings/analyze
 * 
 * @param payload - Financial data payload (will be normalized)
 * @returns Module analysis response
 */
export async function postBorrowingsAnalyze(
  payload: unknown
): Promise<ModuleAnalyzeResponse> {
  const normalizedPayload = normalizeFinancialPayload(payload);
  return apiFetch<ModuleAnalyzeResponse>('/borrowings/analyze', {
    method: 'POST',
    body: JSON.stringify(normalizedPayload),
  });
}

/**
 * Analyze asset quality for a company
 * POST /asset_quality/analyze
 * 
 * @param payload - Financial data payload (will be normalized)
 * @returns Module analysis response
 */
export async function postAssetQualityAnalyze(
  payload: unknown
): Promise<ModuleAnalyzeResponse> {
  const normalizedPayload = normalizeFinancialPayload(payload);
  return apiFetch<ModuleAnalyzeResponse>('/asset_quality/analyze', {
    method: 'POST',
    body: JSON.stringify(normalizedPayload),
  });
}

/**
 * Analyze working capital for a company
 * POST /working_capital_module/analyze
 * 
 * @param payload - Financial data payload (will be normalized)
 * @returns Module analysis response
 */
export async function postWorkingCapitalAnalyze(
  payload: unknown
): Promise<ModuleAnalyzeResponse> {
  const normalizedPayload = normalizeFinancialPayload(payload);
  return apiFetch<ModuleAnalyzeResponse>('/working_capital_module/analyze', {
    method: 'POST',
    body: JSON.stringify(normalizedPayload),
  });
}

/**
 * Analyze capex and CWIP for a company
 * POST /capex_cwip_module/analyze
 * 
 * @param payload - Financial data payload (will be normalized)
 * @returns Module analysis response
 */
export async function postCapexCwipAnalyze(
  payload: unknown
): Promise<ModuleAnalyzeResponse> {
  const normalizedPayload = normalizeFinancialPayload(payload);
  return apiFetch<ModuleAnalyzeResponse>('/capex_cwip_module/analyze', {
    method: 'POST',
    body: JSON.stringify(normalizedPayload),
  });
}

/**
 * Analyze liquidity for a company
 * POST /liquidity/analyze
 * 
 * @param payload - Financial data payload (will be normalized)
 * @returns Module analysis response
 */
export async function postLiquidityAnalyze(
  payload: unknown
): Promise<ModuleAnalyzeResponse> {
  const normalizedPayload = normalizeFinancialPayload(payload);
  return apiFetch<ModuleAnalyzeResponse>('/liquidity/analyze', {
    method: 'POST',
    body: JSON.stringify(normalizedPayload),
  });
}

/**
 * Run all module analyses for a company
 * Calls each module endpoint and aggregates results
 * 
 * @param payload - Financial data payload (will be normalized once)
 * @returns Object with results from each module
 */
export async function postAllModulesAnalyze(
  payload: unknown
): Promise<Record<string, ModuleAnalyzeResponse>> {
  const normalizedPayload = normalizeFinancialPayload(payload);
  const body = JSON.stringify(normalizedPayload);
  
  const [borrowings, assetQuality, workingCapital, capexCwip, liquidity] = await Promise.all([
    apiFetch<ModuleAnalyzeResponse>('/borrowings/analyze', { method: 'POST', body }),
    apiFetch<ModuleAnalyzeResponse>('/asset_quality/analyze', { method: 'POST', body }),
    apiFetch<ModuleAnalyzeResponse>('/working_capital_module/analyze', { method: 'POST', body }),
    apiFetch<ModuleAnalyzeResponse>('/capex_cwip_module/analyze', { method: 'POST', body }),
    apiFetch<ModuleAnalyzeResponse>('/liquidity/analyze', { method: 'POST', body }),
  ]);
  
  return {
    borrowings,
    asset_quality: assetQuality,
    working_capital: workingCapital,
    capex_cwip: capexCwip,
    liquidity,
  };
}
