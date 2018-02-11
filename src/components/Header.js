// @flow
import React from 'react';
import glamorous from 'glamorous';
import { NavLink } from 'redux-first-router-link';
import Search from 'react-icons/lib/fa/search';
import Flask from 'react-icons/lib/fa/flask';
import Random from 'react-icons/lib/fa/random';
import { colors, theme } from '../lib/constants';

function Header() {
  return (
    <Container>
      <Link
        to="/search"
        href="/search"
        activeStyle={{ color: theme.activelink }}
      >
        <SearchIcon size={20} />
      </Link>
      <Link
        to="/random"
        href="/random"
        activeStyle={{ color: theme.activelink }}
      >
        <Random size={20} />
      </Link>
      <Link
        to="/new"
        href="/new"
        activeStyle={{ color: theme.activelink }}
      >
        <Flask size={20} />
        <Badge>8</Badge>
      </Link>
    </Container>
  );
}

const Link = glamorous(NavLink)({
  position: 'relative',
  padding: 10,
  color: colors.grey,
});

const Badge = glamorous.div({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'tomato',
  position: 'absolute',
  borderRadius: '50%',
  verticalAlign: 'middle',
  padding: 2,
  minWidth: 20,
  minHeight: 20,
  fontSize: 12,
  bottom: '100%',
  left: '100%',
  marginLeft: -15,
  marginBottom: -15,
  color: colors.white,
});

const Container = glamorous.header({
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: 20,
});

const activeIconStyle = {
  ':active': {
    fill: theme.activelink,
  },
};

const SearchIcon = glamorous(Search)(activeIconStyle);

export default Header;
