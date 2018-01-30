import React from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import Home from 'react-icons/lib/fa/home';
import User from 'react-icons/lib/fa/male';
import Globe from 'react-icons/lib/fa/globe';
import Cog from 'react-icons/lib/fa/cog';
import { Modal } from '.';
import { closeModal } from '../store/actions';
import { colors, theme } from '../lib/constants';

type Props = { displayModal: boolean, closeModal: () => void };

function Navigation({ displayModal, closeModal }: Props) {
  return (
    <Modal
      visible={displayModal}
      onClose={closeModal}
      style={{
        background: colors.bg,
        color: colors.white,
      }}
    >
      <Container>
        <Link
          to="/"
          href="/"
          activeStyle={{ color: colors.white }}
          exact
        >
          <Home />
          Dashboard
        </Link>
        <Link
          to="/profile"
          href="/profile"
          activeStyle={{ color: colors.white }}
        >
          <User />
          Profile
        </Link>
        <Link
          to="/browse"
          href="/browse"
          activeStyle={{ color: colors.white }}
        >
          <Globe />
          Browse
        </Link>
        <Link
          to="/settings"
          href="/settings"
          activeStyle={{ color: colors.white }}
        >
          <Cog />
          Settings
        </Link>
      </Container>
    </Modal>
  );
}

const Container = glamorous.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 20,
});

const Link = glamorous(NavLink)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  paddingTop: 20,
  paddingBottom: 20,
  fontSize: 20,
  fontWeight: 500,
  color: theme.link,
  ':hover': {
    color: theme.activeLink,
  },
  ':hover > first-child': {
    fill: theme.activeLink,
  },
  '& :first-child': {
    marginRight: 20,
  },
});

const enhance = connect(
  ({ modal }) => ({ displayModal: modal.display }),
  { closeModal },
);

export default enhance(Navigation);
