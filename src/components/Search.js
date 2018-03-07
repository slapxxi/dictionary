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
    const { value } = this.props;
    return (
      <Input
        className="search"
        value={value}
        data-test="input"
        onChange={this.handleChange}
        placeholder="Search"
      />
    );
  }
}

const Input = glamorous.input({
  display: 'block',
  width: '100%',
  border: 0,
  backgroundColor: 'transparent',
  fontSize: 64,
  textAlign: 'center',
  color: theme.text,
  '&:focus': {
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
