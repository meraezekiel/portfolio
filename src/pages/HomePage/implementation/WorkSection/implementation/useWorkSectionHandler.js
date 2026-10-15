import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../../../../constants/portfolio';
import { useCaseStudyRouteHandler } from './handler/useCaseStudyRouteHandler';

gsap.registerPlugin(ScrollTrigger);

export const useWorkSectionHandler = () => {
  const sectionRef = useRef(null);
  const lastProjectRef = useRef(null);

  const { activeSlug, openProject, closeProject } = useCaseStudyRouteHandler(PROJECTS);

  const activeProject = PROJECTS.find((project) => project.slug === activeSlug) ?? null;
  // Keep the last project mounted so the panel can slide out with its content.
  if (activeProject) lastProjectRef.current = activeProject;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.bento-section__heading, .project-card', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    projects: PROJECTS,
    activeProject,
    panelProject: lastProjectRef.current,
    openProject,
    closeProject,
  };
};
