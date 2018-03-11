// @flow
import data from './data';
import { isRouteAction } from '../../lib/';
import type { Dictionary, Action } from '../types';

function reducer(state: Dictionary = data, action: Action) {
  switch (action.type) {
    case 'VIEW':
      return view(state, action);
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
      return changeIndex(state, action);
    default:
      return isRouteAction(action)
        ? { ...state, mode: 'default' }
        : state;
  }
}

function view(state, action) {
  return {
    ...state,
    entries: state.entries.map((e) => {
      if (e.id === action.payload) {
        return { ...e, viewCount: e.viewCount + 1 };
      }
      return e;
    }),
  };
}

function changeIndex(state, action) {
  if (typeof action.payload === 'number') {
    if (action.payload >= state.entries.length) {
      return state;
    }
    return { ...state, index: action.payload };
  }
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
