// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import glamorous from 'glamorous';
import configureStore from './store/configureStore';

function App() {
  return <Container>Content</Container>;
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
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
