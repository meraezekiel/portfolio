import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../../../../../../components/SmoothScroll/implementation/lenisInstance';
import { scrollPositionForCard } from './scrollPositionForCard';

gsap.registerPlugin(ScrollTrigger);

export const useHorizontalScrollHandler = (sectionRef, trackRef, progressRef) => {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Keyboard focus on an off-screen card: scroll the page so the scrub brings that card into view.
      const handleFocusIn = (e) => {
        const card = e.target.closest('.project-card');
        const trigger = tween.scrollTrigger;
        if (!card || !trigger) return;
        const y = scrollPositionForCard({
          start: trigger.start,
          end: trigger.end,
          distance: distance(),
          gutter: parseFloat(getComputedStyle(track).paddingLeft) || 0,
          cardLeft: card.offsetLeft,
        });
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
      };
      track.addEventListener('focusin', handleFocusIn);

      return () => track.removeEventListener('focusin', handleFocusIn);
    });

    return () => mm.revert();
  }, [sectionRef, trackRef, progressRef]);
};
