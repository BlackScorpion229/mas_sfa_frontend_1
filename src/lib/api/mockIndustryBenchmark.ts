/**
 * Mock Industry Benchmark Data
 * 
 * This mock data is used as a fallback when the /industry-benchmark
 * endpoint is not yet available on the backend.
 * 
 * When the backend implements this endpoint, remove this file
 * and update endpoints.ts to remove the fallback logic.
 */

import type { IndustryBenchmark } from '@/types';

/**
 * Generate mock industry benchmark data for a given industry
 */
export function generateMockIndustryBenchmark(industryName: string): IndustryBenchmark {
  return {
    industry_name: industryName,
    summary: {
      narrative: `The ${industryName} sector in India has demonstrated robust growth trajectory over the past fiscal year, driven by increasing domestic demand and favorable policy reforms. Digital transformation continues to reshape operational efficiency across the industry, with major players investing significantly in technology infrastructure. The sector's fundamentals remain strong with improving credit metrics and healthy balance sheets across most constituents.`,
      sources: ['CRISIL Research Report Q4 2024', 'ICRA Industry Outlook 2024', 'Fitch Ratings India Sector Report'],
    },
    revenue_trend: {
      trend_tag: 'EXPANDING',
      industry_cagr: 12.5,
      yoy_growth: [
        { year: 'FY21', growth: 8.2 },
        { year: 'FY22', growth: 15.3 },
        { year: 'FY23', growth: 11.8 },
        { year: 'FY24', growth: 14.2 },
      ],
      insight: `${industryName} revenue growth has accelerated to double digits, outpacing GDP growth by 2.5x. Strong domestic consumption and export demand continue to drive expansion.`,
      sources: ['RBI Industry Statistics', 'NSE Sector Performance Report'],
    },
    capex_trend: {
      cycle: 'EXPANSION',
      growth_estimate: 18.5,
      intensity: 15.2,
      insight: 'Capital expenditure cycle is in full swing with brownfield and greenfield expansions announced by major players. Government PLI schemes providing additional impetus.',
    },
    benchmarks: [
      { metric: 'D/E Ratio', green: '< 0.8x', yellow: '0.8x - 1.5x', red: '> 1.5x' },
      { metric: 'Debt/EBITDA', green: '< 2.5x', yellow: '2.5x - 4.0x', red: '> 4.0x' },
      { metric: 'ROE', green: '> 15%', yellow: '10% - 15%', red: '< 10%' },
      { metric: 'ROCE', green: '> 18%', yellow: '12% - 18%', red: '< 12%' },
      { metric: 'Current Ratio', green: '> 1.5x', yellow: '1.0x - 1.5x', red: '< 1.0x' },
      { metric: 'Interest Coverage', green: '> 4.0x', yellow: '2.0x - 4.0x', red: '< 2.0x' },
    ],
    key_insights: [
      'Market consolidation accelerating with top 5 players commanding 65% market share',
      'Digital adoption reaching inflection point with 40% cost savings reported',
      'Export markets contributing 25% of revenues, diversifying geographic risk',
      'ESG compliance becoming key differentiator for institutional capital access',
    ],
    observations: [
      'Working capital cycle improved by 15 days on average across sector',
      'R&D spending increased to 3.5% of revenues from 2.1% three years ago',
      'Customer retention rates at all-time high of 92% for market leaders',
      'Margin expansion driven by operational efficiencies and scale benefits',
    ],
    risks: [
      'Input cost inflation remains a concern with commodity prices volatile',
      'Regulatory changes in pipeline may impact operational flexibility',
      'Currency hedging costs increasing due to rupee depreciation pressure',
      'Skilled labor shortage affecting expansion timelines for some players',
    ],
    peer_stocks: [
      { name: 'Alpha Corp Ltd', ticker: 'ALPHA', exchange: 'NSE', market_cap: 125000, latest_price: 2456.75 },
      { name: 'Beta Industries', ticker: 'BETA', exchange: 'NSE', market_cap: 89000, latest_price: 1823.40 },
      { name: 'Gamma Holdings', ticker: 'GAMMA', exchange: 'BSE', market_cap: 67500, latest_price: 945.60 },
      { name: 'Delta Systems', ticker: 'DELTA', exchange: 'NSE', market_cap: 45200, latest_price: 567.25 },
      { name: 'Epsilon Tech', ticker: 'EPSILON', exchange: 'NSE', market_cap: 34800, latest_price: 423.90 },
    ],
  };
}
