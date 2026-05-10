import { Suspense, lazy } from 'react';
import { useWhatIDoSectionHandler } from './useWhatIDoSectionHandler';
import { SkillCard } from './SkillCard';
import { SPLINE_SCENES, FRONTEND_SKILLS, BACKEND_SKILLS } from '../../../../../constants/portfolio';
import './WhatIDoSection.scss';

const Spline = lazy(() => import('@splinetool/react-spline'));

export const WhatIDoSection = () => {
  const { sectionRef } = useWhatIDoSectionHandler();

  return (
    <section className="what-i-do-section" ref={sectionRef}>
      <div className="what-i-do-section__scene" aria-hidden="true">
        <Suspense fallback={<div className="what-i-do-section__scene-fallback" />}>
          <Spline scene={SPLINE_SCENES.whatIDo} />
        </Suspense>
      </div>

      <div className="what-i-do-section__content">
        <h2 className="what-i-do-section__heading">
          <span className="what-i-do-section__heading-line">WHAT</span>
          <span className="what-i-do-section__heading-line what-i-do-section__heading-line--accent">I DO</span>
        </h2>

        <div className="what-i-do-section__cards">
          <SkillCard
            title="FRONTEND"
            subtitle="Building Interactive UIs"
            description="Crafting performant, responsive interfaces with modern frameworks. From SPAs to micro-frontends, I deliver pixel-perfect experiences."
            skills={FRONTEND_SKILLS}
          />
          <SkillCard
            title="BACKEND"
            subtitle="Scalable Server Architecture"
            description="Designing robust APIs and microservices. From CMS platforms to complex business logic, I build backends that scale."
            skills={BACKEND_SKILLS}
          />
        </div>
      </div>
    </section>
  );
};
