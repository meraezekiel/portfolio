import { useCallback, useRef } from 'react';
import { PROJECTS } from '../../../../../constants/portfolio';
import { useCaseStudyRouteHandler } from './handler/useCaseStudyRouteHandler';
import { useProjectCarouselHandler } from './handler/useProjectCarouselHandler';

export const useWorkSectionHandler = () => {
  const lastProjectRef = useRef(null);

  const { activeSlug, openProject, closeProject } = useCaseStudyRouteHandler(PROJECTS);

  const activeProject = PROJECTS.find((project) => project.slug === activeSlug) ?? null;
  // Keep the last project mounted so the panel can slide out with its content.
  if (activeProject) lastProjectRef.current = activeProject;

  const {
    current, select, pause, resume,
  } = useProjectCarouselHandler(PROJECTS.length, Boolean(activeProject));

  const shownProject = PROJECTS[current];
  const openShownProject = useCallback(
    () => openProject(shownProject.slug),
    [openProject, shownProject.slug],
  );

  return {
    projects: PROJECTS,
    current,
    shownProject,
    select,
    pause,
    resume,
    openShownProject,
    activeProject,
    panelProject: lastProjectRef.current,
    closeProject,
  };
};
