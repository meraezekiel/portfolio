import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { scrollToSection } from '../../../../../utilities/ScrollToSection';

export const useHeroSectionHandler = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.bento-tile', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = useCallback((e, id) => {
    e.preventDefault();
    scrollToSection(id);
  }, []);

  return { sectionRef, handleScrollTo };
};
