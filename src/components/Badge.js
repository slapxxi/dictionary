import { connect } from 'react-redux';
import glamorous from 'glamorous';
import { theme } from '../lib/constants';
import { nonViewedCount } from '../store/dictionary/selectors';

const Badge = glamorous.div(
  {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.badge,
    position: 'absolute',
    borderRadius: '50%',
    verticalAlign: 'middle',
    padding: 2,
    minWidth: 20,
    minHeight: 20,
    fontSize: 12,
    fontFamily: 'Arial, sans-serif',
    bottom: '100%',
    left: '100%',
    marginLeft: -15,
    marginBottom: -15,
    color: theme.text,
  },
  ({ children }) => ({
    display: children === 0 ? 'none' : 'flex',
  }),
);

const enhance = connect((state) => ({
  children: nonViewedCount(state),
}));

export default enhance(Badge);
