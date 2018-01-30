// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import anime from 'animejs';
import Icon from 'react-icons/lib/fa/close';
import { colors } from '../lib/constants';

type Props = {
  visible: boolean,
  children: any,
  onClose: () => void,
  style?: Object,
};

class Modal extends Component<Props> {
  updated = false;
  ref: ?HTMLElement = null;

  componentDidMount() {
    if (this.props.visible) {
      this.disableScrolling();
    }
  }

  componentWillReceiveProps({ visible }: Props) {
    this.updated = true;
    anime.remove(this.ref);
    if (visible) {
      this.disableScrolling();
      anime({
        targets: this.ref,
        translateY: 0,
        duration: 300,
        easing: 'easeInOutCubic',
      });
    } else {
      this.enableScrolling();
      anime({
        targets: this.ref,
        translateY: '-100%',
        duration: 300,
        easing: 'easeInOutCubic',
      });
    }
  }

  enableScrolling = () => {
    const html = document.querySelector('html');
    if (html) {
      html.classList.remove('no-scroll');
    }
  };

  disableScrolling = () => {
    const html = document.querySelector('html');
    if (html) {
      html.classList.add('no-scroll');
    }
  };

  getStyleBeforeTransition = () => {
    if (this.updated) {
      return this.props.visible
        ? { transform: 'translateY(-100%)' }
        : {};
    }
    return this.props.visible
      ? {}
      : { transform: 'translateY(-100%)' };
  };

  setRef = (ref: ?HTMLElement) => {
    this.ref = ref;
  };

  render() {
    return (
      <Container
        ariaHidden={!this.props.visible}
        innerRef={this.setRef}
        css={this.props.style}
        style={this.getStyleBeforeTransition()}
      >
        <Header>
          <Icon
            onClick={this.props.onClose}
            size={20}
            fill="#4D586C"
          />
        </Header>
        <Content>{this.props.children}</Content>
      </Container>
    );
  }
}

const Container = glamorous.div({
  position: 'fixed',
  right: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  zIndex: 1,
  padding: 20,
  backgroundColor: colors.white,
});

const Header = glamorous.header({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

const Content = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export default Modal;
