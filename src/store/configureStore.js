import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import { modalReducer } from './reducers';

function configureStore() {
  const history = createHistory();
  const routesMap = {
    HOME_ROUTE: '/',
    PROFILE_ROUTE: '/profile',
    SEARCH_ROUTE: '/search',
  };
  const {
    reducer: locationReducer,
    middleware,
    enhancer,
  } = connectRoutes(history, routesMap);
  const rootReducer = combineReducers({
    modal: modalReducer,
    location: locationReducer,
  });
  const middlewares = applyMiddleware(middleware);
  const store = createStore(
    rootReducer,
    compose(enhancer, middlewares),
  );
  return store;
}

export default configureStore;
