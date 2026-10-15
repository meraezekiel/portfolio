import { useCallback, useEffect, useState } from 'react';
import { getLenis } from '../../SmoothScroll/implementation/lenisInstance';
import { resolveScrollTarget } from './resolveScrollTarget';

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
    const target = document.getElementById(id);
    if (!target) return;
    const destination = resolveScrollTarget(target);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(destination, { offset: 0 });
    else destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return { isScrolled, handleNavClick };
};
