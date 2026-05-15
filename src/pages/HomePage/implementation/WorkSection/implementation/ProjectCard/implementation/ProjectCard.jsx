import { useProjectCardHandler } from './useProjectCardHandler';
import './ProjectCard.scss';

export const ProjectCard = ({ title, description, tags, image, link, index = 0 }) => {
  const { cardRef, handleMouseMove } = useProjectCardHandler();

  const Wrapper = link ? 'a' : 'article';
  const wrapperProps = link
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      ref={cardRef}
      className={`project-card${link ? ' project-card--linked' : ''}`}
      onMouseMove={handleMouseMove}
      data-cursor-hover
      {...wrapperProps}
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
        {link && (
          <span className="project-card__live" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3h6v6M3 11L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
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
    </Wrapper>
  );
};
