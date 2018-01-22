// @flow
import React from 'react';
import type { Element } from 'react';

type Props = {
  style?: Object,
  data: Array<any>,
  renderItem: (any) => Element<any>,
};

function List({ data, renderItem, style = {} }: Props) {
  return (
    <ul style={style}>{data.map((item) => renderItem(item))}</ul>
  );
}

export default List;
