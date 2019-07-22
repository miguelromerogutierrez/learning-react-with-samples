import React from 'react'

import withAuthProvider from '../auth-user/auth-hoc';

function ButtonLogout(props) {
  if (props.user === null) return null;
  return (<button {...props} onClick={props.logout}>Logout</button>);
}

export default withAuthProvider(ButtonLogout);
