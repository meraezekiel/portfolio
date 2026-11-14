import { useContactViewHandler } from './useContactViewHandler';
import { SectionView } from '../../../../../components/SectionView';
import { PORTFOLIO_CONFIG, CONTACT_NOTE, navLink } from '../../../../../constants/portfolio';
import './ContactView.scss';
import { ArrowIcon } from '../../../../../components/ArrowIcon';

const SOCIAL_LABELS = { github: 'GitHub', linkedin: 'LinkedIn' };

export const ContactView = () => {
  const { label, icon } = navLink('contact');
  const { email, socials, availability } = PORTFOLIO_CONFIG;
  const { copied, copyEmail } = useContactViewHandler(email);
  const links = Object.entries(socials).filter(([, url]) => Boolean(url));

  return (
    <SectionView icon={icon} title={label} intro="Questions, projects or just a hello — my inbox is open.">
      <div className="contact-view">
        <article className="section-view__card contact-view__main">
          {availability && (
            <span className="contact-view__status">
              <span aria-hidden="true" />
              {availability}
            </span>
          )}
          <h2 className="contact-view__title">Have a project in mind?</h2>
          <p className="section-view__text">{CONTACT_NOTE}</p>
          <div className="contact-view__email">
            <a href={`mailto:${email}`} className="contact-view__address">{email}</a>
            <button type="button" className="contact-view__copy" onClick={copyEmail} aria-label="Copy email address">
              {copied ? 'Copied' : 'Copy'}
            </button>
            <span className="contact-view__sr" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
          </div>
        </article>

        <nav className="section-view__card contact-view__links" aria-label="Elsewhere">
          <h2 className="section-view__card-title">Elsewhere</h2>
          <a href={`mailto:${email}`} className="contact-view__link">
            Email
            <ArrowIcon size={12} />
          </a>
          {PORTFOLIO_CONFIG.resume && (
            <a href={PORTFOLIO_CONFIG.resume} download className="contact-view__link">
              Resume (PDF)
              <ArrowIcon size={12} />
            </a>
          )}
          {links.map(([key, url]) => (
            <a key={key} href={url} className="contact-view__link" target="_blank" rel="noopener noreferrer">
              {SOCIAL_LABELS[key] ?? key}
              <ArrowIcon size={12} />
            </a>
          ))}
        </nav>
      </div>
    </SectionView>
  );
};
