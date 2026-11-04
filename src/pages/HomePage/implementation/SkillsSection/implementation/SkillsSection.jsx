import { BentoTile } from '../../../../../components/BentoTile';
import { TileHeading } from '../../../../../components/TileHeading';
import { FRONTEND_SKILLS, BACKEND_SKILLS } from '../../../../../constants/portfolio';
import './SkillsSection.scss';

const CODE_ICON = 'm18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16';

const ROWS = [
  { skills: FRONTEND_SKILLS, direction: 'forward' },
  { skills: BACKEND_SKILLS, direction: 'reverse' },
];

export const SkillsSection = () => (
  <BentoTile as="section" id="skills" className="skills-section">
    <div className="skills-section__intro">
      <TileHeading icon={CODE_ICON} title="SKILLSET" />
    </div>
    <p className="tile-text skills-section__intro">Frontend and backend — the stack I reach for first.</p>
    <div className="skills-section__rows">
      {ROWS.map(({ skills, direction }) => (
        <div key={direction} className={`skills-section__row skills-section__row--${direction}`}>
          {[...skills, ...skills].map((skill, index) => (
            <span key={`${skill}-${index}`} className="skills-section__pill" aria-hidden={index >= skills.length}>
              {skill}
              <span className="skills-section__dot" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </BentoTile>
);
