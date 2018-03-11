// @flow
import { inRange } from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WordList, Keyboard } from '../components';
import { learn, changeIndex, view } from '../store/actions';
import type { Action, DictionaryEntry } from '../store/types';

type Props = {
  index: number,
  words: Array<DictionaryEntry>,
  learn: (index: number) => Action,
  view: (index: number) => Action,
  onChangeIndex: (index: number) => void,
};

type State = { expanded: boolean };

class Words extends Component<Props, State> {
  debounce = false;

  state = {
    expanded: false,
  };

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

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

  handleShow = (index: number) => {
    this.timeout = setTimeout(() => {
      if (this.props.view) {
        this.props.view(index);
      }
    }, 500);
  };

  nextWord = () => {
    if (this.state.expanded) {
      return;
    }
    if (this.debounce) {
      return;
    }
    const nextIndex = this.props.index + 1;
    if (this.inRange(nextIndex)) {
      this.debounce = true;
      this.props.onChangeIndex(nextIndex);
      setTimeout(() => (this.debounce = false), 500);
    }
  };

  prevWord = () => {
    if (this.state.expanded) {
      return;
    }
    if (this.debounce) {
      return;
    }
    const nextIndex = this.props.index - 1;
    if (this.inRange(nextIndex)) {
      this.debounce = true;
      this.props.onChangeIndex(nextIndex);
      setTimeout(() => (this.debounce = false), 500);
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

  inRange = (index: number) => {
    return inRange(index, 0, this.props.words.length);
  };

  render() {
    return (
      <Fragment>
        <Keyboard onPress={this.handlePress} />
        <WordList
          words={this.props.words}
          index={this.props.index}
          expand={this.state.expanded}
          onToggle={this.handleToggle}
          onShow={this.handleShow}
        />
      </Fragment>
    );
  }
}

const enhance = connect(
  ({ dictionary }) => ({
    words: dictionary.entries,
    index: dictionary.index,
  }),
  {
    view,
    learn,
    onChangeIndex: changeIndex,
  },
);

export { Words };

export default enhance(Words);
