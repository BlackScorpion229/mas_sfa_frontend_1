# API Module

This module contains all external server integration logic for the application.
This is the **only place** that communicates with the backend at `127.0.0.1:8000`.

## Quick Start

### 1. Start the Backend

```bash
# From the backend directory
python -m src.main
# Backend runs at http://127.0.0.1:8000
```

### 2. Start the Frontend

```bash
npm run dev
# Frontend runs at http://localhost:5173
```

### 3. Test Connectivity

```bash
# Run the test script to verify API connectivity
npx tsx scripts/test-api.ts
```

## Configuration

### Environment Variables

Set the API base URL using environment variables:

```bash
# Development (default if not set)
VITE_API_BASE_URL=http://127.0.0.1:8000

# Production
VITE_API_BASE_URL=https://api.myprod.com
```

Create a `.env.local` file in the project root to override defaults:

```bash
# .env.local
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Available Endpoints

### Industry & Stock Endpoints

| Function | Endpoint | Description |
|----------|----------|-------------|
| `postIndustryBenchmark(industryName)` | POST `/industry-benchmark` | Get industry benchmark data (uses mock fallback if endpoint not available) |
| `postStockFundamentals(ticker, industry?, includeContext?)` | POST `/stock-fundamentals` | Get stock fundamental analysis |
| `postAnalyzeStock(ticker)` | POST `/analyze-stock` | Run stock analysis |
| `postChat(payload)` | POST `/chat` | Send chat message |

### Module Analyze Endpoints

These endpoints call specific financial analysis modules:

| Function | Endpoint | Description |
|----------|----------|-------------|
| `postBorrowingsAnalyze(payload)` | POST `/borrowings/analyze` | Analyze company borrowings |
| `postAssetQualityAnalyze(payload)` | POST `/asset_quality/analyze` | Analyze asset quality |
| `postWorkingCapitalAnalyze(payload)` | POST `/working_capital_module/analyze` | Analyze working capital |
| `postCapexCwipAnalyze(payload)` | POST `/capex_cwip_module/analyze` | Analyze capex and CWIP |
| `postLiquidityAnalyze(payload)` | POST `/liquidity/analyze` | Analyze liquidity |
| `postAllModulesAnalyze(payload)` | All above | Run all module analyses in parallel |

## Usage Examples

### Basic Usage

```typescript
import { postIndustryBenchmark, postBorrowingsAnalyze, isApiError } from '@/lib/api';

// Fetch industry data (with mock fallback)
try {
  const industryData = await postIndustryBenchmark('Banking');
  console.log(industryData);
} catch (error) {
  if (isApiError(error)) {
    console.error(`Error ${error.status}: ${error.message}`);
  }
}

// Analyze borrowings
const financialPayload = {
  company: "BBOX",
  financial_data: {
    financial_years: [
      { year: 2021, total_equity: 33, borrowings: 328, /* ... */ }
    ]
  }
};

const analysis = await postBorrowingsAnalyze(financialPayload);
```

### Payload Normalization

The API module automatically normalizes payloads before sending:
- Converts keys to `snake_case` (e.g., `Trade_receivables` → `trade_receivables`)
- Converts percentage strings to decimals (e.g., `"32.97%"` → `0.3297`)
- Converts numeric strings to numbers

```typescript
import { normalizePayload } from '@/lib/api';

const input = {
  Trade_receivables: 240,
  material_cost: "32.97%",
  someValue: "123"
};

const normalized = normalizePayload(input);
// {
//   trade_receivables: 240,
//   material_cost: 0.3297,
//   some_value: 123
// }
```

## Mock Fallback for Industry Analysis

The `/industry-benchmark` endpoint may not be available on the backend yet. When this happens:

1. The API call returns 404/501 or a network error
2. The module falls back to mock data from `mockIndustryBenchmark.ts`
3. A console warning is logged: "⚠️ Using local mock for industry analysis..."
4. You can check if mock data is being used: `isUsingMockIndustryData()`

When the backend implements this endpoint, simply remove the fallback logic from `endpoints.ts`.

## CORS Configuration

During local development, ensure your backend allows CORS from the frontend origin.

### Backend CORS Setup (FastAPI example)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Alternative: Vite Proxy

Configure Vite to proxy API requests to avoid CORS issues:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

Then set `VITE_API_BASE_URL=/api` in development.

## Error Handling

All API functions throw `ApiError` on non-2xx responses:

```typescript
interface ApiError {
  status: number;    // HTTP status code (0 for network errors)
  message: string;   // Human-readable error message
  body?: unknown;    // Raw response body if available
}
```

### 422 Validation Errors

Validation errors (HTTP 422) are handled specially:
- The full validation details are logged to console
- A human-readable error message is extracted
- The original validation body is preserved

```typescript
try {
  await postBorrowingsAnalyze(invalidPayload);
} catch (error) {
  if (isApiError(error) && error.status === 422) {
    console.log('Validation failed:', error.message);
    console.log('Details:', error.body);
  }
}
```

## Testing

### Manual Testing

1. Start the backend at `http://127.0.0.1:8000`
2. Open the frontend and go to Industry Analysis
3. Select an industry - if mock is used, you'll see a console warning
4. Go to Stock Analysis and select a stock
5. Click "Run Fundamental Analysis"
6. Check the Network tab for POST requests to module endpoints

### Test Script

Run the connectivity test:

```bash
npx tsx scripts/test-api.ts
```

This tests:
- `/industry-benchmark` endpoint (shows mock fallback if not available)
- `/borrowings/analyze` endpoint with sample payload

## File Structure

```
src/lib/api/
├── config.ts          # API base URL and configuration
├── client.ts          # Axios and fetch wrappers
├── endpoints.ts       # Typed API functions
├── types.ts           # TypeScript interfaces
├── normalize.ts       # Payload normalization utilities
├── mockIndustryBenchmark.ts  # Mock data for industry fallback
├── index.ts           # Re-exports
└── README.md          # This file
```
