// @flow
import React from 'react';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import glamorous from 'glamorous';
import { NOT_FOUND } from 'redux-first-router';
import configureStore from './store/configureStore';
import { openModal, closeModal } from './store/actions';
import { Header, Route, Navigation } from './components/';
import {
  Profile,
  Search,
  PageNotFound,
  Home,
  Settings,
} from './screens/';

type Props = {
  openModal: () => void,
};

function App({ openModal }: Props) {
  return (
    <Container>
      <Navigation />
      <Header onMenuClick={openModal} />
      <Content>
        <Route to="/">
          <Home />
        </Route>
        <Route to="/profile">
          <Profile />
        </Route>
        <Route to="/search">
          <Search />
        </Route>
        <Route to="/settings">
          <Settings />
        </Route>
        <Route to={NOT_FOUND}>
          <PageNotFound />
        </Route>
      </Content>
    </Container>
  );
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const Content = glamorous.div({
  display: 'flex',
  flex: 1,
});

const enhance = connect(() => ({}), { openModal, closeModal });

const AppContainer = enhance(App);

function Root() {
  const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
      >
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}

export default Root;
