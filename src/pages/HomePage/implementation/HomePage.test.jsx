import { render, screen, fireEvent, within } from '@testing-library/react';
import { HomePage, statusText } from './HomePage';
import { NAV_LINKS, PROJECTS } from '../../../constants/portfolio';

// Lenis ships ES modules Jest cannot load; smooth scrolling is not under test here.
jest.mock('../../../components/SmoothScroll', () => ({ SmoothScroll: ({ children }) => children }));

let scrollTo;
beforeEach(() => {
  scrollTo = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});
afterEach(() => {
  scrollTo.mockRestore();
  window.history.replaceState(null, '', '/');
});

const sidebar = () => within(screen.getByRole('navigation', { name: 'Main' }));

test('opens on the overview', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ship it clean. Keep it fast.');
});

test.each(NAV_LINKS.filter(({ id }) => id !== 'hero'))('the $label link opens its own view', ({ label }) => {
  render(<HomePage />);
  fireEvent.click(sidebar().getByRole('link', { name: label }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(label);
  expect(screen.queryByText('Ship it clean. Keep it fast.')).toBeNull();
});

test('Home and the back link return to the overview', () => {
  render(<HomePage />);
  fireEvent.click(sidebar().getByRole('link', { name: 'Services' }));
  fireEvent.click(screen.getByRole('link', { name: /back to overview/i }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ship it clean. Keep it fast.');
});

test('an overview tile links to its full view', () => {
  render(<HomePage />);
  fireEvent.click(screen.getByRole('link', { name: 'Open Skillset' }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Skillset');
});

test('the projects view lists every project and opens its case study', () => {
  render(<HomePage />);
  fireEvent.click(sidebar().getByRole('link', { name: 'Projects' }));
  PROJECTS.forEach(({ title }) => {
    expect(screen.getByRole('button', { name: `Open ${title} case study` })).toBeInTheDocument();
  });
  fireEvent.click(screen.getByRole('button', { name: `Open ${PROJECTS[1].title} case study` }));
  expect(screen.getByRole('dialog', { name: PROJECTS[1].title })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Projects');
});

test('the status pill puts availability first and adds the visitor count', () => {
  expect(statusText('Available for work', 1234)).toBe('Available for work · 1,234 visitors');
  expect(statusText('Available for work', 1)).toBe('Available for work · 1 visitor');
  expect(statusText('Available for work', null)).toBe('Available for work');
  expect(statusText('', 4)).toBe('4 visitors');
});
