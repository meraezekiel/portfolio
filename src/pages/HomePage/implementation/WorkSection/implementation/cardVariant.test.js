import { cardVariant } from './cardVariant';

const layout = (total) => Array.from({ length: total }, (_, i) => cardVariant(i, total));

test('a single project fills the row', () => {
  expect(layout(1)).toEqual(['wide']);
});

test('two projects split the row', () => {
  expect(layout(2)).toEqual(['half', 'half']);
});

test('three projects: one featured beside two stacked', () => {
  expect(layout(3)).toEqual(['featured', 'small', 'small']);
});

test('four projects: the last one spans the full width', () => {
  expect(layout(4)).toEqual(['featured', 'small', 'small', 'wide']);
});

test('five projects: the last two split a row', () => {
  expect(layout(5)).toEqual(['featured', 'small', 'small', 'half', 'half']);
});

test('six projects: a full row of three smalls', () => {
  expect(layout(6)).toEqual(['featured', 'small', 'small', 'small', 'small', 'small']);
});

test('seven projects: a lone last card spans the width', () => {
  expect(layout(7)).toEqual(['featured', 'small', 'small', 'small', 'small', 'small', 'wide']);
});
