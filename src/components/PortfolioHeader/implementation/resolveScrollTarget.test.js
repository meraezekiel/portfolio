import { resolveScrollTarget } from './resolveScrollTarget';

test('a normal section is its own scroll target', () => {
  const section = document.createElement('section');
  document.body.appendChild(section);
  expect(resolveScrollTarget(section)).toBe(section);
});

test('a pinned section scrolls to its pin spacer so the pin starts from the beginning', () => {
  const spacer = document.createElement('div');
  spacer.className = 'pin-spacer';
  const section = document.createElement('section');
  spacer.appendChild(section);
  document.body.appendChild(spacer);
  expect(resolveScrollTarget(section)).toBe(spacer);
});
