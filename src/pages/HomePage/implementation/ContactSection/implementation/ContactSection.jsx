import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import { ArrowIcon } from '../../../../../components/ArrowIcon';
import { useContactViewHandler } from '../../ContactView/implementation/useContactViewHandler';
import './ContactSection.scss';

// The link still opens a mail app where there is one; the copy covers phones and PCs without one.
export const ContactSection = () => {
  const { email } = PORTFOLIO_CONFIG;
  const { copied, copyEmail } = useContactViewHandler(email);

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-section__title">Have a project in mind?</h2>
      <a href={`mailto:${email}`} className="contact-section__email" onClick={copyEmail}>
        {copied ? 'Email copied' : email}
        <ArrowIcon size={14} color="var(--accent)" />
      </a>
      <span className="contact-section__sr" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
    </section>
  );
};
