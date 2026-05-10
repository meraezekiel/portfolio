import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useWhatIDoSectionHandler = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.what-i-do-section__heading-line', {
        opacity: 0,
        x: -40,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.skill-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.what-i-do-section__cards',
          start: 'top 80%',
        },
      });

      gsap.from('.skill-card__chip', {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.what-i-do-section__cards',
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
};
