// @flow
import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { suggest } from '../lib';

type Props = { data: Array<Datum>, query: any };

type Datum = { id: number, text: string };

class AutoSuggest extends Component<Props> {
  render() {
    const { data, query } = this.props;
    if (!data || isEmpty(data) || !query) {
      return null;
    }
    const matches = suggest(query, data);
    return (
      <Container className="autosuggest">
        <ul>
          {matches.map((m) => (
            <ListItem key={m.id}>{m.text}</ListItem>
          ))}
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
  textDecoration: 'underline',
  textAlign: 'center',
});

export default AutoSuggest;
