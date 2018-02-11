// @flow
import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import glamorous from 'glamorous';

type Props = {
  data: Data,
  index?: number,
  renderSlide: (any) => any,
};

type Data = Array<any>;

class Slider extends Component<Props> {
  render() {
    const { data, renderSlide, index = 0 } = this.props;
    if (isEmpty(data)) {
      return null;
    }
    const item = data[index];
    return <Container>{renderSlide({ item })}</Container>;
  }
}

const Container = glamorous.div({
  display: 'flex',
  flex: 1,
  flexBasis: '100%',
  alignSelf: 'stretch',
});

export default Slider;
