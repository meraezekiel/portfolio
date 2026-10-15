import { useHeroSectionHandler } from './useHeroSectionHandler';
import { BentoTile } from '../../../../../components/BentoTile';
import {
  PORTFOLIO_CONFIG, PROJECTS, STACK_HIGHLIGHTS, STATS,
} from '../../../../../constants/portfolio';
import './HeroSection.scss';

export const HeroSection = () => {
  const { sectionRef, handleScrollTo } = useHeroSectionHandler();
  const { firstName, availability, latestProject } = PORTFOLIO_CONFIG;
  const latest = PROJECTS.find((project) => project.slug === latestProject);
  const [experience] = STATS;
  // How many of the optional tiles render; the grid rebalances for 0, 1 or 2 so it never has holes.
  const optionalTiles = Number(Boolean(availability)) + Number(Boolean(latest));

  return (
    <section id="hero" className="hero-section bento-section" ref={sectionRef}>
      <div className={`hero-section__grid hero-section__grid--optional-${optionalTiles}`}>
        <BentoTile glow className="hero-section__intro">
          <span className="bento-label">{'// Full-stack developer'}</span>
          <h1 className="hero-section__title">
            Hi, I'm {firstName}.<br />
            I build apps<br />
            that <span>ship</span>.
          </h1>
          <p className="hero-section__pitch">
            Web, mobile and desktop products, from offline point-of-sale systems to AI photo tools.
          </p>
          <div className="hero-section__actions">
            <a href="#work" className="bento-button bento-button--primary" onClick={(e) => handleScrollTo(e, 'work')}>
              View my work
            </a>
            <a href="#contact" className="bento-button bento-button--secondary" onClick={(e) => handleScrollTo(e, 'contact')}>
              Get in touch
            </a>
          </div>
        </BentoTile>

        <BentoTile className="hero-section__stat">
          <span className="hero-section__number">{experience.value}</span>
          <span>{experience.label}</span>
        </BentoTile>

        {availability && (
          <BentoTile accent className="hero-section__availability">
            <span className="hero-section__status">
              <span className="hero-section__dot" aria-hidden="true" />
              {availability.label}
            </span>
            <span className="hero-section__detail">{availability.detail}</span>
          </BentoTile>
        )}

        {latest && (
          <BentoTile
            as="a"
            href={`#work/${latest.slug}`}
            className="hero-section__latest"
            aria-label={`Latest project: ${latest.title}`}
          >
            <span className="bento-label">Latest project</span>
            <strong className="hero-section__latest-title">
              {latest.title}
              <span aria-hidden="true"> →</span>
            </strong>
          </BentoTile>
        )}

        <BentoTile className="hero-section__stack">
          <span className="bento-label">Stack</span>
          <div className="hero-section__chips">
            {STACK_HIGHLIGHTS.map((skill) => (
              <span key={skill} className="bento-chip">{skill}</span>
            ))}
          </div>
        </BentoTile>
      </div>
    </section>
  );
};
