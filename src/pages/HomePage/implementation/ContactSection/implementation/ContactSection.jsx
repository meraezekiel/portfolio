import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import './ContactSection.scss';
import { ArrowIcon } from '../../../../../components/ArrowIcon';

export const ContactSection = () => (
  <section id="contact" className="contact-section">
    <h2 className="contact-section__title">Have a project in mind?</h2>
    <a href={`mailto:${PORTFOLIO_CONFIG.email}`} className="contact-section__email">
      {PORTFOLIO_CONFIG.email}
      <ArrowIcon size={14} color="var(--accent)" />
    </a>
  </section>
);
