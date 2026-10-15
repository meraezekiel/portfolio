import { parseStat } from './parseStat';

test('splits a number from its suffix', () => {
  expect(parseStat('4+')).toEqual({ number: 4, suffix: '+' });
});

test('plain numbers have no suffix', () => {
  expect(parseStat('12')).toEqual({ number: 12, suffix: '' });
});

test('non-numeric values are kept as text', () => {
  expect(parseStat('Web')).toEqual({ number: null, suffix: 'Web' });
});
