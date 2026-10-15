import { renderHook, act } from '@testing-library/react';
import { useSplineVisibilityHandler } from './useSplineVisibilityHandler';

let observerCallback;
beforeEach(() => {
  window.IntersectionObserver = jest.fn((cb) => {
    observerCallback = cb;
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
});

const setup = () => {
  const sceneRef = { current: document.createElement('div') };
  const visibleRef = { current: true };
  const onLoad = jest.fn();
  const app = { stop: jest.fn(), play: jest.fn() };
  const { result } = renderHook(() => useSplineVisibilityHandler(sceneRef, visibleRef, onLoad));
  return { result, visibleRef, onLoad, app };
};

test('stops the scene when it scrolls out of view and resumes when back', () => {
  const { result, visibleRef, app } = setup();
  act(() => result.current.handleSplineLoad(app));
  act(() => observerCallback([{ isIntersecting: false }]));
  expect(app.stop).toHaveBeenCalled();
  expect(visibleRef.current).toBe(false);
  act(() => observerCallback([{ isIntersecting: true }]));
  expect(app.play).toHaveBeenCalled();
  expect(visibleRef.current).toBe(true);
});

test('a scene that loads while hidden is stopped immediately', () => {
  const { result, onLoad, app } = setup();
  act(() => observerCallback([{ isIntersecting: false }]));
  act(() => result.current.handleSplineLoad(app));
  expect(onLoad).toHaveBeenCalledWith(app);
  expect(app.stop).toHaveBeenCalled();
});
