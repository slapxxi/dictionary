import React from 'react';
import glamorous from 'glamorous';

function Home() {
  return (
    <Container>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Molestiae magnam tenetur, consequatur laborum obcaecati alias,
        amet modi minus quisquam, esse aspernatur harum sunt? Sunt
        odit porro unde recusandae, sed consequatur.
      </p>
    </Container>
  );
}

const Container = glamorous.div({
  flex: 1,
});

export default Home;
