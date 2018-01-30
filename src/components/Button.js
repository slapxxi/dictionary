// @flow
import React from 'react';
import glamorous from 'glamorous';
import { theme } from '../lib/constants';

type Props = { children: any, onPress: () => void };

function Button({ children, onPress }: Props) {
  return <Container onClick={onPress}>{children}</Container>;
}

const Container = glamorous.button({
  width: '100%',
  padding: 8,
  paddingTop: 16,
  paddingBottom: 16,
  border: 0,
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  backgroundColor: theme.bg,
  outline: 0,
  color: theme.activeLink,
  ':active': {
    backgroundColor: theme.link,
  },
});

export default Button;
