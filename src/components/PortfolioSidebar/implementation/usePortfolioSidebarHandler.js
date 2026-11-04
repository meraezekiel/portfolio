import { useCallback, useState } from 'react';
import { scrollToSection } from '../../../utilities/ScrollToSection';

export const usePortfolioSidebarHandler = () => {
  const [activeId, setActiveId] = useState('hero');

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    setActiveId(id);
    scrollToSection(id);
  }, []);

  return { activeId, handleNavClick };
};
