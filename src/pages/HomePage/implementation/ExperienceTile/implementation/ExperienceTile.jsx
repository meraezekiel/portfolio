import { BentoTile } from '../../../../../components/BentoTile';
import { TileHeading } from '../../../../../components/TileHeading';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';
import './ExperienceTile.scss';

const SHIELD_ICON = 'M12 22c5.5-2.5 8-6 8-11V5l-8-3-8 3v6c0 5 2.5 8.5 8 11z';

export const ExperienceTile = () => (
  <BentoTile as="section" className="experience-tile">
    <TileHeading icon={SHIELD_ICON} title="EXPERIENCE" />
    <p className="tile-text">Years in production, not just tutorials.</p>
    <div className="experience-tile__badge">
      <div className="experience-tile__ring">
        <div className="experience-tile__core">
          <span className="experience-tile__value">{PORTFOLIO_CONFIG.experience}</span>
          <span className="experience-tile__unit">YEARS</span>
        </div>
      </div>
      <span className="experience-tile__role">
        <span aria-hidden="true" />
        {PORTFOLIO_CONFIG.role}
      </span>
    </div>
  </BentoTile>
);
