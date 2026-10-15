import { scrollPositionForCard } from './scrollPositionForCard';

// Pin runs from y=1000 to y=3000 (2000px of scroll) and moves the track 2000px sideways.
const pin = { start: 1000, end: 3000, distance: 2000, gutter: 80 };

test('the first card maps to the start of the pin', () => {
  expect(scrollPositionForCard({ ...pin, cardLeft: 80 })).toBe(1000);
});

test('a card further along maps proportionally into the pin', () => {
  expect(scrollPositionForCard({ ...pin, cardLeft: 1080 })).toBe(2000);
});

test('cards past the end clamp to the end of the pin', () => {
  expect(scrollPositionForCard({ ...pin, cardLeft: 5000 })).toBe(3000);
});

test('no horizontal distance means the start of the pin', () => {
  expect(scrollPositionForCard({ ...pin, distance: 0, cardLeft: 900 })).toBe(1000);
});
