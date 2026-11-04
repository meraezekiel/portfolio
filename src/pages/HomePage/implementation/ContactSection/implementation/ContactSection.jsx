import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import './ContactSection.scss';

export const ContactSection = () => (
  <section id="contact" className="contact-section">
    <h2 className="contact-section__title">Have a project in mind?</h2>
    <a href={`mailto:${PORTFOLIO_CONFIG.email}`} className="contact-section__email">
      {PORTFOLIO_CONFIG.email}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 3h6v6M3 11L11 3" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </a>
  </section>
);
