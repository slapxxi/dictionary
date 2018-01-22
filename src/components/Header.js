import React from 'react';
import glamorous from 'glamorous';
import FaSearch from 'react-icons/lib/fa/search';
import FaBars from 'react-icons/lib/fa/bars';
import { colors } from '../lib/constants';

function Header() {
  return (
    <Container>
      <MenuIcon size={20} fill={colors.midgrey} />
      <SearchIcon size={20} fill={colors.midgrey} />
    </Container>
  );
}

const Container = glamorous.header({
  position: 'sticky',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
  backgroundColor: colors.white,
});

const activeIconStyle = {
  ':active': {
    fill: colors.black,
  },
};

const MenuIcon = glamorous(FaBars)(activeIconStyle);

const SearchIcon = glamorous(FaSearch)(activeIconStyle);

export default Header;
