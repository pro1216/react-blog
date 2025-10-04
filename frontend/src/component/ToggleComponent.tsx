// src/ThemeToggle.tsx
import React, { useEffect, useState } from 'react';
import { getInitialTheme, applyThemeToDocument, setStoredTheme, Theme } from '../theme';
import { TiAdjustBrightness,TiAdjustContrast  } from "react-icons/ti";
import { IconBaseProps } from "react-icons";

export function ToggleComponent(){
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [prev, setPrev] = useState(false);

  useEffect(() => {
    applyThemeToDocument(theme);
    setStoredTheme(theme);
  }, [theme]);

  useEffect(() => {
    // システムの変更（ユーザーがOSテーマを切り替えた場合）
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const handle = (e: MediaQueryListEvent) => {
      // ユーザーが明示的に保存している場合は上書きしない
      const stored = localStorage.getItem('theme-preference');
      if (stored) return;
      setTheme(e.matches ? 'dark' : 'light');
    };
    if (mq && mq.addEventListener) {
      mq.addEventListener('change', handle);
      return () => mq.removeEventListener('change', handle);
    } else if (mq && mq.addListener) {
      mq.addListener(handle);
      return () => mq.removeListener(handle);
    }
  }, []);

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const DarkIcon = TiAdjustContrast as (props: IconBaseProps) => JSX.Element;
  const LightIcon = TiAdjustBrightness as (props: IconBaseProps) => JSX.Element;
  return (
    <div
      id="theme-toggle"
      aria-label="Toggle color theme"
      onClick={toggle}
    >
      {theme === 'dark' ? <DarkIcon size={22}/> : <LightIcon size={22} />}
    </div>
  );
};
export default ToggleComponent;