import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  RootState,
} from 'types';
import { logger } from 'utils';
import { selectIsLoggedin } from 'store/auth/authSelector';

interface StateFromProps {
  loggedIn: ReturnType<typeof selectIsLoggedin>;
}
interface DispatchFromProps {}
interface OwnProps {
  children: React.ReactElement;
}
type Props = StateFromProps & DispatchFromProps & OwnProps;

const CheckLoggedInFlow = ({
  children,
  loggedIn,
}: Props) => {
  const [isLoggedIn, updateIsLoggedIn] = React.useState<boolean>(loggedIn);
  React.useEffect(() => {
    logger(`CheckLoggedInFlow isLoggedIn: ${loggedIn}`);
    updateIsLoggedIn(loggedIn);
  }, [loggedIn]);

  if (isLoggedIn) {
    return children;
  }
  else {
    return <Redirect to='/' />
  }
}

function mapStateToProps(state: RootState): StateFromProps {
  return {
    loggedIn: selectIsLoggedin(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckLoggedInFlow)
