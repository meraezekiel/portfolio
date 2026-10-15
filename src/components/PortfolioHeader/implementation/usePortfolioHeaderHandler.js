import { useCallback, useEffect, useState } from 'react';
import { scrollToSection } from '../../../utilities/ScrollToSection';

export const usePortfolioHeaderHandler = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    scrollToSection(id);
  }, []);

  return { isScrolled, handleNavClick };
};
