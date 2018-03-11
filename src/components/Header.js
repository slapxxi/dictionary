// @flow
import React from 'react';
import glamorous from 'glamorous';
import { NavLink } from 'redux-first-router-link';
import Search from 'react-icons/lib/fa/search';
import ListIcon from 'react-icons/lib/fa/list-ul';
import { CurrentIndex, Route, Badge } from './';
import { colors, theme } from '../lib/constants';

type Props = { iconSize?: number };

function Header({ iconSize = 20 }: Props) {
  return (
    <Container>
      <Route to="/">
        <CurrentIndex style={{ flex: 1, padding: 10 }} />
      </Route>
      <Link
        to="/search"
        href="/search"
        className="route-search"
        activeStyle={{ color: theme.activelink }}
      >
        <SearchIcon size={iconSize} />
      </Link>
      <Link
        to="/"
        href="/"
        className="route-home"
        activeStyle={{ color: theme.activelink }}
        exact
      >
        <ListIcon size={iconSize} />
        <Badge />
      </Link>
    </Container>
  );
}

const Link = glamorous(NavLink)({
  position: 'relative',
  padding: 10,
  color: colors.grey,
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
