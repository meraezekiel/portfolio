import { useRef } from 'react';
import { useHomePageHandler } from './useHomePageHandler';
import { useViewRouteHandler, HOME_VIEW } from './handler/useViewRouteHandler';
import { useVisitorCountHandler } from './handler/useVisitorCountHandler';
import { SmoothScroll } from '../../../components/SmoothScroll';
import { PortfolioSidebar } from '../../../components/PortfolioSidebar';
import { ViewContext } from '../../../components/ViewLink';
import { PORTFOLIO_CONFIG, VISITOR_COUNTER } from '../../../constants/portfolio';
import { HeroSection } from './HeroSection';
import { ToolsStrip } from './ToolsStrip';
import { WorkSection } from './WorkSection';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceTile } from './ExperienceTile';
import { ServicesSection } from './ServicesSection';
import { HighlightsSection } from './HighlightsSection';
import { ContactSection } from './ContactSection';
import { ProjectsView } from './ProjectsView';
import { ServicesView } from './ServicesView';
import { SkillsView } from './SkillsView';
import { HighlightsView } from './HighlightsView';
import { AboutView } from './AboutView';
import { ContactView } from './ContactView';
import { ExperienceView } from './ExperienceView';
import './HomePage.scss';

const VIEWS = {
  work: ProjectsView,
  experience: ExperienceView,
  services: ServicesView,
  skills: SkillsView,
  highlights: HighlightsView,
  about: AboutView,
  contact: ContactView,
};

export const statusText = (availability, visitors) => {
  const count = visitors === null
    ? ''
    : `${visitors.toLocaleString('en-US')} ${visitors === 1 ? 'visitor' : 'visitors'}`;
  return [availability, count].filter(Boolean).join(' · ');
};

const Overview = () => (
  <>
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
  </>
);

export const HomePage = () => {
  const { theme, toggleTheme } = useHomePageHandler();
  const contentRef = useRef(null);
  const viewRoute = useViewRouteHandler(contentRef);
  const { view } = viewRoute;
  const View = VIEWS[view];
  // "Available for work · 4 visitors": availability first, the count added once Supabase answers.
  const visitors = useVisitorCountHandler(VISITOR_COUNTER);
  const status = statusText(PORTFOLIO_CONFIG.availability, visitors);

  return (
    <SmoothScroll>
      <ViewContext.Provider value={viewRoute}>
        <div className="portfolio-page">
          <svg className="portfolio-page__lines" viewBox="0 0 1400 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path className="portfolio-page__line portfolio-page__line--a" d="M120 -40 C 40 300, 260 520, 60 940" />
            <path className="portfolio-page__line portfolio-page__line--b" d="M320 -20 C 220 200, 420 300, 300 560 S 120 860, 360 940" />
            <path className="portfolio-page__line portfolio-page__line--c" d="M1180 -30 C 1000 180, 1320 260, 1180 520 S 1300 820, 1120 940" />
            <path className="portfolio-page__line portfolio-page__line--d" d="M -40 620 C 300 520, 520 760, 900 640 S 1300 560, 1460 700" />
          </svg>

          <PortfolioSidebar theme={theme} onToggleTheme={toggleTheme} />

          <main className="portfolio-main" ref={contentRef}>
            {view === HOME_VIEW || !View ? <Overview /> : <View key={view} />}
            {view !== 'contact' && <ContactSection />}
          </main>

          {status && (
            <div className="portfolio-page__status">
              <span aria-hidden="true" />
              {status}
            </div>
          )}
        </div>
      </ViewContext.Provider>
    </SmoothScroll>
  );
};
