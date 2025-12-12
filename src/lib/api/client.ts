/**
 * API Client Configuration
 * 
 * Axios wrapper with sensible defaults for the local backend.
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

/**
 * Default API base URL - falls back to local dev server
 */
const DEFAULT_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Get the API base URL from environment or use default
 */
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;
};

/**
 * Create and configure the Axios instance
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 15000,
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
 * Generic request helper with typed response
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
