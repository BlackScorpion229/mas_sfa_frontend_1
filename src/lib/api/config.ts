/**
 * API Configuration
 * 
 * Single source of truth for API base URL and configuration.
 * 
 * Environment Variables:
 * -----------------------
 * DEV (default if not set):
 *   VITE_API_BASE_URL=http://127.0.0.1:8000
 * 
 * PROD:
 *   VITE_API_BASE_URL=https://api.myprod.com
 * 
 * To change the API base URL:
 * 1. Create a .env.local file in the project root
 * 2. Add: VITE_API_BASE_URL=https://your-api-url.com
 * 3. Restart the dev server
 */

/**
 * Default API base URL - falls back to local dev server
 */
export const DEFAULT_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Get the API base URL from environment or use default
 */
export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL;

/**
 * Request timeout in milliseconds
 */
export const REQUEST_TIMEOUT = 15000;
