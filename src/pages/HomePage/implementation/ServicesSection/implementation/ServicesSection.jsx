import { BentoTile } from '../../../../../components/BentoTile';
import { TileHeading } from '../../../../../components/TileHeading';
import { SERVICES } from '../../../../../constants/portfolio';
import './ServicesSection.scss';

const LAYERS_ICON = 'm12 2 10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5';

export const ServicesSection = () => (
  <BentoTile as="section" id="services" className="services-section">
    <TileHeading icon={LAYERS_ICON} title="SERVICES" to="services" />
    <p className="tile-text">What I build for teams and founders.</p>
    <div className="services-section__list">
      {SERVICES.map(({ label, icon }, index) => (
        <div key={label} className="services-section__item">
          <span className="services-section__icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>
          </span>
          <span className="services-section__label">{label}</span>
          <span className="services-section__number">{String(index + 1).padStart(2, '0')}</span>
        </div>
      ))}
    </div>
  </BentoTile>
);
