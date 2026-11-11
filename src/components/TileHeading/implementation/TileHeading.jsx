import { ViewLink } from '../../ViewLink';
import { navLink } from '../../../constants/portfolio';
import './TileHeading.scss';

export const TileHeading = ({ icon, title, to }) => (
  <div className="tile-heading">
    <span className="tile-heading__icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={icon} />
      </svg>
    </span>
    <h2 className="tile-heading__title">{title}</h2>
    {to && (
      <ViewLink to={to} className="tile-heading__open" aria-label={`Open ${navLink(to)?.label ?? title}`}>
        Open
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 3h6v6M3 11L11 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </ViewLink>
    )}
  </div>
);
