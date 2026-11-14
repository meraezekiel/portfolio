import { ViewLink } from '../../ViewLink';
import { PORTFOLIO_CONFIG, NAV_LINKS } from '../../../constants/portfolio';
import profile from '../../../assets/images/profile.jpg';
import './PortfolioSidebar.scss';

const SUN_ICON = 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3z';
const MOON_ICON = 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z';

export const PortfolioSidebar = ({ theme, onToggleTheme }) => {
  const {
    name, handle, email, socials, resume,
  } = PORTFOLIO_CONFIG;

  return (
    <aside className="portfolio-sidebar">
      <div className="portfolio-sidebar__profile">
        <div className="portfolio-sidebar__avatar">
          <img src={profile} alt={name} />
        </div>
        <div className="portfolio-sidebar__name">
          <span>{name}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#2f7cf6" />
            <path d="m8 12.5 2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="portfolio-sidebar__handle">{handle}</span>
        <div className="portfolio-sidebar__actions">
          {socials.github && (
            <a href={socials.github} aria-label="GitHub" className="portfolio-sidebar__action" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg>
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} aria-label="LinkedIn" className="portfolio-sidebar__action" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
          )}
          {resume && (
            <a href={resume} download aria-label="Download resume" title="Download resume" className="portfolio-sidebar__action">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 12v6m0 0-2.5-2.5M12 18l2.5-2.5" /></svg>
            </a>
          )}
          <a href={`mailto:${email}`} aria-label="Email" className="portfolio-sidebar__action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          </a>
          <button type="button" aria-label="Toggle dark mode" className="portfolio-sidebar__action" onClick={onToggleTheme}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={theme === 'dark' ? SUN_ICON : MOON_ICON} /></svg>
          </button>
        </div>
      </div>

      <div className="portfolio-sidebar__divider" />

      <nav className="portfolio-sidebar__nav" aria-label="Main">
        {NAV_LINKS.map(({ id, label, icon }) => (
          <ViewLink
            key={id}
            to={id}
            className="portfolio-sidebar__link"
            activeClassName="portfolio-sidebar__link--active"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>
            {label}
          </ViewLink>
        ))}
      </nav>

      <div className="portfolio-sidebar__footer">© {new Date().getFullYear()} · Designed &amp; built with care.</div>
    </aside>
  );
};
