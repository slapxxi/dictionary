import parseEntries from './parseEntries';

it('parses strings to produce dictionary entries', () => {
  const result = parseEntries([
    'word; transcription; definition; example of usage; similar words',
  ]);
  expect(result).toMatchSnapshot();
});

it('merges additional params', () => {
  const result = parseEntries(['w; t; d; usage; similar'], {
    viewCount: 1,
    learnt: true,
  });
  expect(result).toMatchSnapshot();
});
