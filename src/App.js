// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { Header } from './components/';
import { colors } from './lib/constants';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <Container>
        <Header />
        <Heading>Introduction</Heading>
      </Container>
    );
  }
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.lightgrey,
  flex: 1,
});

const Heading = glamorous.h1({});

export default App;
