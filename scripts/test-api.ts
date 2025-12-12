/**
 * API Connectivity Test Script
 * 
 * Run this script to verify that the frontend can connect to the local backend.
 * 
 * Usage:
 *   npx tsx scripts/test-api.ts
 * 
 * Or with a custom API URL:
 *   API_BASE_URL=http://localhost:8080 npx tsx scripts/test-api.ts
 */

const API_BASE = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

interface ApiError {
  status: number;
  message: string;
  body?: unknown;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    throw {
      status: response.status,
      message: `HTTP ${response.status}`,
      body,
    } as ApiError;
  }

  return response.json() as Promise<T>;
}

async function testIndustryBenchmark() {
  console.log('\n📊 Testing /industry-benchmark...');
  console.log(`   POST ${API_BASE}/industry-benchmark`);

  try {
    const result = await apiFetch<unknown>('/industry-benchmark', {
      method: 'POST',
      body: JSON.stringify({ industry_name: 'Banking' }),
    });
    console.log('   ✅ Success! Response:', JSON.stringify(result, null, 2).slice(0, 500) + '...');
    return true;
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 404 || apiError.status === 501) {
      console.log(`   ⚠️ Endpoint not available (${apiError.status}) - mock fallback will be used`);
      return true;
    }
    console.error('   ❌ Error:', apiError);
    throw error;
  }
}

async function testBorrowingsAnalyze() {
  console.log('\n💰 Testing /borrowings/analyze...');
  console.log(`   POST ${API_BASE}/borrowings/analyze`);

  const samplePayload = {
    company: "BBOX",
    financial_data: {
      financial_years: [
        {
          year: 2021,
          total_equity: 33,
          reserves: 174,
          borrowings: 328,
          short_term_debt: 57,
          long_term_debt: 119,
          cwip: 0,
          lease_liabilities: 152,
          other_borrowings: 0,
          trade_payables: 516,
          trade_receivables: 240,
          advance_from_customers: 2,
          other_liability_items: 1251,
          inventories: 149,
          cash_equivalents: 410,
          loans_n_advances: 151,
          other_asset_items: 731,
          gross_block: 903,
          accumulated_depreciation: 281,
          investments: 0,
          preference_capital: 0,
          total_assets: 2303,
          intangible_assets: 314,
          fixed_assets: 622,
          revenue: 4674,
          operating_profit: 364,
          interest: 98,
          depreciation: 96,
          material_cost: 0.3297,
          manufacturing_cost: 0.1323,
          employee_cost: 0.3906,
          other_cost: 0.0695,
          expenses: 4310,
          net_profit: 78,
          other_income: -75,
          fixed_assets_purchased: -30,
          profit_from_operations: 407,
          working_capital_changes: -156,
          direct_taxes: 52,
          interest_paid_fin: -105,
          cash_from_operating_activity: 303,
          dividends_paid: 0,
          proceeds_from_shares: 116,
          proceeds_from_borrowings: 11,
          repayment_of_borrowings: -286
        }
      ]
    }
  };

  try {
    const result = await apiFetch<unknown>('/borrowings/analyze', {
      method: 'POST',
      body: JSON.stringify(samplePayload),
    });
    console.log('   ✅ Success! Response:', JSON.stringify(result, null, 2).slice(0, 500) + '...');
    return true;
  } catch (error) {
    const apiError = error as ApiError;
    console.error('   ❌ Error:', apiError.status, apiError.message);
    if (apiError.body) {
      console.error('   Response body:', JSON.stringify(apiError.body, null, 2));
    }
    throw error;
  }
}

async function testAllModules() {
  const modules = [
    { name: 'asset_quality', path: '/asset_quality/analyze' },
    { name: 'working_capital', path: '/working_capital_module/analyze' },
    { name: 'capex_cwip', path: '/capex_cwip_module/analyze' },
    { name: 'liquidity', path: '/liquidity/analyze' },
  ];

  console.log('\n🔄 Testing remaining module endpoints...');

  for (const mod of modules) {
    console.log(`   Testing ${mod.path}...`);
    try {
      await apiFetch<unknown>(mod.path, {
        method: 'POST',
        body: JSON.stringify({ company: "TEST", financial_data: { financial_years: [] } }),
      });
      console.log(`   ✅ ${mod.name} - OK`);
    } catch (error) {
      const apiError = error as ApiError;
      // 422 is expected with empty data, but confirms endpoint exists
      if (apiError.status === 422) {
        console.log(`   ✅ ${mod.name} - OK (endpoint exists, validation expected with test data)`);
      } else {
        console.log(`   ⚠️ ${mod.name} - ${apiError.status || 'Network error'}: ${apiError.message}`);
      }
    }
  }
}

// Main execution
console.log('🚀 API Connectivity Test');
console.log(`   Base URL: ${API_BASE}`);
console.log('   ----------------------------------------');

testIndustryBenchmark()
  .then(() => testBorrowingsAnalyze())
  .then(() => testAllModules())
  .then(() => {
    console.log('\n✅ All tests completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test suite failed');
    process.exit(1);
  });
