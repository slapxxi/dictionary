// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeIndex } from '../store/actions';

type Props = {
  index: number,
  total: number,
  style?: Object,
  onChange?: (number) => void,
};

type State = { active: boolean };

class CurrentIndex extends Component<Props, State> {
  state = { active: false };

  handleClick = () => {
    this.setState({ active: true });
  };

  handleBlur = ({ currentTarget }: Event) => {
    const { index, onChange } = this.props;
    if (onChange) {
      const nextIndex = this.parseIndex(currentTarget.value);
      if (nextIndex && nextIndex !== index + 1) {
        onChange(nextIndex);
      }
    }
    this.setState({ active: false });
  };

  handleChange = (event: Event) => {
    if (event.key === 'Enter') {
      this.handleBlur(event);
    }
  };

  parseIndex = (value: string) => {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return undefined;
    }
    return this.clamp(parsed);
  };

  clamp = (value: number) => {
    const { total } = this.props;
    return _.clamp(value, 1, total);
  };

  render() {
    const { style, index, total } = this.props;
    if (this.state.active) {
      return this.renderInput();
    }
    return (
      <nav style={style} className="current-index">
        <button onClick={this.handleClick}>
          {index + 1}/{total}
        </button>
      </nav>
    );
  }

  renderInput() {
    const { style } = this.props;
    return (
      <input
        autoFocus
        style={style}
        type="text"
        onKeyPress={this.handleChange}
        onBlur={this.handleBlur}
        className="current-index_input"
      />
    );
  }
}

const enhance = connect(
  ({ dictionary }) => ({
    index: dictionary.index,
    total: dictionary.entries.length,
  }),
  { onChange: (index) => changeIndex(index - 1) },
);

export { CurrentIndex };

export default enhance(CurrentIndex);
