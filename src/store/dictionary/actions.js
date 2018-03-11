// @flow
import type { Action, ID } from '../types';

function view(id: ID): Action {
  return { type: 'VIEW', payload: id };
}

function learn(id: number): Action {
  return { type: 'LEARN', payload: id };
}

function changeIndex(index: ID): Action {
  return { type: 'CHANGE_INDEX', payload: index };
}

export { learn, changeIndex, view };
