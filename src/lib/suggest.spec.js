// @flow
import _ from 'lodash';
import suggest from './suggest';

it('suggests similar entries', () => {
  const result = suggest(
    'test',
    [{ text: 'testing' }, { text: 'meh' }],
    _.property('text'),
  );
  expect(result).toEqual([{ text: 'testing' }]);
});

it('is case insensitive', () => {
  const result = suggest(
    'test',
    [{ text: 'TESTING' }],
    _.property('text'),
  );
  expect(result).toEqual([{ text: 'TESTING' }]);
});

it('ignores whitespace in query parameter', () => {
  const result = suggest(
    'test  ',
    [{ text: 'TESTING' }],
    _.property('text'),
  );
  expect(result).toEqual([{ text: 'TESTING' }]);
});

it('does not suggest anything when query is empty', () => {
  const result = suggest(
    '  ',
    [{ text: 'TESTING' }],
    _.property('text'),
  );
  expect(result).toEqual([]);
});
