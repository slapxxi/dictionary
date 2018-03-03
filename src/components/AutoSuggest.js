// @flow
import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import glamorous from 'glamorous';

type Props = { data: Array<any>, query: any };

class AutoSuggest extends Component<Props> {
  render() {
    const { data, query } = this.props;
    if (!data || isEmpty(data) || !query) {
      return null;
    }
    return (
      <Container className="autosuggest">
        <ul>
          <ListItem>abide</ListItem>
          <ListItem>abysmal</ListItem>
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
