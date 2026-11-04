import { BentoTile } from '../../../../../components/BentoTile';
import { TileHeading } from '../../../../../components/TileHeading';
import portrait from '../../../../../assets/images/profile3.jpg';
import formal from '../../../../../assets/images/profile2.jpg';
import casual from '../../../../../assets/images/profile.jpg';
import './AboutSection.scss';

const PERSON_ICON = 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM20 21a8 8 0 0 0-16 0';

export const AboutSection = () => (
  <BentoTile as="section" id="about" className="about-section">
    <TileHeading icon={PERSON_ICON} title="ABOUT" />
    <p className="tile-text">Who I am and how I work.</p>
    <div className="about-section__photos">
      <div className="about-section__photo about-section__photo--back"><img src={portrait} alt="" /></div>
      <div className="about-section__photo about-section__photo--middle"><img src={formal} alt="" /></div>
      <div className="about-section__photo about-section__photo--front"><img src={casual} alt="" /></div>
    </div>
  </BentoTile>
);
