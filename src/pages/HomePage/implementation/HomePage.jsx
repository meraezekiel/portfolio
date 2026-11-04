import { useHomePageHandler } from './useHomePageHandler';
import { SmoothScroll } from '../../../components/SmoothScroll';
import { PortfolioSidebar } from '../../../components/PortfolioSidebar';
import { PORTFOLIO_CONFIG } from '../../../constants/portfolio';
import { HeroSection } from './HeroSection';
import { ToolsStrip } from './ToolsStrip';
import { WorkSection } from './WorkSection';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceTile } from './ExperienceTile';
import { ServicesSection } from './ServicesSection';
import { HighlightsSection } from './HighlightsSection';
import { ContactSection } from './ContactSection';
import './HomePage.scss';

export const HomePage = () => {
  const { theme, toggleTheme } = useHomePageHandler();

  return (
    <SmoothScroll>
      <div className="portfolio-page">
        <svg className="portfolio-page__lines" viewBox="0 0 1400 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className="portfolio-page__line portfolio-page__line--a" d="M120 -40 C 40 300, 260 520, 60 940" />
          <path className="portfolio-page__line portfolio-page__line--b" d="M320 -20 C 220 200, 420 300, 300 560 S 120 860, 360 940" />
          <path className="portfolio-page__line portfolio-page__line--c" d="M1180 -30 C 1000 180, 1320 260, 1180 520 S 1300 820, 1120 940" />
          <path className="portfolio-page__line portfolio-page__line--d" d="M -40 620 C 300 520, 520 760, 900 640 S 1300 560, 1460 700" />
        </svg>

        <PortfolioSidebar theme={theme} onToggleTheme={toggleTheme} />

        <main className="portfolio-main">
          <HeroSection />
          <ToolsStrip />
          <div className="portfolio-grid">
            <WorkSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceTile />
            <ServicesSection />
            <HighlightsSection />
          </div>
          <ContactSection />
        </main>

        {PORTFOLIO_CONFIG.availability && (
          <div className="portfolio-page__status">
            <span aria-hidden="true" />
            {PORTFOLIO_CONFIG.availability}
          </div>
        )}
      </div>
    </SmoothScroll>
  );
};
