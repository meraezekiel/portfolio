import { getLenis } from '../components/SmoothScroll/implementation/lenisInstance';

// Smoothly scroll to a section by id, through Lenis when it is running.
export const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target, { offset: -72 });
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
