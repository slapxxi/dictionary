// @flow
import { Component } from 'react';

type Props = { onPress: (event: KeyboardEvent) => void };

class Keyboard extends Component<Props> {
  componentDidMount() {
    document.addEventListener('keydown', this.props.onPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.onPress);
  }

  render() {
    return null;
  }
}

export default Keyboard;
