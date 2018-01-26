import { NOT_FOUND } from 'redux-first-router';

const initState = {
  display: false,
};

function modalReducer(state = initState, action) {
  if (isRouteAction(action)) {
    return { display: false };
  }
  switch (action.type) {
    case 'OPEN_MODAL':
      return { display: true };
    case 'CLOSE_MODAL':
      return { display: false };
    default:
      return state;
  }
}

function isRouteAction(action) {
  if (action.type === NOT_FOUND) {
    return true;
  }
  return action.type.toLowerCase().search('_route') !== -1;
}

export default modalReducer;
