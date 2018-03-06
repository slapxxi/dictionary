// @flow
import suggest from './suggest';

it('suggests similar entries', () => {
  const result = suggest('test', [
    { text: 'testing' },
    { text: 'meh' },
  ]);
  expect(result).toEqual([{ text: 'testing' }]);
});

it('is case insensitive', () => {
  const result = suggest('test', [{ text: 'TESTING' }]);
  expect(result).toEqual([{ text: 'TESTING' }]);
});
