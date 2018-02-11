// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { theme } from '../lib/constants';
import type { DictionaryEntry } from '../store/types';

type State = { index: number };

type Props = { words: Array<DictionaryEntry>, index?: number };

class WordList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { index = 0 } = props;
    this.state = { index };
  }

  componentWillMount() {
    if (this.isOutOfRange()) {
      const { words } = this.props;
      const { index } = this.state;
      throw new Error(
        `Words contain ${
          words.length
        } items but provided index ${index}`,
      );
    }
  }

  isOutOfRange = () => {
    if (this.isEmpty()) {
      return false;
    }
    const { index = 0 } = this.props;
    return index > this.props.words.length - 1;
  };

  isEmpty = () => {
    return this.props.words.length === 0;
  };

  render() {
    if (this.isEmpty()) {
      return null;
    }
    const { words } = this.props;
    const { index } = this.state;
    const entry = words[index];
    return (
      <Container>
        <Word learnt={entry.learnt}>{entry.word}</Word>
      </Container>
    );
  }
}

const Container = glamorous.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Word = glamorous.h1(({ learnt }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  fontSize: 64,
  fontWeight: 'normal',
  color: theme.text,
  textShadow: '3px 3px rgba(0,0,0,0.3)',
  textDecoration: learnt ? 'line-through' : null,
}));

export default WordList;
