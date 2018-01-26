// @flow
import React from 'react';
import { Provider, connect } from 'react-redux';
import glamorous from 'glamorous';
import { NOT_FOUND } from 'redux-first-router';
import Link from 'redux-first-router-link';
import configureStore from './store/configureStore';
import { openModal, closeModal } from './store/actions';
import { Header, Modal, Route } from './components/';
import { Profile, Search, PageNotFound, Home } from './screens/';

type Props = {
  displayModal: boolean,
  openModal: () => void,
  closeModal: () => void,
};

function App({ displayModal, openModal, closeModal }: Props) {
  return (
    <Container>
      <Modal visible={displayModal} onClose={closeModal}>
        <Link
          to="/"
          href="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: 20,
          }}
        >
          Home
        </Link>
        <Link
          to="/profile"
          href="/profile"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: 20,
          }}
        >
          Profile
        </Link>
        <Link
          to="/browse"
          href="/browse"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: 20,
          }}
        >
          Browse
        </Link>
      </Modal>
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
  flex: 1,
});

const Content = glamorous.div({
  padding: 20,
});

const enhance = connect(
  ({ modal, location }) => ({
    location,
    displayModal: modal.display,
  }),
  { openModal, closeModal },
);

const AppContainer = enhance(App);

function Root() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default Root;
