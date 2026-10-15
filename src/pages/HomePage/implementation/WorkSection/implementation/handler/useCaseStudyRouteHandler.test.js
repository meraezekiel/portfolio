import { renderHook, act } from '@testing-library/react';
import { useCaseStudyRouteHandler } from './useCaseStudyRouteHandler';

const projects = [{ slug: 'posv2' }, { slug: 'qr' }];

afterEach(() => window.history.replaceState(null, '', '/'));

test('opening pushes a #work/<slug> entry', () => {
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  act(() => result.current.openProject('qr'));
  expect(result.current.activeSlug).toBe('qr');
  expect(window.location.hash).toBe('#work/qr');
});

test('a shared link opens that project', () => {
  window.history.replaceState(null, '', '/#work/posv2');
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  expect(result.current.activeSlug).toBe('posv2');
});

test('an unknown slug opens nothing', () => {
  window.history.replaceState(null, '', '/#work/nope');
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  expect(result.current.activeSlug).toBeNull();
});

test('closing a shared-link panel clears the hash without going back', () => {
  window.history.replaceState(null, '', '/#work/posv2');
  const back = jest.spyOn(window.history, 'back');
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  act(() => result.current.closeProject());
  expect(back).not.toHaveBeenCalled();
  expect(result.current.activeSlug).toBeNull();
  expect(window.location.hash).toBe('');
  back.mockRestore();
});

test('a panel opened by following a #work/<slug> link closes with Back, leaving no dead entry', () => {
  const back = jest.spyOn(window.history, 'back').mockImplementation(() => {});
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  act(() => {
    // What the browser does when an <a href="#work/qr"> is clicked: new entry, then popstate.
    window.history.pushState(null, '', '/#work/qr');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(result.current.activeSlug).toBe('qr');
  act(() => result.current.closeProject());
  expect(back).toHaveBeenCalledTimes(1);
  back.mockRestore();
});

test('closing twice before popstate arrives only goes back once', () => {
  const back = jest.spyOn(window.history, 'back').mockImplementation(() => {});
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  act(() => result.current.openProject('qr'));
  act(() => {
    result.current.closeProject();
    result.current.closeProject();
  });
  expect(back).toHaveBeenCalledTimes(1);
  back.mockRestore();
});

test('closing after opening goes back, and popstate clears the panel', () => {
  const back = jest.spyOn(window.history, 'back').mockImplementation(() => {});
  const { result } = renderHook(() => useCaseStudyRouteHandler(projects));
  act(() => result.current.openProject('qr'));
  act(() => result.current.closeProject());
  expect(back).toHaveBeenCalledTimes(1);
  act(() => {
    window.history.replaceState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(result.current.activeSlug).toBeNull();
  back.mockRestore();
});
