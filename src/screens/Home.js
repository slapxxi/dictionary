import React from 'react';
import glamorous from 'glamorous';

function Home() {
  return (
    <Container>
      <h1>Dashboard</h1>
    </Container>
  );
}

const Container = glamorous.div({
  flex: 1,
});

export default Home;
