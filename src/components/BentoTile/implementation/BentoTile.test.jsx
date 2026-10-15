import { render, screen, fireEvent } from '@testing-library/react';
import { BentoTile } from './BentoTile';

test('renders as the requested element with variant classes', () => {
  render(<BentoTile as="article" accent className="extra" data-testid="tile">Hi</BentoTile>);
  const tile = screen.getByTestId('tile');
  expect(tile.tagName).toBe('ARTICLE');
  expect(tile).toHaveClass('bento-tile', 'bento-tile--accent', 'extra');
  expect(tile).toHaveTextContent('Hi');
});

test('moving the mouse places the spotlight under the cursor', () => {
  render(<BentoTile data-testid="tile">Hi</BentoTile>);
  const tile = screen.getByTestId('tile');
  tile.getBoundingClientRect = () => ({ left: 100, top: 50, width: 200, height: 100 });
  fireEvent.mouseMove(tile, { clientX: 150, clientY: 70 });
  expect(tile.style.getPropertyValue('--spot-x')).toBe('50px');
  expect(tile.style.getPropertyValue('--spot-y')).toBe('20px');
});
