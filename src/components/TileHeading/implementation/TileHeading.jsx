import { ViewLink } from '../../ViewLink';
import { navLink } from '../../../constants/portfolio';
import './TileHeading.scss';
import { ArrowIcon } from '../../ArrowIcon';

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
        <ArrowIcon size={11} />
      </ViewLink>
    )}
  </div>
);
