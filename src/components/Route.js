// @flow
import { connect } from 'react-redux';

type Props = { to: string, location: Object, children: any };

function Route({ to, location, children }: Props) {
  if (location.pathname === to || location.type === to) {
    return children;
  }
  return null;
}

const enhance = connect(({ location }) => ({ location }));

export default enhance(Route);
