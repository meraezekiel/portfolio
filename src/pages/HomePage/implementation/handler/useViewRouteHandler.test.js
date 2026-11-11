import { renderHook, act } from '@testing-library/react';
import { useViewRouteHandler } from './useViewRouteHandler';

const popTo = (url) => act(() => {
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
});

let scrollTo;
beforeEach(() => {
  scrollTo = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});
afterEach(() => {
  scrollTo.mockRestore();
  window.history.replaceState(null, '', '/');
});

test('starts on the overview', () => {
  const { result } = renderHook(() => useViewRouteHandler());
  expect(result.current.view).toBe('hero');
});

test('a shared #services link opens the services view', () => {
  window.history.replaceState(null, '', '/#services');
  const { result } = renderHook(() => useViewRouteHandler());
  expect(result.current.view).toBe('services');
});

test('an unknown hash falls back to the overview', () => {
  window.history.replaceState(null, '', '/#nope');
  const { result } = renderHook(() => useViewRouteHandler());
  expect(result.current.view).toBe('hero');
});

test('a case study link keeps the overview so its panel opens over it', () => {
  window.history.replaceState(null, '', '/#work/posv2');
  const { result } = renderHook(() => useViewRouteHandler());
  expect(result.current.view).toBe('hero');
});

test('showing a view pushes its hash', () => {
  const push = jest.spyOn(window.history, 'pushState');
  const { result } = renderHook(() => useViewRouteHandler());
  act(() => result.current.showView('skills'));
  expect(result.current.view).toBe('skills');
  expect(window.location.hash).toBe('#skills');
  expect(push).toHaveBeenCalledTimes(1);
  push.mockRestore();
});

test('showing the overview leaves a clean URL', () => {
  window.history.replaceState(null, '', '/#about');
  const { result } = renderHook(() => useViewRouteHandler());
  act(() => result.current.showView('hero'));
  expect(result.current.view).toBe('hero');
  expect(window.location.hash).toBe('');
});

test('showing the view already open adds no history entry', () => {
  window.history.replaceState(null, '', '/#about');
  const push = jest.spyOn(window.history, 'pushState');
  const { result } = renderHook(() => useViewRouteHandler());
  act(() => result.current.showView('about'));
  expect(push).not.toHaveBeenCalled();
  push.mockRestore();
});

test('Back returns to the previous view', () => {
  const { result } = renderHook(() => useViewRouteHandler());
  act(() => result.current.showView('contact'));
  popTo('/');
  expect(result.current.view).toBe('hero');
});

test('opening a case study from the projects view stays on that view', () => {
  window.history.replaceState(null, '', '/#work');
  const { result } = renderHook(() => useViewRouteHandler());
  popTo('/#work/qr');
  expect(result.current.view).toBe('work');
});

test('on a phone, where the sidebar sits above the content, it scrolls to the content', () => {
  const content = document.createElement('main');
  content.getBoundingClientRect = () => ({ top: 640 });
  const { result } = renderHook(() => useViewRouteHandler({ current: content }));
  act(() => result.current.showView('services'));
  expect(scrollTo).toHaveBeenCalledWith(0, 640);
});

test('changing view scrolls back to the top', () => {
  const { result } = renderHook(() => useViewRouteHandler());
  expect(scrollTo).not.toHaveBeenCalled();
  act(() => result.current.showView('highlights'));
  expect(scrollTo).toHaveBeenCalledWith(0, 0);
});
