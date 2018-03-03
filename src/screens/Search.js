import React, { Component } from 'react';
import glamorous from 'glamorous';
import { Button } from '../components';
import { theme } from '../lib/constants';

class Search extends Component {
  state = { query: '', category: 'projects' };

  handleChange = ({ target }) => {
    this.setState({ query: target.value });
  };

  handleSearch = () => {};

  render() {
    return (
      <Container>
        <Heading>Search</Heading>
        <InputContainer>
          <Input
            className="search"
            type="search"
            placeholder="Query..."
            value={this.state.query}
            onChange={this.handleChange}
          />
        </InputContainer>
        <Button onPress={this.handleSearch}>Search</Button>
      </Container>
    );
  }
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: 20,
});

const Heading = glamorous.h1({
  fontWeight: 'normal',
  color: theme.heading,
});

const InputContainer = glamorous.div({
  flex: 1,
  paddingTop: 20,
  paddingBottom: 20,
});

const Input = glamorous.input({
  appearance: 'none',
  display: 'inline-block',
  width: '100%',
  padding: 10,
  fontSize: 18,
  border: '1px solid lightgrey',
  borderRadius: 4,
});

export default Search;
