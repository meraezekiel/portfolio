import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioSidebar } from './PortfolioSidebar';
import { ViewContext } from '../../ViewLink';
import { PORTFOLIO_CONFIG } from '../../../constants/portfolio';

const renderInPage = (view, showView = () => {}) => render(
  <ViewContext.Provider value={{ view, showView }}>
    <PortfolioSidebar theme="light" onToggleTheme={() => {}} />
  </ViewContext.Provider>,
);

test('hides a social button that has no URL', () => {
  renderInPage('hero');
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', PORTFOLIO_CONFIG.socials.github);
  expect(screen.queryByRole('link', { name: 'LinkedIn' })).toBeNull();
});

test('the theme button asks for a toggle', () => {
  const onToggleTheme = jest.fn();
  render(<PortfolioSidebar theme="light" onToggleTheme={onToggleTheme} />);
  fireEvent.click(screen.getByRole('button', { name: 'Toggle dark mode' }));
  expect(onToggleTheme).toHaveBeenCalledTimes(1);
});

test('a nav link opens its view', () => {
  const showView = jest.fn();
  renderInPage('hero', showView);
  fireEvent.click(screen.getByRole('link', { name: 'Projects' }));
  expect(showView).toHaveBeenCalledWith('work');
});

test('the link for the view on show is marked current', () => {
  renderInPage('work');
  expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
});
