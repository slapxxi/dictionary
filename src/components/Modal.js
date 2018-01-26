// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import Link from 'redux-first-router-link';
import anime from 'animejs';
import Icon from 'react-icons/lib/fa/close';
import SearchIcon from 'react-icons/lib/fa/search';
import { colors } from '../lib/constants';

type Props = {
  visible: boolean,
  children: any,
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
        translateY: '-100%',
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
        style={{ transform: 'translateY(-100%)' }}
      >
        <Header>
          <Icon onClick={this.props.onClose} size={20} />
          <Link to="/search" href="/search">
            <SearchIcon size={20} style={{ color: colors.white }} />
          </Link>
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
