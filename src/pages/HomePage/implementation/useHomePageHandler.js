import { useEffect } from 'react';

export const useHomePageHandler = () => {
  useEffect(() => {
    document.body.classList.add('portfolio-mode');
    return () => document.body.classList.remove('portfolio-mode');
  }, []);
};
