import { useProjectCardHandler } from './useProjectCardHandler';
import './ProjectCard.scss';

export const ProjectCard = ({ title, description, tags, image, index = 0 }) => {
  const { cardRef, handleMouseMove } = useProjectCardHandler();

  return (
    <article
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      data-cursor-hover
    >
      <div className="project-card__glow" aria-hidden="true" />
      <div className="project-card__media">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="project-card__placeholder">
            <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
          </div>
        )}
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        {description && <p className="project-card__description">{description}</p>}
        {tags?.length > 0 && (
          <div className="project-card__tags">
            {tags.map((tag) => (
              <span key={tag} className="project-card__tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
