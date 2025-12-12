# API Module

This module contains all external server integration logic for the application.

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

## Usage

```typescript
import { postIndustryBenchmark, postStockFundamentals, isApiError } from '@/lib/api';

// Fetch industry data
try {
  const industryData = await postIndustryBenchmark('Banking');
  console.log(industryData);
} catch (error) {
  if (isApiError(error)) {
    console.error(`Error ${error.status}: ${error.message}`);
  }
}

// Fetch stock analysis
const stockData = await postStockFundamentals('RELIANCE', 'Energy', true);
```

## Available Endpoints

| Function | Endpoint | Description |
|----------|----------|-------------|
| `postIndustryBenchmark(industryName)` | POST `/industry-benchmark` | Get industry benchmark data |
| `postStockFundamentals(ticker, industry?, includeContext?)` | POST `/stock-fundamentals` | Get stock fundamental analysis |
| `postAnalyzeStock(ticker)` | POST `/analyze-stock` | Run stock analysis |
| `postChat(payload)` | POST `/chat` | Send chat message |

## CORS Configuration

During local development, ensure your backend allows CORS from the frontend origin.

### Backend CORS Setup (example for FastAPI)

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

You can configure Vite to proxy API requests to avoid CORS issues:

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

Use `isApiError()` to type-guard errors:

```typescript
try {
  await postIndustryBenchmark('Banking');
} catch (error) {
  if (isApiError(error)) {
    // Handle API error
    toast.error(error.message);
  } else {
    // Handle unexpected error
    throw error;
  }
}
```
