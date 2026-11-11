import { ViewLink } from '../../ViewLink';
import './SectionView.scss';

// Full-page layout for one section: back link, heading, intro, then the section's content.
export const SectionView = ({
  icon, title, intro, className = '', children,
}) => (
  <section className={`section-view ${className}`} aria-labelledby="section-view-title">
    <ViewLink to="hero" className="section-view__back">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      Back to overview
    </ViewLink>
    <header className="section-view__header">
      <span className="section-view__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>
      </span>
      <div className="section-view__titles">
        <h1 id="section-view-title" className="section-view__title">{title}</h1>
        {intro && <p className="section-view__intro">{intro}</p>}
      </div>
    </header>
    <div className="section-view__body">{children}</div>
  </section>
);
