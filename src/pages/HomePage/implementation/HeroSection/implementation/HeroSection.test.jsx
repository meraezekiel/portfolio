import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';

test('shows the headline', () => {
  render(<HeroSection />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ship it clean. Keep it fast.');
});

test('the call to action emails me', () => {
  render(<HeroSection />);
  expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', `mailto:${PORTFOLIO_CONFIG.email}`);
});
