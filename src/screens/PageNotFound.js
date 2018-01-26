import React from 'react';
import glamorous from 'glamorous';
import { colors } from '../lib/constants';

function PageNotFound() {
  return (
    <Container>
      <Heading>404</Heading>
      <h2>Page Not Found</h2>
    </Container>
  );
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

const Heading = glamorous.h1({
  padding: 20,
  color: colors.midgrey,
});

export default PageNotFound;
