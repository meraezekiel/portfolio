import { Suspense, lazy } from 'react';
import { useHeroSectionHandler } from './useHeroSectionHandler';
import { PORTFOLIO_CONFIG, SPLINE_SCENES } from '../../../../../constants/portfolio';
import './HeroSection.scss';

const Spline = lazy(() => import('@splinetool/react-spline'));

export const HeroSection = () => {
  const { nameRef, roleRef, currentRole, glitchKey, handleSplineLoad } = useHeroSectionHandler();

  const [firstName, lastName] = PORTFOLIO_CONFIG.name.split(' ');

  return (
    <section id="hero" className="hero-section">
      <div className="hero-section__bg-glow" aria-hidden="true" />

      <div className="hero-section__name" ref={nameRef}>
        <span className="hero-section__greeting">Hello! I'm</span>
        <h1 className="hero-section__title">
          <span className="hero-section__title-line">{firstName}</span>
          <span className="hero-section__title-line">{lastName}</span>
        </h1>
      </div>

      <div className="hero-section__scene" aria-hidden="true">
        <Suspense fallback={<div className="hero-section__scene-fallback" />}>
          <Spline scene={SPLINE_SCENES.hero} onLoad={handleSplineLoad} />
        </Suspense>
      </div>

      <div className="hero-section__role" ref={roleRef}>
        <span className="hero-section__role-prefix">A Full Stack</span>
        <div className="hero-section__role-stage">
          <span key={glitchKey} className="hero-section__role-glitch" data-text={currentRole}>
            {currentRole}
          </span>
        </div>
      </div>

      <a
        href={PORTFOLIO_CONFIG.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-section__resume"
      >
        RESUME
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 3h6v6M3 11L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </a>
    </section>
  );
};
