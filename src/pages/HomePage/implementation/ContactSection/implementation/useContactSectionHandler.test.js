import { renderHook, act } from '@testing-library/react';
import { useContactSectionHandler } from './useContactSectionHandler';

const EMAIL = 'me@example.com';

afterEach(() => {
  jest.useRealTimers();
  delete navigator.clipboard;
});

test('copying puts the email on the clipboard and says so for 2 seconds', async () => {
  jest.useFakeTimers();
  navigator.clipboard = { writeText: jest.fn().mockResolvedValue() };
  const { result } = renderHook(() => useContactSectionHandler({ email: EMAIL }));

  await act(() => result.current.copyEmail());
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(EMAIL);
  expect(result.current.copied).toBe(true);

  act(() => jest.advanceTimersByTime(2000));
  expect(result.current.copied).toBe(false);
});

test('when the clipboard is blocked it opens the email app instead', async () => {
  navigator.clipboard = { writeText: jest.fn().mockRejectedValue(new Error('denied')) };
  const navigate = jest.fn();
  const { result } = renderHook(() => useContactSectionHandler({ email: EMAIL, navigate }));

  await act(() => result.current.copyEmail());
  expect(navigate).toHaveBeenCalledWith(`mailto:${EMAIL}`);
  expect(result.current.copied).toBe(false);
});

test('when there is no clipboard API it opens the email app', async () => {
  const navigate = jest.fn();
  const { result } = renderHook(() => useContactSectionHandler({ email: EMAIL, navigate }));

  await act(() => result.current.copyEmail());
  expect(navigate).toHaveBeenCalledWith(`mailto:${EMAIL}`);
});
