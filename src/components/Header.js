// @flow
import React from 'react';
import glamorous from 'glamorous';
import { NavLink } from 'redux-first-router-link';
import FaSearch from 'react-icons/lib/fa/search';
import FaBars from 'react-icons/lib/fa/bars';
import { theme } from '../lib/constants';

type Props = { onMenuClick: () => void };

function Header({ onMenuClick }: Props) {
  return (
    <Container>
      <MenuIcon size={20} fill={theme.link} onClick={onMenuClick} />
      <NavLink
        to="/search"
        href="/search"
        style={{ color: theme.link }}
        activeStyle={{ color: theme.activeLink }}
      >
        <SearchIcon size={20} />
      </NavLink>
    </Container>
  );
}

const Container = glamorous.header({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
  backgroundColor: theme.bg,
});

const activeIconStyle = {
  ':active': {
    fill: theme.activeLink,
  },
};

const MenuIcon = glamorous(FaBars)(activeIconStyle);

const SearchIcon = glamorous(FaSearch)(activeIconStyle);

export default Header;
