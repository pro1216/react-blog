// src/theme.ts
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme-preference';

export function getSystemTheme(): Theme | null {
  if (typeof window === 'undefined' || !window.matchMedia) return null;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'dark' || v === 'light' ? v : null;
  } catch {
    return null;
  }
}

export function setStoredTheme(theme: Theme) {
  try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
}

export function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

export function getInitialTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  const sys = getSystemTheme();
  if (sys) return sys;
  return 'light';
}
