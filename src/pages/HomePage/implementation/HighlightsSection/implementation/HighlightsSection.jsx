import { BentoTile } from '../../../../../components/BentoTile';
import { TileHeading } from '../../../../../components/TileHeading';
import { HIGHLIGHTS } from '../../../../../constants/portfolio';
import './HighlightsSection.scss';

const STAR_ICON = 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z';

export const HighlightsSection = () => (
  <BentoTile as="section" wide id="highlights" className="highlights-section">
    <div className="highlights-section__intro">
      <TileHeading icon={STAR_ICON} title="HIGHLIGHTS" to="highlights" />
      <p className="tile-text">The work so far, in three lines.</p>
    </div>
    <div className="highlights-section__list">
      {HIGHLIGHTS.map(({ title, text, tag }) => (
        <div key={title} className="highlights-section__item">
          <div className="highlights-section__who">
            <span aria-hidden="true" />
            <strong>{title}</strong>
          </div>
          <span className="highlights-section__text">{text}</span>
          <span className="highlights-section__tag">{tag}</span>
        </div>
      ))}
    </div>
  </BentoTile>
);
