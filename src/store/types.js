// @flow

export type Dictionary = {
  +mode: Mode,
  +index: ID,
  +entries: Array<DictionaryEntry>,
};

export type DictionaryEntry = {
  +id: number,
  +word: Word,
  +transcription: Transcription,
  +definition: Sentence,
  +examples: Array<Sentence>,
  +thesaurus: Array<Word>,
  +learnt: boolean,
};

export type Sentence = string;

export type Word = string;

export type Mode = 'default' | 'random';

export type Transcription = string;

export type SearchState = { query: Query };

export type Action =
  | { type: 'LEARN', payload: ID }
  | { type: 'SEARCH', payload: Query }
  | { type: 'CHANGE_INDEX', payload: ID }
  | { type: 'ADD_ENTRY', payload: DictionaryEntry };

export type Query = string;

export type ID = number;
