// @flow
import React from 'react';
import glamorous from 'glamorous';
import Link from 'redux-first-router-link';
import FaSearch from 'react-icons/lib/fa/search';
import FaBars from 'react-icons/lib/fa/bars';
import { colors } from '../lib/constants';

type Props = { onMenuClick: () => void };

function Header({ onMenuClick }: Props) {
  return (
    <Container>
      <MenuIcon size={20} fill={colors.black} onClick={onMenuClick} />
      <Link to="/search" href="/search">
        <SearchIcon size={20} fill={colors.black} />
      </Link>
    </Container>
  );
}

const Container = glamorous.header({
  position: 'sticky',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
});

const activeIconStyle = {
  ':active': {
    fill: colors.black,
  },
};

const MenuIcon = glamorous(FaBars)(activeIconStyle);

const SearchIcon = glamorous(FaSearch)(activeIconStyle);

export default Header;
