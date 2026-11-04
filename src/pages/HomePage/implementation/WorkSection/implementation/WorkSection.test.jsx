import { render, screen, fireEvent } from '@testing-library/react';
import { WorkSection } from './WorkSection';
import { PROJECTS } from '../../../../../constants/portfolio';

afterEach(() => window.history.replaceState(null, '', '/'));

test('shows the first project with its real screenshot', () => {
  const { container } = render(<WorkSection />);
  expect(screen.getByRole('button', { name: `Open ${PROJECTS[0].title} case study` })).toBeInTheDocument();
  expect(container.querySelector('img.project-image')).toHaveAttribute('src', `/projects/${PROJECTS[0].slug}/${PROJECTS[0].images[0]}`);
});

test('a dot switches the project on show', () => {
  render(<WorkSection />);
  fireEvent.click(screen.getByRole('button', { name: `Show ${PROJECTS[3].title}` }));
  expect(screen.getByRole('button', { name: `Open ${PROJECTS[3].title} case study` })).toBeInTheDocument();
});

test('clicking the preview opens that project\'s case study', () => {
  render(<WorkSection />);
  fireEvent.click(screen.getByRole('button', { name: `Open ${PROJECTS[0].title} case study` }));
  expect(screen.getByRole('dialog', { name: PROJECTS[0].title })).toBeInTheDocument();
  expect(window.location.hash).toBe(`#work/${PROJECTS[0].slug}`);
});
