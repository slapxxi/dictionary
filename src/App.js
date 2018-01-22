// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <Container>
        <Heading>Introduction</Heading>
      </Container>
    );
  }
}

const Container = glamorous.div({
  display: 'flex',
  flex: 1,
});

const Heading = glamorous.h1({
  flex: 1,
});

export default App;
