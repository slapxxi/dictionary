// @flow
import React from 'react';
import glamorous from 'glamorous';
import { NavLink } from 'redux-first-router-link';
import Search from 'react-icons/lib/fa/search';
import ListIcon from 'react-icons/lib/fa/list-ul';
import { CurrentIndex, Route, Badge } from './';

type Props = { iconSize?: number };

function Header({ iconSize = 20 }: Props) {
  return (
    <Container>
      <Route to="/">
        <CurrentIndex style={{ flex: 1, padding: 10 }} />
      </Route>
      <Link to="/search" href="/search" className="route-search">
        <SearchIcon size={iconSize} />
      </Link>
      <Link to="/" href="/" className="route-home" exact>
        <ListIcon size={iconSize} />
        <Badge />
      </Link>
    </Container>
  );
}

const Link = glamorous(NavLink)(
  {
    position: 'relative',
    padding: 10,
  },
  ({ theme }) => ({
    color: theme.subtext,
    '&.active': {
      color: theme.activelink,
    },
  }),
);

const Container = glamorous.header({
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: 20,
});

const SearchIcon = glamorous(Search)(({ theme }) => ({
  ':active': {
    fill: theme.activelink,
  },
}));

export default Header;
