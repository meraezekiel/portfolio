import './TileHeading.scss';

export const TileHeading = ({ icon, title }) => (
  <div className="tile-heading">
    <span className="tile-heading__icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={icon} />
      </svg>
    </span>
    <h2 className="tile-heading__title">{title}</h2>
  </div>
);
