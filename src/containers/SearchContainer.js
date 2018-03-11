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
            learnt={item.learnt}
            to={{
              type: 'HOME_ROUTE',
              payload: { index: item.id },
            }}
          >
            {item.word}
            {item.viewCount === 0 && <Indicator />}
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

const NavigationLink = glamorous(Link)(
  {
    position: 'relative',
    color: theme.subtext,
    '&:hover': {
      textDecoration: 'none',
      color: theme.activelink,
    },
  },
  ({ learnt }) => ({
    textDecoration: learnt ? 'line-through' : 'underline',
    color: learnt ? theme.hiddentext : 'inherit',
  }),
);

const Indicator = glamorous.div({
  position: 'absolute',
  top: 0,
  left: 'calc(100% + 2.5px)',
  width: 5,
  height: 5,
  backgroundColor: theme.badge,
  borderRadius: '50%',
});

const enhance = connect(
  ({ search, dictionary }) => ({
    value: search.query,
    data: dictionary.entries,
  }),
  { onChange: search },
);

export default enhance(SearchContainer);
