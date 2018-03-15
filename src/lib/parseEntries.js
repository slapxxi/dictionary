// @flow
import _ from 'lodash';
import type { DictionaryEntry } from '../store/types';

type Params = DictionaryEntry;

function parseEntries(
  entries: Array<string>,
  params?: Params,
): Array<DictionaryEntry> {
  return entries.map((entry, index) => {
    const data = entry.split(';');
    return {
      id: index,
      word: data[0].trim(),
      transcription: data[1].trim(),
      definition: data[2].trim(),
      examples: data[3]
        .trim()
        .split(':')
        .map((i) => i.trim())
        .map(_.capitalize),
      thesaurus: data[4].trim().split(','),
      learnt: false,
      viewCount: 0,
      ...(params || {}),
    };
  });
}

export default parseEntries;
