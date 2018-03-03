// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { AutoSuggest } from '.';
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
    const { value } = this.props;
    return (
      <Container>
        <Input
          className="search"
          value={value}
          data-name="input"
          placeholder="Search..."
          onChange={this.handleChange}
        />
        <AutoSuggest data={[{ text: 'test' }]} query={value} />
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
  '& > input:focus + .autosuggest': {
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

export default Search;
