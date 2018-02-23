// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { theme } from '../lib/constants';

type Props = { value: string, onChange?: (string) => void };

class Search extends Component<Props> {
  handleChange = ({
    currentTarget,
  }: SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(currentTarget.value);
    }
  };

  render() {
    return (
      <Container>
        <Input
          value={this.props.value}
          data-name="input"
          placeholder="Search..."
          onChange={this.handleChange}
        />
        <Suggestions>
          <li>Suggestion</li>
        </Suggestions>
      </Container>
    );
  }
}

const Container = glamorous.div({
  flexDirection: 'column',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  '& > input:focus + ul': {
    fontSize: 32,
  },
});

const Input = glamorous.input({
  flex: 1,
  display: 'block',
  width: '100%',
  border: 0,
  backgroundColor: 'transparent',
  fontSize: 64,
  textAlign: 'center',
  color: theme.text,
  transition: 'all 0.3s',
  '&:focus': {
    flex: 0.33,
    fontSize: 32,
    outline: 0,
    '&::placeholder': {
      color: 'transparent',
    },
  },
  '::placeholder': {
    color: theme.subtext,
  },
});

const Suggestions = glamorous.ul({
  flex: 1,
  transition: 'all 0.3s',
});

export default Search;
