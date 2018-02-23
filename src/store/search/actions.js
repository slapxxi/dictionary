// @flow
import type { Action, Query } from '../types';

function search(query: Query): Action {
  return { type: 'SEARCH', payload: query };
}

export { search };
