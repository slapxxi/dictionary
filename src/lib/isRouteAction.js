// @flow
import { NOT_FOUND } from 'redux-first-router';

function isRouteAction(action) {
  if (action.type === NOT_FOUND) {
    return true;
  }
  return action.type.toLowerCase().search('_route') !== -1;
}

export default isRouteAction;
