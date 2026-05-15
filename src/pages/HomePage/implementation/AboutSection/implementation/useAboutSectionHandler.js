import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useAboutSectionHandler = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.about-section__heading', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section__copy',
          start: 'top 80%',
        },
      });

      gsap.from('.about-section__paragraph', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section__copy',
          start: 'top 75%',
        },
      });

      gsap.from('.about-section__scene', {
        opacity: 0,
        x: -60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
};
