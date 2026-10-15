import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';
import { PORTFOLIO_CONFIG } from '../../../../../constants/portfolio';

const original = { ...PORTFOLIO_CONFIG };

// HeroSection reads PORTFOLIO_CONFIG at render time, so each test sets the fields it needs.
const renderHero = (overrides) => {
  Object.assign(PORTFOLIO_CONFIG, overrides);
  return render(<HeroSection />);
};

afterEach(() => Object.assign(PORTFOLIO_CONFIG, original));

test('greets by first name', () => {
  renderHero({ firstName: 'John' });
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hi, I'm John.");
});

test('shows the availability tile when it is set', () => {
  renderHero({ availability: { label: 'Open to work', detail: 'Freelance' } });
  expect(screen.getByText('Open to work')).toBeInTheDocument();
});

const grid = (container) => container.querySelector('.hero-section__grid');

test('with both optional tiles the grid is marked as full', () => {
  const { container } = renderHero({ availability: { label: 'Open to work', detail: 'x' }, latestProject: 'photo-studio' });
  expect(grid(container)).toHaveClass('hero-section__grid--optional-2');
});

test('hides the availability tile and marks one optional tile when availability is null', () => {
  const { container } = renderHero({ availability: null });
  expect(screen.queryByText('Open to work')).toBeNull();
  expect(grid(container)).toHaveClass('hero-section__grid--optional-1');
});

test('an unknown latest project slug hides that tile and rebalances the grid', () => {
  const { container } = renderHero({ latestProject: 'no-such-project' });
  expect(screen.queryByRole('link', { name: /latest project/i })).toBeNull();
  expect(grid(container)).toHaveClass('hero-section__grid--optional-1');
});

test('with neither optional tile the grid is marked empty', () => {
  const { container } = renderHero({ availability: null, latestProject: 'no-such-project' });
  expect(grid(container)).toHaveClass('hero-section__grid--optional-0');
});

test('the latest project tile opens its case study', () => {
  renderHero({ latestProject: 'photo-studio' });
  expect(screen.getByRole('link', { name: /latest project/i })).toHaveAttribute('href', '#work/photo-studio');
});
