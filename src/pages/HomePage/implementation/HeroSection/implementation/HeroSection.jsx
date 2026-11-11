import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import './HeroSection.scss';
import { ArrowIcon } from '../../../../../components/ArrowIcon';

export const HeroSection = () => (
  <header id="hero" className="hero-section">
    <div className="hero-section__intro">
      <h1 className="hero-section__title">Ship it clean. Keep it fast.</h1>
      <p className="hero-section__pitch">
        Full Stack Developer with {PORTFOLIO_CONFIG.experience} years of experience building scalable web applications using React.js, Next.js, Node.js, and NestJS.
      </p>
    </div>
    <a href={`mailto:${PORTFOLIO_CONFIG.email}`} className="hero-section__cta">
      Get in touch
      <ArrowIcon size={14} color="var(--accent)" />
    </a>
  </header>
);
