import { useContactSectionHandler } from './useContactSectionHandler';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import './ContactSection.scss';

export const ContactSection = () => {
  const { sectionRef } = useContactSectionHandler();
  const socials = Object.entries(PORTFOLIO_CONFIG.socials).filter(([, url]) => Boolean(url));

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-section__inner">
        <span className="contact-section__eyebrow">LET'S WORK TOGETHER</span>
        <h2 className="contact-section__title">
          Have a project<br />in mind?
        </h2>

        <a
          href={`mailto:${PORTFOLIO_CONFIG.email}`}
          className="contact-section__email"
          data-cursor-hover
        >
          {PORTFOLIO_CONFIG.email}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5h10v10M5 15L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>

        {socials.length > 0 && (
          <div className="contact-section__socials">
            {socials.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-section__social"
                data-cursor-hover
              >
                {key.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </div>

      <footer className="contact-section__footer">
        <span>© {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}</span>
        <span>Designed & built with care.</span>
      </footer>
    </section>
  );
};
