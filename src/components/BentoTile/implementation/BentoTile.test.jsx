import { render, screen } from '@testing-library/react';
import { BentoTile } from './BentoTile';

test('renders as the requested element with its classes', () => {
  render(<BentoTile as="article" wide className="extra" data-testid="tile">Hi</BentoTile>);
  const tile = screen.getByTestId('tile');
  expect(tile.tagName).toBe('ARTICLE');
  expect(tile).toHaveClass('bento-tile', 'bento-tile--wide', 'extra');
  expect(tile).toHaveTextContent('Hi');
});
