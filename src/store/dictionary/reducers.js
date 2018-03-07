// @flow
import data from './data';
import { isRouteAction } from '../../lib/';
import type { Dictionary, Action } from '../types';

function reducer(state: Dictionary = data, action: Action) {
  switch (action.type) {
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
    case 'HOME_ROUTE':
      return changeIndex(state, action);
    case 'CHANGE_INDEX':
      return { ...state, index: action.payload };
    default:
      return isRouteAction(action)
        ? { ...state, mode: 'default' }
        : state;
  }
}

function changeIndex(state, action) {
  const { index = state.index } = action.payload || {};
  return { ...state, index };
}

function learn(items, id) {
  return items.map(
    (item) =>
      item.id === id ? { ...item, learnt: !item.learnt } : item,
  );
}

export default reducer;
