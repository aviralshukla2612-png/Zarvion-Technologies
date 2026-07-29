// src/utils/theme.js

export const THEME_KEY = 'zarvion-theme';
export const THEMES = { DARK: 'dark', LIGHT: 'light' };

export function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return THEMES.DARK;
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? THEMES.LIGHT
    : THEMES.DARK;
}

export function getStoredTheme() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === THEMES.DARK || stored === THEMES.LIGHT ? stored : null;
  } catch {
    return null;
  }
}

export function getInitialTheme() {
  return getStoredTheme() || THEMES.DARK;
}

export function persistTheme(theme) {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* localStorage unavailable — theme just won't persist across reloads */
  }
}

export function applyTheme(theme) {
  const root = document.documentElement;

  root.classList.add('theme-transition');
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;

  window.clearTimeout(applyTheme._t);
  applyTheme._t = window.setTimeout(() => {
    root.classList.remove('theme-transition');
  }, 320);
}