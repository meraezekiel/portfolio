import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectImage } from './ProjectImage';

test('renders the screenshot', () => {
  render(<ProjectImage slug="posv2" file="cover.png" alt="POSv2" label="POSv2" />);
  expect(screen.getByRole('img', { name: 'POSv2' })).toHaveAttribute('src', '/projects/posv2/cover.png');
});

test('falls back to a placeholder when the file fails to load', () => {
  render(<ProjectImage slug="posv2" file="missing.png" alt="POSv2" label="POSv2" />);
  fireEvent.error(screen.getByRole('img', { name: 'POSv2' }));
  const placeholder = screen.getByRole('img', { name: 'POSv2' });
  expect(placeholder.tagName).toBe('DIV');
  expect(placeholder).toHaveTextContent('POSv2');
});

test('renders a placeholder when no file is given', () => {
  render(<ProjectImage slug="posv2" alt="POSv2" label="POSv2" />);
  expect(screen.getByRole('img', { name: 'POSv2' }).tagName).toBe('DIV');
});
