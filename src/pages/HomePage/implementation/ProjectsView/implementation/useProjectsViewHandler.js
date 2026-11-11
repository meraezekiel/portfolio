import { useRef } from 'react';
import { PROJECTS } from '../../../../../constants/portfolio';
import { useCaseStudyRouteHandler } from '../../WorkSection/implementation/handler/useCaseStudyRouteHandler';

export const useProjectsViewHandler = () => {
  const lastProjectRef = useRef(null);
  const { activeSlug, openProject, closeProject } = useCaseStudyRouteHandler(PROJECTS);

  const activeProject = PROJECTS.find((project) => project.slug === activeSlug) ?? null;
  // Keep the last project mounted so the panel can slide out with its content.
  if (activeProject) lastProjectRef.current = activeProject;

  return {
    projects: PROJECTS,
    openProject,
    closeProject,
    panelOpen: Boolean(activeProject),
    panelProject: lastProjectRef.current,
  };
};
