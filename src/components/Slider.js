// @flow
import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import { tween } from 'popmotion';
import glamorous from 'glamorous';

type Props = {
  data: Data,
  index?: number,
  renderSlide: (any) => any,
};

type State = {
  index: number,
  style: Object,
  prevStyle: Object,
  nextStyle: Object,
};

type Data = Array<any>;

class Slider extends Component<Props, State> {
  defaultStyles = {
    style: { transform: 'none', opacity: 1 },
    prevStyle: { transform: 'translateX(-200%)', opacity: 0 },
    nextStyle: {
      transform: 'translateX(-100%)',
      opacity: 0,
    },
  };

  constructor(props: Props) {
    super(props);
    const { index = 0 } = props;
    this.state = {
      index,
      ...this.defaultStyles,
    };
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.index === props.index) {
      return;
    }
    let animation;
    const direction = this.getDirection(props);
    if (direction === 'stale') {
      return;
    }
    if (direction === 'next') {
      animation = {
        from: { x: 0, prevX: -200, nextX: -100, show: 0 },
        to: { x: -100, prevX: -200, nextX: -200, show: 0.5 },
      };
    } else {
      animation = {
        from: { x: 0, hide: 1, prevX: -200, nextX: 0, show: 0 },
        to: { x: 100, hide: 0, prevX: -100, nextX: 0, show: 0.5 },
      };
    }
    tween(animation).start({
      update: ({ x, prevX, nextX, show }) => {
        this.setState({
          style: { transform: `translateX(${x}%)` },
          prevStyle: {
            transform: `translateX(${prevX}%)`,
            opacity: show,
          },
          nextStyle: {
            transform: `translateX(${nextX}%)`,
            opacity: show,
          },
        });
      },
      complete: () => {
        this.setState({ index: props.index, ...this.defaultStyles });
      },
    });
  }

  getDirection = (props: Props) => {
    const { index = 0 } = props;
    if (index < this.state.index) {
      return 'prev';
    }
    if (index > this.state.index) {
      return 'next';
    }
    return 'stale';
  };

  getItems = (props: Props) => {
    const { data } = props;
    const { index } = this.state;
    const item = data[index];
    const prevItem = data[index - 1];
    const nextItem = data[index + 1];
    return { item, nextItem, prevItem };
  };

  render() {
    const { index } = this.state;
    const { item, nextItem, prevItem } = this.getItems(this.props);
    const { data, renderSlide } = this.props;
    if (isEmpty(data)) {
      return null;
    }
    return (
      <Container>
        {renderSlide({ item, index, style: this.state.style })}
        {prevItem
          ? renderSlide({
              index: index - 1,
              item: prevItem,
              style: this.state.prevStyle,
            })
          : renderSlide({ item: {} })}
        {nextItem &&
          renderSlide({
            index: index + 1,
            item: nextItem,
            style: this.state.nextStyle,
          })}
      </Container>
    );
  }
}

const Container = glamorous.div({
  display: 'flex',
  flex: 1,
  flexBasis: '100%',
  alignSelf: 'stretch',
});

export default Slider;
