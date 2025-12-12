/**
 * API Connectivity Test Script
 * 
 * Run this script to verify the local API is accessible:
 *   npx tsx scripts/test-api.ts
 * 
 * Or with Node.js (requires ts-node):
 *   npx ts-node scripts/test-api.ts
 * 
 * Make sure the backend is running at http://127.0.0.1:8000
 */

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

interface ApiError {
  status: number;
  message: string;
  body?: unknown;
}

async function testIndustryBenchmark(industryName: string): Promise<void> {
  console.log(`\n🔍 Testing POST /industry-benchmark with industry: "${industryName}"`);
  console.log(`   Base URL: ${API_BASE_URL}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/industry-benchmark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ industry_name: industryName }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      const error: ApiError = {
        status: response.status,
        message: `HTTP ${response.status}: ${response.statusText}`,
        body: errorBody,
      };
      throw error;
    }

    const data = await response.json();
    
    console.log('\n✅ Success! Response received:');
    console.log('   Industry Name:', data.industry_name);
    console.log('   Summary:', data.summary?.narrative?.slice(0, 100) + '...');
    console.log('   Revenue Trend:', data.revenue_trend?.trend_tag);
    console.log('   Capex Cycle:', data.capex_trend?.cycle);
    console.log('   Peer Stocks:', data.peer_stocks?.length || 0);
    console.log('   Key Insights:', data.key_insights?.length || 0);
    
  } catch (error) {
    if ((error as ApiError).status !== undefined) {
      const apiError = error as ApiError;
      console.error('\n❌ API Error:');
      console.error(`   Status: ${apiError.status}`);
      console.error(`   Message: ${apiError.message}`);
      if (apiError.body) {
        console.error(`   Body: ${JSON.stringify(apiError.body).slice(0, 200)}`);
      }
    } else if (error instanceof Error) {
      console.error('\n❌ Network/Connection Error:');
      console.error(`   ${error.message}`);
      console.error('\n   Make sure the backend is running at:', API_BASE_URL);
    } else {
      console.error('\n❌ Unknown error:', error);
    }
    process.exit(1);
  }
}

async function testStockFundamentals(ticker: string, industry: string): Promise<void> {
  console.log(`\n🔍 Testing POST /stock-fundamentals with ticker: "${ticker}"`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/stock-fundamentals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        ticker, 
        industry,
        include_industry_context: true 
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw {
        status: response.status,
        message: `HTTP ${response.status}: ${response.statusText}`,
        body: errorBody,
      };
    }

    const data = await response.json();
    
    console.log('\n✅ Success! Response received:');
    console.log('   Ticker:', data.ticker);
    console.log('   Company Name:', data.company_name);
    console.log('   Industry:', data.industry);
    console.log('   Health Score:', data.health_score);
    console.log('   Modules:', data.modules?.length || 0);
    
  } catch (error) {
    if ((error as ApiError).status !== undefined) {
      const apiError = error as ApiError;
      console.error('\n❌ API Error:');
      console.error(`   Status: ${apiError.status}`);
      console.error(`   Message: ${apiError.message}`);
    } else if (error instanceof Error) {
      console.error('\n❌ Network/Connection Error:', error.message);
    }
    // Don't exit, continue with other tests
  }
}

// Main execution
console.log('================================================');
console.log('  API Connectivity Test');
console.log('================================================');

testIndustryBenchmark('Banking')
  .then(() => testStockFundamentals('HDFC', 'Banking'))
  .then(() => {
    console.log('\n================================================');
    console.log('  All tests completed!');
    console.log('================================================\n');
  })
  .catch((err) => {
    console.error('Test suite failed:', err);
    process.exit(1);
  });
