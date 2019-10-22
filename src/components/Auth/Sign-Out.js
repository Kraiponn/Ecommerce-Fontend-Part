import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../store/hooks/auth';


const SignOut = () => {
  const { reqSignout } = useAuth();
  reqSignout();
  return (<Redirect to="/signin" />);
}

export default SignOut;