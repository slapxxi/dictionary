// @flow
import type { Action } from '../types';

function learn(id: number): Action {
  return { type: 'LEARN', payload: id };
}

function changeIndex(index: number): Action {
  return { type: 'CHANGE_INDEX', payload: index };
}

export { learn, changeIndex };
