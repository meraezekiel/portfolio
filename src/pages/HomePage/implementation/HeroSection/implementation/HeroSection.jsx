import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import { ArrowIcon } from '../../../../../components/ArrowIcon';
import { ViewLink } from '../../../../../components/ViewLink';
import './HeroSection.scss';

const DOWNLOAD_ICON = 'M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2';

export const HeroSection = () => (
  <header id="hero" className="hero-section">
    <div className="hero-section__intro">
      <h1 className="hero-section__title">Ship it clean. Keep it fast.</h1>
      <p className="hero-section__pitch">
        Full Stack Developer with {PORTFOLIO_CONFIG.experience} years of experience building scalable web applications using React.js, Next.js, Node.js, and NestJS.
      </p>
    </div>
    <div className="hero-section__actions">
      {PORTFOLIO_CONFIG.resume && (
        <a href={PORTFOLIO_CONFIG.resume} download className="hero-section__cta hero-section__cta--ghost">
          Resume
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={DOWNLOAD_ICON} /></svg>
        </a>
      )}
      {/* Opens the Contact view: a mailto: link does nothing on devices without a mail app. */}
      <ViewLink to="contact" className="hero-section__cta">
        Get in touch
        <ArrowIcon size={14} color="var(--accent)" />
      </ViewLink>
    </div>
  </header>
);
