import { usePortfolioHeaderHandler } from './usePortfolioHeaderHandler';
import { PORTFOLIO_CONFIG, NAV_LINKS } from '../../../constants/portfolio';
import './PortfolioHeader.scss';

export const PortfolioHeader = () => {
  const { isScrolled, handleNavClick } = usePortfolioHeaderHandler();

  return (
    <header className={`portfolio-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="portfolio-header__inner">
        <a href="#hero" className="portfolio-header__logo" onClick={(e) => handleNavClick(e, 'hero')}>
          {PORTFOLIO_CONFIG.initials}
        </a>

        <nav className="portfolio-header__nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="portfolio-header__link"
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bento-button bento-button--primary portfolio-header__cta"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
};
