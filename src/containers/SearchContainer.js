// @flow
import React from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { Search, AutoSuggest } from '../components';
import { search } from '../store/actions';

type Props = {
  value: string,
  data: Array<Object>,
  onChange: () => void,
};

function SearchContainer({ value, data, onChange }: Props) {
  return (
    <Container>
      <InputContainer>
        <Search value={value} onChange={onChange} />
      </InputContainer>
      <AutoSuggest query={value} data={data} />
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

const enhance = connect(
  ({ search, dictionary }) => ({
    value: search.query,
    data: dictionary.entries,
  }),
  { onChange: search },
);

export default enhance(SearchContainer);
