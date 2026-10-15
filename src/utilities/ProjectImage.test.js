import { projectImageSrc } from './ProjectImage';

test('builds a public path for a project screenshot', () => {
  expect(projectImageSrc('posv2', 'cover.png')).toBe('/projects/posv2/cover.png');
});

test('encodes file names with spaces', () => {
  expect(projectImageSrc('posv2', 'my shot.png')).toBe('/projects/posv2/my%20shot.png');
});
