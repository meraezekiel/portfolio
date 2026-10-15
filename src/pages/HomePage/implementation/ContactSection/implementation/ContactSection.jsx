import { useContactSectionHandler } from './useContactSectionHandler';
import { BentoTile } from '../../../../../components/BentoTile';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import './ContactSection.scss';

const SOCIAL_LABELS = { github: 'GitHub', linkedin: 'LinkedIn', twitter: 'X / Twitter' };

export const ContactSection = () => {
  const { email, resumeUrl, socials, name } = PORTFOLIO_CONFIG;
  const { sectionRef, copied, copyEmail } = useContactSectionHandler({ email });

  const links = [
    ...Object.entries(socials)
      .filter(([, url]) => Boolean(url))
      .map(([key, url]) => ({ label: SOCIAL_LABELS[key] ?? key, url, external: true })),
    resumeUrl && { label: 'Résumé', url: resumeUrl, external: true },
    { label: 'Email', url: `mailto:${email}`, external: false },
  ].filter(Boolean);

  return (
    <section id="contact" className="contact-section bento-section" ref={sectionRef}>
      <h2 className="bento-section__heading">Let's <span>work together</span></h2>
      <div className="contact-section__grid">
        <BentoTile glow className="contact-section__main">
          <p className="contact-section__title">
            Have a project<br />in mind?
          </p>
          <p className="contact-section__text">
            Tell me what you're building. I usually reply within a day.
          </p>
          <div className="contact-section__email">
            <a href={`mailto:${email}`} className="contact-section__address">{email}</a>
            <button type="button" className="contact-section__copy" onClick={copyEmail}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <span className="contact-section__sr" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>
        </BentoTile>

        <BentoTile as="nav" className="contact-section__links" aria-label="Contact links">
          {links.map(({ label, url, external }) => (
            <a
              key={label}
              href={url}
              className="contact-section__link"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </BentoTile>
      </div>

      <footer className="contact-section__footer">
        <span>© {new Date().getFullYear()} {name}</span>
        <span>Designed &amp; built with care.</span>
      </footer>
    </section>
  );
};
