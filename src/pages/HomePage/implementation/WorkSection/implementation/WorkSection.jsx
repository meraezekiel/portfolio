import { useWorkSectionHandler } from './useWorkSectionHandler';
import { ProjectCard } from './ProjectCard';
import { CaseStudyPanel } from './CaseStudyPanel';
import { cardVariant } from './cardVariant';
import './WorkSection.scss';

export const WorkSection = () => {
  const {
    sectionRef, projects, activeProject, panelProject, openProject, closeProject,
  } = useWorkSectionHandler();

  return (
    <section id="work" className="work-section bento-section" ref={sectionRef}>
      <div className="work-section__header">
        <h2 className="bento-section__heading">Selected <span>work</span></h2>
        <p className="work-section__subtitle">
          Apps I've designed and built end to end. Pick one for the full story.
        </p>
      </div>

      <div className="work-section__grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            variant={cardVariant(index, projects.length)}
            onOpen={openProject}
          />
        ))}
      </div>

      <CaseStudyPanel project={panelProject} open={Boolean(activeProject)} onClose={closeProject} />
    </section>
  );
};
