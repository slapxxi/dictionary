// @flow
import data from './data';
import { isRouteAction } from '../../lib/';
import type { Dictionary, Action } from '../types';

function reducer(state: Dictionary = data, action: Action) {
  switch (action.type) {
    case 'MODE_ROUTE':
      return { ...state, mode: 'random' };
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'LEARN':
      return {
        ...state,
        entries: learn(state.entries, action.payload),
      };
    default:
      return isRouteAction(action)
        ? { ...state, mode: 'default' }
        : state;
  }
}

function learn(items, id) {
  return items.map(
    (item) =>
      item.id === id ? { ...item, learnt: !item.learnt } : item,
  );
}

export default reducer;
