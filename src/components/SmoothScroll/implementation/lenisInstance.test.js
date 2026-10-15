import { setLenis, requestScrollLock, releaseScrollLock } from './lenisInstance';

const fakeLenis = () => ({ stop: jest.fn(), start: jest.fn() });

afterEach(() => setLenis(null));

test('a lock requested before Lenis exists is applied when Lenis is created', () => {
  requestScrollLock();
  const lenis = fakeLenis();
  setLenis(lenis);
  expect(lenis.stop).toHaveBeenCalled();
  releaseScrollLock();
  expect(lenis.start).toHaveBeenCalled();
});

test('releasing the lock restarts a running Lenis', () => {
  const lenis = fakeLenis();
  setLenis(lenis);
  requestScrollLock();
  expect(lenis.stop).toHaveBeenCalledTimes(1);
  releaseScrollLock();
  expect(lenis.start).toHaveBeenCalledTimes(1);
});

test('a new Lenis is not stopped when no lock is held', () => {
  const lenis = fakeLenis();
  setLenis(lenis);
  expect(lenis.stop).not.toHaveBeenCalled();
});
