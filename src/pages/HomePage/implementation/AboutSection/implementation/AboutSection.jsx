import { Suspense, lazy } from 'react';
import { useAboutSectionHandler } from './useAboutSectionHandler';
import { SPLINE_SCENES } from '../../../../../constants/portfolio';
import './AboutSection.scss';

const Spline = lazy(() => import('@splinetool/react-spline'));

export const AboutSection = () => {
  const { sectionRef } = useAboutSectionHandler();

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-section__scene" aria-hidden="true">
        <Suspense fallback={<div className="about-section__scene-fallback" />}>
          <Spline scene={SPLINE_SCENES.about} />
        </Suspense>
      </div>

      <div className="about-section__copy">
        <h2 className="about-section__heading">ABOUT ME</h2>
        <p className="about-section__paragraph">
          Full Stack Developer with 4+ years of experience building scalable web
          applications using React.js, Next.js, Node.js, and NestJS.
        </p>
        <p className="about-section__paragraph">
          Skilled in microservices architecture, CMS development, and low-code
          platforms. Passionate about creating high-performance, production-ready
          solutions from concept to deployment.
        </p>
      </div>
    </section>
  );
};
