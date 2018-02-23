// @flow
import { connect } from 'react-redux';
import { Search } from '../components';
import { search } from '../store/actions';

const enhance = connect(
  ({ search }) => ({
    value: search.query,
  }),
  { onChange: search },
);

export default enhance(Search);
