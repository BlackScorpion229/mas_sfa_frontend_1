// Theme utilities for color manipulation and persistence

export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentId = 'blue' | 'teal' | 'emerald' | 'rose' | 'amber' | 'indigo' | 'custom';

export interface ThemeConfig {
  mode: ThemeMode;
  accentId: AccentId;
  customHex?: string;
}

export const THEME_STORAGE_KEY = 'ai_theme';

// Preset accent palettes (HSL values for consistency with Tailwind)
export const accentPalettes: Record<Exclude<AccentId, 'custom'>, {
  name: string;
  hex: string;
  hsl: { h: number; s: number; l: number };
}> = {
  blue: { name: 'Blue', hex: '#2563eb', hsl: { h: 217, s: 91, l: 60 } },
  teal: { name: 'Teal', hex: '#14b8a6', hsl: { h: 173, s: 80, l: 40 } },
  emerald: { name: 'Emerald', hex: '#10b981', hsl: { h: 160, s: 84, l: 39 } },
  rose: { name: 'Rose', hex: '#f43f5e', hsl: { h: 350, s: 89, l: 60 } },
  amber: { name: 'Amber', hex: '#f59e0b', hsl: { h: 38, s: 92, l: 50 } },
  indigo: { name: 'Indigo', hex: '#6366f1', hsl: { h: 239, s: 84, l: 67 } },
};

// Convert hex to HSL
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 217, s: 91, l: 60 }; // Default blue

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Generate accent shade variants from base HSL
export function generateAccentShades(hsl: { h: number; s: number; l: number }): {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
} {
  const { h, s } = hsl;
  return {
    50: `${h} ${Math.min(s, 100)}% 97%`,
    100: `${h} ${Math.min(s, 100)}% 94%`,
    200: `${h} ${Math.min(s, 100)}% 86%`,
    300: `${h} ${Math.min(s, 100)}% 72%`,
    400: `${h} ${Math.min(s, 100)}% 58%`,
    500: `${h} ${s}% ${hsl.l}%`,
    600: `${h} ${s}% ${Math.max(hsl.l - 10, 25)}%`,
    700: `${h} ${s}% ${Math.max(hsl.l - 20, 20)}%`,
  };
}

// Validate hex color
export function isValidHex(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

// Get theme config from storage
export function getStoredThemeConfig(): ThemeConfig | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore errors
  }
  return null;
}

// Save theme config to storage and cookie
export function saveThemeConfig(config: ThemeConfig): void {
  if (typeof window === 'undefined') return;
  
  const configStr = JSON.stringify(config);
  localStorage.setItem(THEME_STORAGE_KEY, configStr);
  
  // Set cookie for SSR (expires in 1 year)
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${THEME_STORAGE_KEY}=${encodeURIComponent(configStr)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

// Apply accent colors to document
export function applyAccentColors(accentId: AccentId, customHex?: string): void {
  const root = document.documentElement;
  
  let shades: ReturnType<typeof generateAccentShades>;
  
  if (accentId === 'custom' && customHex && isValidHex(customHex)) {
    const hsl = hexToHsl(customHex);
    shades = generateAccentShades(hsl);
  } else if (accentId !== 'custom') {
    const palette = accentPalettes[accentId];
    shades = generateAccentShades(palette.hsl);
  } else {
    // Fallback to blue
    shades = generateAccentShades(accentPalettes.blue.hsl);
  }
  
  root.style.setProperty('--accent-50', shades[50]);
  root.style.setProperty('--accent-100', shades[100]);
  root.style.setProperty('--accent-200', shades[200]);
  root.style.setProperty('--accent-300', shades[300]);
  root.style.setProperty('--accent-400', shades[400]);
  root.style.setProperty('--accent-500', shades[500]);
  root.style.setProperty('--accent-600', shades[600]);
  root.style.setProperty('--accent-700', shades[700]);
}

// Default theme config
export const defaultThemeConfig: ThemeConfig = {
  mode: 'system',
  accentId: 'blue',
};
