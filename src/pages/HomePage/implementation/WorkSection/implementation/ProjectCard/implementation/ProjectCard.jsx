import { useProjectCardHandler } from './useProjectCardHandler';
import { ProjectImage } from '../../../../../../../components/ProjectImage/implementation/ProjectImage';
import './ProjectCard.scss';

export const ProjectCard = ({ project, index = 0, onOpen }) => {
  const { handleOpen } = useProjectCardHandler(project.slug, onOpen);
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="project-card" data-cursor-hover>
      <div className="project-card__media">
        <ProjectImage slug={project.slug} file={project.images?.[0]} alt={project.title} label={project.title} />
      </div>
      <div className="project-card__body">
        <span className="project-card__index">{number}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__pitch">{project.pitch}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
        <span className="project-card__cta" aria-hidden="true">View case study →</span>
      </div>
      <button
        type="button"
        className="project-card__open"
        onClick={handleOpen}
        aria-label={`Open ${project.title} case study`}
      />
      {project.link && (
        <a
          className="project-card__live"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live site`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3h6v6M3 11L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
      )}
    </article>
  );
};
