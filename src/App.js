// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import glamorous from 'glamorous';
import { Header, Route } from './components';
import { Words } from './containers';
import configureStore from './store/configureStore';
import { theme } from './lib/constants';

function App() {
  return (
    <Container>
      <Header iconSize={20} />
      <Route to="/">
        <Words />
      </Route>
    </Container>
  );
}

const Container = glamorous.div({
  overflow: 'hidden',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: theme.bg,
  color: theme.subtext,
});

function Root() {
  const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  );
}

export default Root;
