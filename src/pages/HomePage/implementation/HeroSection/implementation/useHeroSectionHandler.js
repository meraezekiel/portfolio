import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import { useRoleRotationHandler } from './handler/useRoleRotationHandler';
import { useSplineCursorTrackingHandler } from './handler/useSplineCursorTrackingHandler';

export const useHeroSectionHandler = () => {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const { currentRole, glitchKey } = useRoleRotationHandler(PORTFOLIO_CONFIG.roles, 2400);
  const { handleSplineLoad } = useSplineCursorTrackingHandler();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-section__greeting', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.hero-section__title-line', {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.12,
        delay: 0.35,
        ease: 'power3.out',
      });
      gsap.from('.hero-section__role-prefix', {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      });
      gsap.from('.hero-section__resume', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return { nameRef, roleRef, currentRole, glitchKey, handleSplineLoad };
};
