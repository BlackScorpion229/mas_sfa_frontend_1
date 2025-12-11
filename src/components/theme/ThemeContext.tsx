import { useTheme as useNextTheme } from 'next-themes';
import { ThemeMode } from '@/lib/theme-utils';

// Simple hook that wraps next-themes for consistent API
export function useThemeConfig() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  return {
    mode: (theme as ThemeMode) || 'system',
    setMode: (mode: ThemeMode) => setTheme(mode),
    resolvedMode: (resolvedTheme as 'light' | 'dark') || 'dark',
  };
}
