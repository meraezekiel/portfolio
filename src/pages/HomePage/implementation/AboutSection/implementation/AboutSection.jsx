import { useAboutSectionHandler } from './useAboutSectionHandler';
import { StatsStrip } from './StatsStrip';
import { STATS } from '../../../../../constants/portfolio';
import './AboutSection.scss';

export const AboutSection = () => {
  const { sectionRef } = useAboutSectionHandler();

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-section__inner">
        <h2 className="about-section__heading">ABOUT ME</h2>
        <div className="about-section__copy">
          <p className="about-section__lead">
            I build fast, production-ready apps — from the database to the pixels.
          </p>
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
      </div>
      <StatsStrip stats={STATS} />
    </section>
  );
};
