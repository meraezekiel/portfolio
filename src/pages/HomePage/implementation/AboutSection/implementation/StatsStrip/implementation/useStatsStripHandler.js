import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useStatsStripHandler = () => {
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      strip.querySelectorAll('[data-count-to]').forEach((el) => {
        const target = Number(el.dataset.countTo);
        const counter = { value: 0 };
        el.textContent = '0';
        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: 'power2.out',
          // The strip is `display: contents` (no box of its own), so trigger on its tile.
          scrollTrigger: { trigger: el.closest('.stats-strip__item') ?? strip, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
    }, strip);

    return () => ctx.revert();
  }, []);

  return { stripRef };
};
