/**
 * API Client Configuration
 * 
 * Axios wrapper with sensible defaults for the local backend.
 * Also provides a fetch-based alternative for easier future migration.
 * 
 * Environment Variables:
 * -----------------------
 * DEV:
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

import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from './types';
import { API_BASE, REQUEST_TIMEOUT } from './config';

/**
 * Get the API base URL (re-exported for convenience)
 */
export const getApiBaseUrl = (): string => API_BASE;

/**
 * Create and configure the Axios instance
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add authorization header if token exists
      // Uncomment and modify when auth is implemented:
      // const token = localStorage.getItem('auth_token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(normalizeError(error));
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      return Promise.reject(normalizeError(error));
    }
  );

  return client;
};

/**
 * Normalize errors to consistent ApiError interface
 */
export const normalizeError = (error: AxiosError): ApiError => {
  if (error.response) {
    // Server responded with error status
    const data = error.response.data as Record<string, unknown> | undefined;
    
    // Handle 422 validation errors specially
    if (error.response.status === 422) {
      console.error('Validation error details:', data);
      const detail = data?.detail;
      let message = 'Validation error';
      if (typeof detail === 'string') {
        message = detail;
      } else if (Array.isArray(detail) && detail.length > 0) {
        message = detail.map((d: { msg?: string; loc?: string[] }) => 
          d.msg || JSON.stringify(d)
        ).join('; ');
      }
      return {
        status: 422,
        message,
        body: data,
      };
    }
    
    return {
      status: error.response.status,
      message: (data?.message as string) || (data?.error as string) || error.message || 'An error occurred',
      body: data,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      status: 0,
      message: 'Network error: Unable to reach the server. Please check your connection.',
      body: undefined,
    };
  } else {
    // Error in request configuration
    return {
      status: 0,
      message: error.message || 'An unexpected error occurred',
      body: undefined,
    };
  }
};

/**
 * Check if an error is an ApiError
 */
export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  );
};

/**
 * The configured API client instance
 */
export const apiClient = createApiClient();

/**
 * Generic request helper with typed response (using Axios)
 */
export async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: unknown
): Promise<T> {
  const response = await apiClient.request<T>({
    method,
    url,
    data,
  });
  return response.data;
}

/**
 * Fetch-based API client (alternative to Axios)
 * 
 * This can be used instead of Axios for simpler use cases.
 * It's also easier to replace with other implementations later.
 * 
 * @param path - API path (e.g., "/borrowings/analyze")
 * @param options - Fetch options
 * @returns Parsed JSON response
 * @throws ApiError on non-2xx responses
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let body: unknown;
      try {
        body = await response.json();
      } catch {
        body = await response.text();
      }

      // Handle 422 validation errors specially
      if (response.status === 422) {
        console.error('Validation error details:', body);
        const detail = (body as Record<string, unknown>)?.detail;
        let message = 'Validation error';
        if (typeof detail === 'string') {
          message = detail;
        } else if (Array.isArray(detail) && detail.length > 0) {
          message = detail.map((d: { msg?: string }) => d.msg || JSON.stringify(d)).join('; ');
        }
        throw { status: 422, message, body } as ApiError;
      }

      throw {
        status: response.status,
        message: (body as Record<string, unknown>)?.message as string || 
                 (body as Record<string, unknown>)?.error as string || 
                 `HTTP ${response.status}`,
        body,
      } as ApiError;
    }

    return await response.json() as T;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (isApiError(error)) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw {
          status: 0,
          message: 'Request timed out. Please try again.',
          body: undefined,
        } as ApiError;
      }
      throw {
        status: 0,
        message: error.message || 'Network error: Unable to reach the server.',
        body: undefined,
      } as ApiError;
    }

    throw {
      status: 0,
      message: 'An unexpected error occurred',
      body: undefined,
    } as ApiError;
  }
}
