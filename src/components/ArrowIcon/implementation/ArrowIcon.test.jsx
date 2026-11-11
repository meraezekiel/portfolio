import { render } from '@testing-library/react';
import { ArrowIcon } from './ArrowIcon';

test('the arrowhead meets the end of the shaft', () => {
  const { container } = render(<ArrowIcon />);
  const d = container.querySelector('path').getAttribute('d');
  // Shaft ends at (10.5, 3.5); the head's corner must be that same point.
  expect(d).toMatch(/10\.5 3\.5/);
  expect(d).toMatch(/h5\.5V9/);
  expect(d).toMatch(/M5 3\.5/);
});

test('is hidden from screen readers and sizes on request', () => {
  const { container } = render(<ArrowIcon size={11} />);
  const svg = container.querySelector('svg');
  expect(svg).toHaveAttribute('aria-hidden', 'true');
  expect(svg).toHaveAttribute('width', '11');
});
