import { useSkillsSectionHandler } from './useSkillsSectionHandler';
import { BentoTile } from '../../../../../components/BentoTile';
import {
  FRONTEND_SKILLS, BACKEND_SKILLS, MOBILE_DESKTOP_SKILLS,
} from '../../../../../constants/portfolio';
import './SkillsSection.scss';

const GROUPS = [
  { title: 'Frontend', blurb: 'Fast, responsive interfaces people enjoy using.', skills: FRONTEND_SKILLS },
  { title: 'Backend', blurb: 'APIs and services that scale with the business.', skills: BACKEND_SKILLS },
  { title: 'Mobile & desktop', blurb: 'Offline-first apps for phones, tablets and Windows.', skills: MOBILE_DESKTOP_SKILLS },
];

export const SkillsSection = () => {
  const { sectionRef } = useSkillsSectionHandler();

  return (
    <section id="skills" className="skills-section bento-section" ref={sectionRef}>
      <h2 className="bento-section__heading">What I <span>do</span></h2>
      <div className="skills-section__grid">
        {GROUPS.map(({ title, blurb, skills }) => (
          <BentoTile key={title} className="skills-section__group">
            <h3 className="skills-section__title">{title}</h3>
            <p className="skills-section__blurb">{blurb}</p>
            <div>
              {skills.map((skill) => (
                <span key={skill} className="bento-chip">{skill}</span>
              ))}
            </div>
          </BentoTile>
        ))}
      </div>
    </section>
  );
};
