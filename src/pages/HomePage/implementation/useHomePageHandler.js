import {
  useCallback, useLayoutEffect, useState,
} from 'react';

const THEME_KEY = 'portfolio-theme';

const readTheme = () => {
  try {
    return window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

export const useHomePageHandler = () => {
  const [theme, setTheme] = useState(readTheme);

  // The theme lives on <body> because the case study panel is portalled there.
  // Layout effects so a saved dark theme never flashes light on load.
  useLayoutEffect(() => {
    document.body.classList.add('portfolio-mode');
    return () => document.body.classList.remove('portfolio-mode');
  }, []);

  useLayoutEffect(() => {
    document.body.dataset.theme = theme;
    return () => { delete document.body.dataset.theme; };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private browsing can block storage; the toggle still works for this visit.
    }
    setTheme(next);
  }, [theme]);

  return { theme, toggleTheme };
};
