import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { connectRoutes } from 'redux-first-router';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import createHistory from 'history/createBrowserHistory';
import { modalReducer } from './reducers';

function configureStore() {
  const history = createHistory();
  const routesMap = {
    HOME_ROUTE: '/',
    PROFILE_ROUTE: '/profile',
    SEARCH_ROUTE: '/search',
    SETTINGS_ROUTE: '/settings',
  };
  const persistConfig = {
    storage,
    key: 'root',
    blacklist: ['location'],
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
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const middlewares = applyMiddleware(middleware, logger);
  const store = createStore(
    persistedReducer,
    compose(enhancer, middlewares),
  );
  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
