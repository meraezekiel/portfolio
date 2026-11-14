import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioSidebar } from './PortfolioSidebar';
import { ViewContext } from '../../ViewLink';
import { PORTFOLIO_CONFIG } from '../../../constants/portfolio';

const renderInPage = (view, showView = () => {}) => render(
  <ViewContext.Provider value={{ view, showView }}>
    <PortfolioSidebar theme="light" onToggleTheme={() => {}} />
  </ViewContext.Provider>,
);

test('links to GitHub and LinkedIn', () => {
  renderInPage('hero');
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', PORTFOLIO_CONFIG.socials.github);
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', PORTFOLIO_CONFIG.socials.linkedin);
});

test('has a resume download button', () => {
  renderInPage('hero');
  expect(screen.getByRole('link', { name: 'Download resume' })).toHaveAttribute('href', PORTFOLIO_CONFIG.resume);
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
