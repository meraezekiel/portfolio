import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';

const project = {
  slug: 'qr',
  title: 'QR Code Generator',
  pitch: 'Pitch',
  tags: ['React'],
  link: 'https://example.com',
  images: ['cover.png'],
};

test('opens the case study for its slug', () => {
  const onOpen = jest.fn();
  render(<ProjectCard project={project} index={0} onOpen={onOpen} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open QR Code Generator case study' }));
  expect(onOpen).toHaveBeenCalledWith('qr');
});

test('takes its grid size from the variant', () => {
  const { container } = render(<ProjectCard project={project} variant="featured" onOpen={() => {}} />);
  expect(container.firstChild).toHaveClass('project-card', 'project-card--featured', 'bento-tile');
});

test('shows a separate live link when the project has one', () => {
  render(<ProjectCard project={project} index={0} onOpen={() => {}} />);
  expect(screen.getByRole('link', { name: 'Open QR Code Generator live site' })).toHaveAttribute('href', 'https://example.com');
});
