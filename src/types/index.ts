// Industry Types
export interface IndustryBenchmark {
  industry_name: string;
  summary: {
    narrative: string;
    sources: string[];
  };
  revenue_trend: {
    trend_tag: 'EXPANDING' | 'MODERATE' | 'STAGNANT' | 'DECLINING';
    industry_cagr: number;
    yoy_growth: { year: string; growth: number }[];
    insight: string;
    sources: string[];
  };
  capex_trend: {
    cycle: 'EXPANSION' | 'STABLE' | 'SOFTENING';
    growth_estimate: number;
    intensity: number;
    insight: string;
  };
  benchmarks: {
    metric: string;
    green: string;
    yellow: string;
    red: string;
  }[];
  key_insights: string[];
  observations: string[];
  risks: string[];
  peer_stocks: PeerStock[];
}

export interface PeerStock {
  name: string;
  ticker: string;
  exchange: string;
  market_cap: number;
  latest_price: number;
}

// Stock Analysis Types
export interface StockModule {
  module_name: string;
  description: string;
  key_metrics: MetricItem[];
  trends: TrendItem[];
  rules: RuleItem[];
  red_flags: RedFlag[];
  positive_points: string[];
  analysis_narrative: string;
}

export interface MetricItem {
  name: string;
  value: number;
  format: 'ratio' | 'percentage' | 'currency' | 'number';
  tooltip?: string;
}

export interface TrendItem {
  label: string;
  data: number[];
  yoy_growth: number;
  insight: string;
}

export interface RuleItem {
  flag: 'GREEN' | 'YELLOW' | 'RED';
  name: string;
  reason: string;
}

export interface RedFlag {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  detail: string;
}

export interface StockAnalysis {
  ticker: string;
  company_name: string;
  industry: string;
  modules: StockModule[];
  health_score: number;
  summary_metrics: {
    de_ratio: number;
    roe: number;
    ccc: number;
    capex_intensity: number;
    asset_turnover: number;
    ocf_debt: number;
  };
  rule_counts: {
    green: number;
    yellow: number;
    red: number;
  };
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  includeIndustrySummary: boolean;
  includeBenchmarks: boolean;
  includeStockAnalysis: boolean;
}
