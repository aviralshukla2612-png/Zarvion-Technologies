// src/context/ThemeContext.jsx

import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import {
  THEMES,
  getInitialTheme,
  getStoredTheme,
  getSystemTheme,
  persistTheme,
  applyTheme
} from '../utils/theme';

export const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  const hasExplicitChoice = useRef(Boolean(getStoredTheme()));

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (next !== THEMES.DARK && next !== THEMES.LIGHT) return;
    hasExplicitChoice.current = true;
    persistTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
      hasExplicitChoice.current = true;
      persistTheme(next);
      return next;
    });
  }, []);

  const value = { theme, toggleTheme, setTheme, isDark: theme === THEMES.DARK };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}