// @flow
import { inRange, random } from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WordList, Keyboard } from '../components';
import { learn } from '../store/actions';
import type { Action, DictionaryEntry } from '../store/types';

type Props = {
  words: Array<DictionaryEntry>,
  learn: (index: number) => Action,
};

type State = { index: number, expanded: boolean };

class Words extends Component<Props, State> {
  debounce = false;

  state = {
    index: random(0, this.props.words.length - 1),
    expanded: false,
  };

  handlePress = ({ key }) => {
    if (key === 'ArrowLeft') {
      this.prevWord();
    }
    if (key === 'ArrowRight') {
      this.nextWord();
    }
    if (key === 'ArrowUp') {
      this.hideDetails();
    }
    if (key === 'ArrowDown') {
      this.showDetails();
    }
  };

  handleToggle = (index: number) => {
    this.props.learn(index);
  };

  nextWord = () => {
    if (this.state.expanded) {
      return;
    }
    if (this.debounce) {
      return;
    }
    const nextIndex = this.state.index + 1;
    if (this.inRange(nextIndex)) {
      this.debounce = true;
      this.setState({ index: nextIndex }, () =>
        setTimeout(() => (this.debounce = false), 500),
      );
    }
  };

  prevWord = () => {
    if (this.state.expanded) {
      return;
    }
    if (this.debounce) {
      return;
    }
    const nextIndex = this.state.index - 1;
    if (this.inRange(nextIndex)) {
      this.debounce = true;
      this.setState({ index: nextIndex }, () =>
        setTimeout(() => (this.debounce = false), 500),
      );
    }
  };

  showDetails = () => {
    if (!this.state.expanded) {
      this.setState({ expanded: true });
    }
  };

  hideDetails = () => {
    if (this.state.expanded) {
      this.setState({ expanded: false });
    }
  };

  inRange = (index) => {
    return inRange(index, 0, this.props.words.length);
  };

  render() {
    return (
      <Fragment>
        <Keyboard onPress={this.handlePress} />
        <WordList
          words={this.props.words}
          index={this.state.index}
          expand={this.state.expanded}
          onToggle={this.handleToggle}
        />
      </Fragment>
    );
  }
}

const enhance = connect(
  ({ dictionary }) => ({
    words: dictionary.entries,
  }),
  { learn },
);

export default enhance(Words);
