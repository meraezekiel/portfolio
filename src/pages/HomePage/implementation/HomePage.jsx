import { useHomePageHandler } from './useHomePageHandler';
import { SmoothScroll } from '../../../components/SmoothScroll';
import { CustomCursor } from '../../../components/CustomCursor';
import { PortfolioHeader } from '../../../components/PortfolioHeader';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { WhatIDoSection } from './WhatIDoSection';
import { WorkSection } from './WorkSection';
import { ContactSection } from './ContactSection';
import './HomePage.scss';

export const HomePage = () => {
  useHomePageHandler();

  return (
    <SmoothScroll>
      <CustomCursor />
      <PortfolioHeader />
      <main className="portfolio-main">
        <HeroSection />
        <AboutSection />
        <WhatIDoSection />
        <WorkSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
};
