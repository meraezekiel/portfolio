import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PROJECTS } from '../../../../../constants/portfolio';
import { useHorizontalScrollHandler } from './handler/useHorizontalScrollHandler';
import { useCaseStudyRouteHandler } from './handler/useCaseStudyRouteHandler';

export const useWorkSectionHandler = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const lastProjectRef = useRef(null);

  useHorizontalScrollHandler(sectionRef, trackRef, progressRef);
  const { activeSlug, openProject, closeProject } = useCaseStudyRouteHandler(PROJECTS);

  const activeProject = PROJECTS.find((project) => project.slug === activeSlug) ?? null;
  // Keep the last project mounted so the panel can slide out with its content.
  if (activeProject) lastProjectRef.current = activeProject;

  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.work-section__heading span', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    trackRef,
    progressRef,
    projects: PROJECTS,
    activeProject,
    panelProject: lastProjectRef.current,
    openProject,
    closeProject,
  };
};
