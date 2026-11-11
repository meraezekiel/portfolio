import { render, screen, fireEvent } from '@testing-library/react';
import { ViewLink } from './ViewLink';
import { ViewContext } from './ViewContext';

afterEach(() => window.history.replaceState(null, '', '/'));

test('asks the page to show its view instead of following the hash', () => {
  const showView = jest.fn();
  render(
    <ViewContext.Provider value={{ view: 'hero', showView }}>
      <ViewLink to="services">Services</ViewLink>
    </ViewContext.Provider>,
  );
  fireEvent.click(screen.getByRole('link', { name: 'Services' }));
  expect(showView).toHaveBeenCalledWith('services');
  expect(window.location.hash).toBe('');
});

test('marks itself current when its view is showing', () => {
  render(
    <ViewContext.Provider value={{ view: 'services', showView: () => {} }}>
      <ViewLink to="services">Services</ViewLink>
      <ViewLink to="about">About</ViewLink>
    </ViewContext.Provider>,
  );
  expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
});

test('a modified click is left to the browser so it can open a new tab', () => {
  const showView = jest.fn();
  render(
    <ViewContext.Provider value={{ view: 'hero', showView }}>
      <ViewLink to="services">Services</ViewLink>
    </ViewContext.Provider>,
  );
  fireEvent.click(screen.getByRole('link', { name: 'Services' }), { ctrlKey: true });
  expect(showView).not.toHaveBeenCalled();
});

test('is a plain hash link outside a page', () => {
  render(<ViewLink to="about">About</ViewLink>);
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
});
