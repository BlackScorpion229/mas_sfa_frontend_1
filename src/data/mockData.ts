import { IndustryBenchmark, StockAnalysis, StockModule } from '@/types';

export const industries = [
  'Banking',
  'Healthcare',
  'Retail',
  'Cement',
  'Technology',
  'Consumer Durables',
  'Power',
  'Media & Entertainment',
];

export const generateIndustryBenchmark = (industryName: string): IndustryBenchmark => ({
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
});

const generateModule = (name: string, description: string): StockModule => ({
  module_name: name,
  description,
  key_metrics: [
    { name: 'Primary Metric', value: Math.random() * 2, format: 'ratio', tooltip: 'Key performance indicator' },
    { name: 'Growth Rate', value: Math.random() * 30, format: 'percentage', tooltip: 'Year-over-year growth' },
    { name: 'Absolute Value', value: Math.random() * 10000, format: 'currency', tooltip: 'In millions' },
  ],
  trends: [
    {
      label: 'Quarterly Trend',
      data: [65, 72, 68, 85, 92, 88, 95, 102],
      yoy_growth: 12.5,
      insight: 'Consistent upward trajectory with seasonal variations',
    },
  ],
  rules: [
    { flag: 'GREEN', name: 'Healthy Range', reason: 'Metric within optimal industry benchmarks' },
    { flag: 'YELLOW', name: 'Monitor Closely', reason: 'Approaching threshold limits' },
    { flag: 'GREEN', name: 'Trend Positive', reason: 'Improving over last 4 quarters' },
  ],
  red_flags: Math.random() > 0.7 ? [
    { severity: 'MEDIUM', title: 'Elevated Risk Indicator', detail: 'Recent quarter showed deviation from historical pattern' },
  ] : [],
  positive_points: [
    'Strong operational efficiency demonstrated',
    'Management track record supports outlook',
    'Industry tailwinds favorable',
  ],
  analysis_narrative: `The ${name.toLowerCase()} analysis reveals a company with solid fundamentals. Key metrics are tracking within healthy ranges with positive momentum. Management's strategic initiatives are bearing fruit, reflected in improving operational metrics. While some near-term headwinds exist, the overall trajectory remains encouraging for long-term investors.`,
});

export const generateStockAnalysis = (ticker: string, industry: string): StockAnalysis => ({
  ticker,
  company_name: `${ticker} Corporation Limited`,
  industry,
  modules: [
    generateModule('Borrowings Analysis', 'Analysis of debt structure, maturity profile, and leverage trends'),
    generateModule('Working Capital', 'Assessment of operational efficiency through receivables, payables, and inventory'),
    generateModule('Capex & CWIP', 'Capital expenditure patterns and project execution analysis'),
    generateModule('Asset Quality', 'Evaluation of fixed assets, intangibles, and asset utilization'),
    generateModule('Equity Funding', 'Analysis of equity issuances, reserves, and shareholder returns'),
    generateModule('Profitability', 'Margin analysis, cost structure, and earnings quality'),
    generateModule('Cash Flows', 'Operating, investing, and financing cash flow patterns'),
    generateModule('Liquidity', 'Short-term solvency and cash management assessment'),
    generateModule('Growth Quality', 'Sustainability and quality of revenue and earnings growth'),
    generateModule('Management Quality', 'Governance, capital allocation, and strategic execution'),
  ],
  health_score: Math.floor(Math.random() * 30) + 65,
  summary_metrics: {
    de_ratio: 0.65 + Math.random() * 0.8,
    roe: 12 + Math.random() * 15,
    ccc: 45 + Math.floor(Math.random() * 60),
    capex_intensity: 8 + Math.random() * 12,
    asset_turnover: 0.8 + Math.random() * 1.2,
    ocf_debt: 0.25 + Math.random() * 0.5,
  },
  rule_counts: {
    green: Math.floor(Math.random() * 15) + 10,
    yellow: Math.floor(Math.random() * 8) + 2,
    red: Math.floor(Math.random() * 4),
  },
});
