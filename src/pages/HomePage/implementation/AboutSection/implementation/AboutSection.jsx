import { useAboutSectionHandler } from './useAboutSectionHandler';
import { StatsStrip } from './StatsStrip';
import { BentoTile } from '../../../../../components/BentoTile';
import { STATS } from '../../../../../constants/portfolio';
import './AboutSection.scss';

export const AboutSection = () => {
  const { sectionRef } = useAboutSectionHandler();

  return (
    <section id="about" className="about-section bento-section" ref={sectionRef}>
      <h2 className="bento-section__heading">About <span>me</span></h2>
      <div className="about-section__grid">
        <BentoTile className="about-section__bio">
          <span className="bento-label">About</span>
          <p className="about-section__lead">
            I build fast, production-ready apps — from the database to the pixels.
          </p>
          <p className="about-section__paragraph">
            Full-stack developer with 4+ years of experience building scalable web applications
            with React, Next.js, Node.js and NestJS. Skilled in microservices, CMS development and
            low-code platforms, taking products from concept to deployment.
          </p>
        </BentoTile>
        <StatsStrip stats={STATS} />
      </div>
    </section>
  );
};
