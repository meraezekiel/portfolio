import { render, screen } from '@testing-library/react';
import { MarqueeRow } from './MarqueeRow';

test('lists each skill once for screen readers and duplicates it for the loop', () => {
  render(<MarqueeRow label="Frontend" items={['React', 'SCSS']} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getAllByText('React')).toHaveLength(2);
});
