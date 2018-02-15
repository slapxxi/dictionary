// @flow
import { inRange } from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WordList, Keyboard } from '../components';
import type { DictionaryEntry } from '../store/types';

type Props = { words: Array<DictionaryEntry> };

type State = { index: number };

class Words extends Component<Props, State> {
  debounce = false;

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
    if (this.debounce) {
      return;
    }
    const nextIndex = this.state.index + 1;
    if (this.inRange(nextIndex)) {
      this.debounce = true;
      this.setState({ index: nextIndex }, () =>
        setTimeout(() => (this.debounce = false), 800),
      );
    }
  };

  prevWord = () => {
    if (this.debounce) {
      return;
    }
    const nextIndex = this.state.index - 1;
    if (this.inRange(nextIndex)) {
      this.debounce = true;
      this.setState({ index: nextIndex }, () =>
        setTimeout(() => (this.debounce = false), 800),
      );
    }
  };

  inRange = (index) => {
    return inRange(index, 0, this.props.words.length);
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
