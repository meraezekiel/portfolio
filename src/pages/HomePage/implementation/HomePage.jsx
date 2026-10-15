import { useHomePageHandler } from './useHomePageHandler';
import { SmoothScroll } from '../../../components/SmoothScroll';
import { PortfolioHeader } from '../../../components/PortfolioHeader';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { WorkSection } from './WorkSection';
import { SkillsSection } from './SkillsSection';
import { ContactSection } from './ContactSection';
import './HomePage.scss';

export const HomePage = () => {
  useHomePageHandler();

  return (
    <SmoothScroll>
      <PortfolioHeader />
      <main className="portfolio-main">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
};
