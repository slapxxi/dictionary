// @flow
import type { Action } from '../types';

function learn(id: number): Action {
  return { type: 'LEARN', payload: id };
}

export { learn };
