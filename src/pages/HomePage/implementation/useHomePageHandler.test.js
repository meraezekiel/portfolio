import { renderHook, act } from '@testing-library/react';
import { useHomePageHandler } from './useHomePageHandler';

afterEach(() => window.localStorage.clear());

test('starts light and marks the body', () => {
  renderHook(() => useHomePageHandler());
  expect(document.body).toHaveClass('portfolio-mode');
  expect(document.body.dataset.theme).toBe('light');
});

test('toggling switches the theme and remembers it', () => {
  const { result } = renderHook(() => useHomePageHandler());
  act(() => result.current.toggleTheme());
  expect(document.body.dataset.theme).toBe('dark');
  expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');
});

test('restores a saved theme', () => {
  window.localStorage.setItem('portfolio-theme', 'dark');
  const { result } = renderHook(() => useHomePageHandler());
  expect(result.current.theme).toBe('dark');
});

test('cleans the body up on unmount', () => {
  const { unmount } = renderHook(() => useHomePageHandler());
  unmount();
  expect(document.body).not.toHaveClass('portfolio-mode');
  expect(document.body.dataset.theme).toBeUndefined();
});
