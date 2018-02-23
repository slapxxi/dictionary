// @flow
import type { SearchState, Action } from '../types';

const initState: SearchState = { query: '' };

function reducer(
  state: SearchState = initState,
  action: Action,
): SearchState {
  switch (action.type) {
    case 'SEARCH':
      return { ...state, query: action.payload };
    default:
      return state;
  }
}

export default reducer;
