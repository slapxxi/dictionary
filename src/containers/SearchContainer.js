// @flow
import React from 'react';
import glamorous from 'glamorous';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import { Search, AutoSuggest } from '../components';
import { search } from '../store/actions';
import { theme } from '../lib/constants';
import type { DictionaryEntry } from '../store/types';

type Props = {
  value: string,
  data: Array<DictionaryEntry>,
  onChange: () => void,
};

function SearchContainer({ value, data, onChange }: Props) {
  return (
    <Container>
      <InputContainer>
        <Search value={value} onChange={onChange} />
      </InputContainer>
      <AutoSuggest
        query={value}
        data={data}
        render={(item) => (
          <NavigationLink
            to={{
              type: 'HOME_ROUTE',
              payload: { index: item.id },
            }}
          >
            {item.word}
          </NavigationLink>
        )}
      />
    </Container>
  );
}

const Container = glamorous.div({
  flexDirection: 'column',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
});

const InputContainer = glamorous.div({
  marginBottom: 20,
});

const NavigationLink = glamorous(Link)({
  color: theme.subtext,
  '&:hover': {
    textDecoration: 'none',
    color: theme.activelink,
  },
});

const enhance = connect(
  ({ search, dictionary }) => ({
    value: search.query,
    data: dictionary.entries,
  }),
  { onChange: search },
);

export default enhance(SearchContainer);
