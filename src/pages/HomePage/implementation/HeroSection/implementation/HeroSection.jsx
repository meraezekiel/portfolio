import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import './HeroSection.scss';

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
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 3h6v6M3 11L11 3" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </a>
  </header>
);
