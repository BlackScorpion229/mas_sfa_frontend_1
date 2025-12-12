/**
 * API Types
 * 
 * TypeScript interfaces for API request/response payloads.
 * These extend or mirror the core types from @/types with API-specific additions.
 */

import type { IndustryBenchmark, StockAnalysis, ChatMessage, ChatContext } from '@/types';

// Re-export core types for convenience
export type { IndustryBenchmark, StockAnalysis, ChatMessage, ChatContext };

/**
 * Standard API error interface for consistent error handling
 */
export interface ApiError {
  status: number;
  message: string;
  body?: unknown;
}

/**
 * Industry Benchmark API
 */
export interface IndustryBenchmarkRequest {
  industry_name: string;
}

export type IndustryBenchmarkResponse = IndustryBenchmark;

/**
 * Stock Fundamentals API
 */
export interface StockFundamentalsRequest {
  ticker: string;
  industry?: string;
  include_industry_context?: boolean;
}

export type StockFundamentalsResponse = StockAnalysis;

/**
 * Stock Analysis API (simplified endpoint)
 */
export interface StockAnalysisRequest {
  ticker: string;
}

export type StockAnalysisResponse = StockAnalysis;

/**
 * Chat API
 */
export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  context?: ChatContext;
  industry?: string;
  ticker?: string;
}

export interface ChatResponse {
  id: string;
  role: 'assistant';
  content: string;
  timestamp?: string;
}

/**
 * Module Analyze Response
 * 
 * Generic response type for module analyze endpoints.
 * Each module may return different data structures,
 * so this is intentionally flexible.
 */
export interface ModuleAnalyzeResponse {
  module_name?: string;
  status?: string;
  analysis?: unknown;
  metrics?: Record<string, unknown>;
  insights?: string[];
  warnings?: string[];
  errors?: string[];
  [key: string]: unknown;
}

/**
 * Financial Data Payload
 * 
 * Structure for the financial data sent to module analyze endpoints.
 * Keys should be in snake_case and percentages should be decimal fractions.
 */
export interface FinancialDataPayload {
  company: string;
  financial_data: {
    financial_years: Array<{
      year: number;
      [key: string]: unknown;
    }>;
  };
}
