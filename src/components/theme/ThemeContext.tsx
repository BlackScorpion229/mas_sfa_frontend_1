import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import {
  ThemeMode,
  AccentId,
  ThemeConfig,
  defaultThemeConfig,
  getStoredThemeConfig,
  saveThemeConfig,
  applyAccentColors,
} from '@/lib/theme-utils';

interface ThemeContextValue {
  // Mode
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedMode: 'light' | 'dark';
  
  // Accent
  accentId: AccentId;
  setAccentId: (id: AccentId) => void;
  customHex: string;
  setCustomHex: (hex: string) => void;
  
  // Actions
  resetToDefaults: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeConfigProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [accentId, setAccentIdState] = useState<AccentId>(defaultThemeConfig.accentId);
  const [customHex, setCustomHexState] = useState<string>('#2563eb');

  // Initialize from storage
  useEffect(() => {
    setMounted(true);
    const stored = getStoredThemeConfig();
    if (stored) {
      setAccentIdState(stored.accentId);
      if (stored.customHex) {
        setCustomHexState(stored.customHex);
      }
      applyAccentColors(stored.accentId, stored.customHex);
    } else {
      applyAccentColors(defaultThemeConfig.accentId);
    }
  }, []);

  // Apply accent colors when they change
  useEffect(() => {
    if (mounted) {
      applyAccentColors(accentId, customHex);
    }
  }, [accentId, customHex, mounted]);

  const setMode = (mode: ThemeMode) => {
    setTheme(mode);
    const config: ThemeConfig = { mode, accentId, customHex };
    saveThemeConfig(config);
  };

  const setAccentId = (id: AccentId) => {
    setAccentIdState(id);
    const config: ThemeConfig = { 
      mode: (theme as ThemeMode) || 'system', 
      accentId: id, 
      customHex 
    };
    saveThemeConfig(config);
  };

  const setCustomHex = (hex: string) => {
    setCustomHexState(hex);
    if (accentId === 'custom') {
      const config: ThemeConfig = { 
        mode: (theme as ThemeMode) || 'system', 
        accentId: 'custom', 
        customHex: hex 
      };
      saveThemeConfig(config);
    }
  };

  const resetToDefaults = () => {
    setTheme(defaultThemeConfig.mode);
    setAccentIdState(defaultThemeConfig.accentId);
    setCustomHexState('#2563eb');
    saveThemeConfig(defaultThemeConfig);
    applyAccentColors(defaultThemeConfig.accentId);
  };

  const value: ThemeContextValue = {
    mode: (theme as ThemeMode) || 'system',
    setMode,
    resolvedMode: (resolvedTheme as 'light' | 'dark') || 'dark',
    accentId,
    setAccentId,
    customHex,
    setCustomHex,
    resetToDefaults,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeConfig must be used within ThemeConfigProvider');
  }
  return context;
}
