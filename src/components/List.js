// @flow
import React from 'react';
import type { Element } from 'react';

type Props = { data: Array<any>, renderItem: (any) => Element<any> };

function List({ data, renderItem }: Props) {
  return (
    <ul>
      <li>Item</li>
    </ul>
  );
}

export default List;
