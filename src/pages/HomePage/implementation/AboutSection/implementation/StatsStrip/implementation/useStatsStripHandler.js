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
          scrollTrigger: { trigger: strip, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
      gsap.from('.stats-strip__item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: strip, start: 'top 85%' },
      });
    }, strip);

    return () => ctx.revert();
  }, []);

  return { stripRef };
};
