// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { timeline } from 'popmotion';
import glamorous from 'glamorous';

type Props = {
  data: Data,
  index?: number,
  renderSlide: (any) => any,
  onTransitionEnd?: (index: number) => any,
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

  componentDidMount() {
    this.endTransition();
  }

  componentWillUnmount() {
    if (this.animation) {
      this.animation.stop();
    }
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
      animation = timeline([
        [
          {
            track: 'opacity',
            from: 1,
            to: 0,
          },
          {
            track: 'scale',
            from: 1,
            to: 0.5,
            duration: 200,
          },
        ],
        75,
        [
          {
            track: 'x',
            from: 0,
            to: -100,
          },
          {
            track: 'nextOpacity',
            from: 0,
            to: 1,
          },
          {
            track: 'nextX',
            from: -100,
            to: -200,
          },
          {
            track: 'prevX',
            from: -200,
            to: -200,
          },
        ],
        200,
        {
          track: 'nextScale',
          from: 0.5,
          to: 1,
        },
      ]);
    } else {
      animation = timeline([
        [
          {
            track: 'opacity',
            from: 1,
            to: 0,
          },
          {
            track: 'scale',
            from: 1,
            to: 0.5,
            duration: 200,
          },
        ],
        75,
        [
          {
            track: 'x',
            from: 0,
            to: 100,
          },
          {
            track: 'nextOpacity',
            from: 0,
            to: 1,
          },
          {
            track: 'nextX',
            from: 0,
            to: 0,
          },
          {
            track: 'prevX',
            from: -200,
            to: -100,
          },
        ],
        200,
        {
          track: 'nextScale',
          from: 0.5,
          to: 1,
        },
      ]);
    }
    this.animation = animation.start({
      update: ({
        x,
        prevX,
        nextX,
        opacity,
        nextOpacity,
        scale,
        nextScale,
      }) => {
        this.setState(() => ({
          style: {
            transform: `translateX(${x}%) scale(${scale})`,
            opacity,
          },
          prevStyle: {
            transform: `translateX(${prevX}%) scale(${nextScale})`,
            opacity: nextOpacity,
          },
          nextStyle: {
            transform: `translateX(${nextX}%) scale(${nextScale})`,
            opacity: nextOpacity,
          },
        }));
      },
      complete: () => {
        this.endTransition();
        this.setState(() => ({
          index: props.index,
          ...this.defaultStyles,
        }));
      },
    });
  }

  endTransition = () => {
    if (this.props.onTransitionEnd) {
      const { index = this.state.index } = this.props;
      this.props.onTransitionEnd(index);
    }
  };

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
    let prevIndex;
    let nextIndex;
    const { data } = props;
    const { index } = this.state;
    const item = data[index];
    if (_.isUndefined(props.index)) {
      prevIndex = index - 1;
      nextIndex = index + 1;
    } else {
      prevIndex = props.index;
      nextIndex = props.index;
    }
    const prevItem = data[prevIndex];
    const nextItem = data[nextIndex];
    return { item, nextItem, prevItem };
  };

  render() {
    const { index } = this.state;
    const { item, nextItem, prevItem } = this.getItems(this.props);
    const { data, renderSlide } = this.props;
    if (_.isEmpty(data)) {
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
