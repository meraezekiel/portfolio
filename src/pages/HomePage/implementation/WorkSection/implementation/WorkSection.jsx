import { useWorkSectionHandler } from './useWorkSectionHandler';
import { ProjectCard } from './ProjectCard';
import { CaseStudyPanel } from './CaseStudyPanel';
import './WorkSection.scss';

export const WorkSection = () => {
  const {
    sectionRef, trackRef, progressRef, projects, activeProject, panelProject, openProject, closeProject,
  } = useWorkSectionHandler();

  return (
    <section id="work" className="work-section" ref={sectionRef}>
      <header className="work-section__header">
        <h2 className="work-section__heading">
          <span>SELECTED</span>
          <span className="work-section__heading--accent">WORK</span>
        </h2>
        <div className="work-section__meta">
          <p className="work-section__subtitle">
            Apps I've designed and built end to end — web, mobile and desktop. Pick one for the full story.
          </p>
          <div className="work-section__progress" aria-hidden="true">
            <span ref={progressRef} className="work-section__progress-bar" />
          </div>
        </div>
      </header>

      <div className="work-section__track" ref={trackRef}>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} onOpen={openProject} />
        ))}
      </div>

      <CaseStudyPanel project={panelProject} open={Boolean(activeProject)} onClose={closeProject} />
    </section>
  );
};
