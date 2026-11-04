import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioSidebar } from './PortfolioSidebar';
import { PORTFOLIO_CONFIG } from '../../../constants/portfolio';

test('hides a social button that has no URL', () => {
  render(<PortfolioSidebar theme="light" onToggleTheme={() => {}} />);
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', PORTFOLIO_CONFIG.socials.github);
  expect(screen.queryByRole('link', { name: 'LinkedIn' })).toBeNull();
});

test('the theme button asks for a toggle', () => {
  const onToggleTheme = jest.fn();
  render(<PortfolioSidebar theme="light" onToggleTheme={onToggleTheme} />);
  fireEvent.click(screen.getByRole('button', { name: 'Toggle dark mode' }));
  expect(onToggleTheme).toHaveBeenCalledTimes(1);
});

test('clicking a nav link marks it as the current one', () => {
  render(<PortfolioSidebar theme="light" onToggleTheme={() => {}} />);
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'true');
  fireEvent.click(screen.getByRole('link', { name: 'Projects' }));
  expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'true');
  expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
});
