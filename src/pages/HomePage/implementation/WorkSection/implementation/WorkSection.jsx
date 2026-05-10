import { useWorkSectionHandler } from './useWorkSectionHandler';
import { ProjectCard } from './ProjectCard';
import { PROJECTS } from '../../../../../constants/portfolio';
import './WorkSection.scss';

export const WorkSection = () => {
  const { sectionRef } = useWorkSectionHandler();

  return (
    <section id="work" className="work-section" ref={sectionRef}>
      <header className="work-section__header">
        <h2 className="work-section__heading">
          <span>SELECTED</span>
          <span className="work-section__heading--accent">WORK</span>
        </h2>
        <p className="work-section__subtitle">
          A few things I've shipped recently — production apps, side projects, and experiments.
        </p>
      </header>

      <div className="work-section__grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            image={project.image}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};
