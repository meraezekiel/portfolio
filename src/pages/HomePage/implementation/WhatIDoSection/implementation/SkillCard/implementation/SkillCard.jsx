import { useSkillCardHandler } from './useSkillCardHandler';
import './SkillCard.scss';

export const SkillCard = ({ title, subtitle, description, skills }) => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useSkillCardHandler();

  return (
    <article
      className={`skill-card ${isHovered ? 'skill-card--hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      <span className="skill-card__corner skill-card__corner--tl" />
      <span className="skill-card__corner skill-card__corner--tr" />
      <span className="skill-card__corner skill-card__corner--bl" />
      <span className="skill-card__corner skill-card__corner--br" />

      <h3 className="skill-card__title">{title}</h3>
      {subtitle && <p className="skill-card__subtitle">{subtitle}</p>}
      {description && <p className="skill-card__description">{description}</p>}

      {skills?.length > 0 && (
        <>
          <span className="skill-card__chips-label">Skillset & Tools</span>
          <div className="skill-card__chips">
            {skills.map((skill) => (
              <span key={skill} className="skill-card__chip">{skill}</span>
            ))}
          </div>
        </>
      )}
    </article>
  );
};
