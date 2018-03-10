// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { suggest } from '../lib';
import type { DictionaryEntry } from '../store/types';

type Props<T> = {
  data: Array<T>,
  query: string,
  render: (T) => any,
};

class AutoSuggest extends Component<Props<DictionaryEntry>> {
  render() {
    const { data, query, render } = this.props;
    if (!data || _.isEmpty(data) || !query) {
      return null;
    }
    const matches = suggest(query, data, _.property('word'));
    return (
      <Container className="autosuggest">
        <ul>
          {matches.map(
            (m) =>
              render(m) && (
                <ListItem key={m.id}>{render(m)}</ListItem>
              ),
          )}
        </ul>
      </Container>
    );
  }
}

const Container = glamorous.div({
  display: 'flex',
  flex: 1,
});

const ListItem = glamorous.li({
  padding: '12px 0',
  textAlign: 'center',
  fontSize: 24,
});

export default AutoSuggest;
