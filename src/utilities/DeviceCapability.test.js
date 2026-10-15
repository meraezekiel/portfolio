import { shouldRenderSpline } from './DeviceCapability';

const capable = { reducedMotion: false, coarsePointer: false, cores: 8 };

test('renders on a capable desktop', () => {
  expect(shouldRenderSpline(capable)).toBe(true);
});

test('skips on reduced motion', () => {
  expect(shouldRenderSpline({ ...capable, reducedMotion: true })).toBe(false);
});

test('skips on touch devices', () => {
  expect(shouldRenderSpline({ ...capable, coarsePointer: true })).toBe(false);
});

test('skips on 4 cores or fewer', () => {
  expect(shouldRenderSpline({ ...capable, cores: 4 })).toBe(false);
});

test('renders when core count is unknown', () => {
  expect(shouldRenderSpline({ ...capable, cores: undefined })).toBe(true);
});
