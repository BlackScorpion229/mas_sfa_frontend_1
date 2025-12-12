/**
 * Payload Normalizer
 * 
 * Normalizes frontend data to the format expected by the backend:
 * - Converts keys to snake_case
 * - Converts percentage strings (e.g., "32.97%") to decimal fractions (0.3297)
 * - Converts numeric strings to numbers
 */

/**
 * Convert a string from camelCase or PascalCase to snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toLowerCase();
}

/**
 * Parse a percentage string to decimal fraction
 * e.g., "32.97%" -> 0.3297
 */
export function parsePercentage(value: string): number {
  const match = value.match(/^(-?\d+(?:\.\d+)?)\s*%$/);
  if (match) {
    return parseFloat(match[1]) / 100;
  }
  throw new Error(`Invalid percentage format: ${value}`);
}

/**
 * Check if a string looks like a percentage
 */
export function isPercentageString(value: unknown): value is string {
  return typeof value === 'string' && /^-?\d+(?:\.\d+)?\s*%$/.test(value);
}

/**
 * Check if a string looks like a numeric value
 */
export function isNumericString(value: unknown): value is string {
  return typeof value === 'string' && /^-?\d+(?:\.\d+)?$/.test(value.trim());
}

/**
 * Normalize a single value:
 * - Percentage strings -> decimal fractions
 * - Numeric strings -> numbers
 * - Objects -> recursively normalized
 * - Arrays -> recursively normalized
 */
export function normalizeValue(value: unknown): unknown {
  if (isPercentageString(value)) {
    return parsePercentage(value);
  }
  
  if (isNumericString(value)) {
    return parseFloat(value);
  }
  
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }
  
  if (value !== null && typeof value === 'object') {
    return normalizePayload(value as Record<string, unknown>);
  }
  
  return value;
}

/**
 * Normalize an entire payload object:
 * - Convert all keys to snake_case
 * - Convert percentage strings to decimal fractions
 * - Convert numeric strings to numbers
 * - Recursively process nested objects and arrays
 * 
 * @example
 * const input = {
 *   Trade_receivables: 240,
 *   material_cost: "32.97%",
 *   someValue: "123"
 * };
 * const output = normalizePayload(input);
 * // {
 * //   trade_receivables: 240,
 * //   material_cost: 0.3297,
 * //   some_value: 123
 * // }
 */
export function normalizePayload<T extends Record<string, unknown>>(
  payload: T
): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(payload)) {
    const snakeKey = toSnakeCase(key);
    normalized[snakeKey] = normalizeValue(value);
  }
  
  return normalized;
}

/**
 * Normalize financial data payload for module analyze endpoints
 * This is a convenience wrapper that normalizes the entire payload structure
 */
export function normalizeFinancialPayload(payload: unknown): unknown {
  if (payload !== null && typeof payload === 'object') {
    return normalizePayload(payload as Record<string, unknown>);
  }
  return payload;
}
