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

        <a href={`mailto:${PORTFOLIO_CONFIG.email}`} className="portfolio-header__email">
          {PORTFOLIO_CONFIG.email}
        </a>

        <nav className="portfolio-header__nav">
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
        </nav>
      </div>
    </header>
  );
};
