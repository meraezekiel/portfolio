import { useSkillsSectionHandler } from './useSkillsSectionHandler';
import { MarqueeRow } from './MarqueeRow';
import { FRONTEND_SKILLS, BACKEND_SKILLS } from '../../../../../constants/portfolio';
import './SkillsSection.scss';

export const SkillsSection = () => {
  const { sectionRef } = useSkillsSectionHandler();

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <header className="skills-section__header">
        <h2 className="skills-section__heading">
          <span>WHAT</span>
          <span className="skills-section__heading--accent">I DO</span>
        </h2>
        <p className="skills-section__intro">
          Frontend to backend — interfaces people enjoy using, on servers that scale.
        </p>
      </header>
      <MarqueeRow label="Frontend" items={FRONTEND_SKILLS} />
      <MarqueeRow label="Backend" items={BACKEND_SKILLS} reverse />
    </section>
  );
};
