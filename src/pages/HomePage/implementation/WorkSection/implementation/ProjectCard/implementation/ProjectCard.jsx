import { useProjectCardHandler } from './useProjectCardHandler';
import { BentoTile } from '../../../../../../../components/BentoTile';
import { ProjectImage } from '../../../../../../../components/ProjectImage/implementation/ProjectImage';
import './ProjectCard.scss';

export const ProjectCard = ({ project, variant = 'small', onOpen }) => {
  const { handleOpen } = useProjectCardHandler(project.slug, onOpen);

  return (
    <BentoTile as="article" className={`project-card project-card--${variant}`}>
      <div className="project-card__media">
        <ProjectImage slug={project.slug} file={project.images?.[0]} alt={project.title} label={project.title} />
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__pitch">{project.pitch}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="bento-chip bento-chip--accent">{tag}</span>
          ))}
        </div>
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
    </BentoTile>
  );
};
