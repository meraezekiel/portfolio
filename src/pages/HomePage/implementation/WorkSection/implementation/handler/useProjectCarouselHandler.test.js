import { renderHook, act } from '@testing-library/react';
import { useProjectCarouselHandler } from './useProjectCarouselHandler';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test('moves on every 5 seconds and wraps around', () => {
  const { result } = renderHook(() => useProjectCarouselHandler(2, false));
  act(() => jest.advanceTimersByTime(5000));
  expect(result.current.current).toBe(1);
  act(() => jest.advanceTimersByTime(5000));
  expect(result.current.current).toBe(0);
});

test('holds still while paused and carries on when resumed', () => {
  const { result } = renderHook(() => useProjectCarouselHandler(3, false));
  act(() => result.current.pause());
  act(() => jest.advanceTimersByTime(20000));
  expect(result.current.current).toBe(0);
  act(() => result.current.resume());
  act(() => jest.advanceTimersByTime(5000));
  expect(result.current.current).toBe(1);
});

test('holds still while a case study is open', () => {
  const { result } = renderHook(() => useProjectCarouselHandler(3, true));
  act(() => jest.advanceTimersByTime(20000));
  expect(result.current.current).toBe(0);
});

test('selecting a project jumps to it', () => {
  const { result } = renderHook(() => useProjectCarouselHandler(3, false));
  act(() => result.current.select(2));
  expect(result.current.current).toBe(2);
});
