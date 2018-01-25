// @flow
import React, { Component, Children } from 'react';
import glamorous from 'glamorous';
import anime from 'animejs';
import Icon from 'react-icons/lib/fa/close';
import { colors } from '../lib/constants';

type Props = {
  visible: boolean,
  children: typeof Children,
  onClose: () => void,
};

class Modal extends Component<Props> {
  ref: ?HTMLElement = null;

  componentWillReceiveProps({ visible }: Props) {
    anime.remove(this.ref);
    if (visible) {
      document.querySelector('html').classList.add('no-scroll');
      anime({
        targets: this.ref,
        translateY: 0,
        duration: 300,
        easing: 'easeInOutCubic',
      });
    } else {
      document.querySelector('html').classList.remove('no-scroll');
      anime({
        targets: this.ref,
        translateY: -1000,
        duration: 300,
        easing: 'easeInOutCubic',
      });
    }
  }

  setRef = (ref: ?HTMLElement) => {
    this.ref = ref;
  };

  render() {
    return (
      <Container
        ariaHidden={!this.props.visible}
        innerRef={this.setRef}
        className="unique-name"
        style={{ transform: 'translateY(-1000px)' }}
      >
        <Header>
          <Icon onClick={this.props.onClose} size={20} />
        </Header>
        <Content>{this.props.children}</Content>
      </Container>
    );
  }
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'fixed',
  right: 0,
  left: 0,
  height: '100%',
  zIndex: 1,
  padding: 20,
  backgroundColor: colors.black,
  color: colors.white,
});

const Header = glamorous.header({
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'flex-start',
});

const Content = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

export default Modal;
