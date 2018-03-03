// @flow
import React from 'react';
import { connect } from 'react-redux';

type Props = { index: number, total: number, style?: Object };

function CurrentIndex({ index, total, style }: Props) {
  return (
    <nav style={style} className="current-index">
      {index + 1}/{total}
    </nav>
  );
}

const enhance = connect(({ dictionary }) => ({
  index: dictionary.index,
  total: dictionary.entries.length,
}));

export { CurrentIndex };

export default enhance(CurrentIndex);
