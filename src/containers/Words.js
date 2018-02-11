// @flow
import { inRange } from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WordList, Keyboard } from '../components';
import type { DictionaryEntry } from '../store/types';

type Props = { words: Array<DictionaryEntry> };

type State = { index: number };

class Words extends Component<Props, State> {
  state = { index: 0 };

  handlePress = ({ key }) => {
    if (key === 'ArrowLeft') {
      this.prevWord();
    }
    if (key === 'ArrowRight') {
      this.nextWord();
    }
  };

  nextWord = () => {
    const nextIndex = this.state.index + 1;
    if (this.inRange(nextIndex)) {
      this.setState({ index: nextIndex });
    }
  };

  prevWord = () => {
    const nextIndex = this.state.index - 1;
    if (this.inRange(nextIndex)) {
      this.setState({ index: nextIndex });
    }
  };

  inRange = (index) => {
    return inRange(index, 0, this.props.words.length - 1);
  };

  render() {
    return (
      <Fragment>
        <Keyboard onPress={this.handlePress} />
        <WordList words={this.props.words} index={this.state.index} />
      </Fragment>
    );
  }
}

const enhance = connect(({ dictionary }) => ({
  words: dictionary.entries,
}));

export default enhance(Words);
