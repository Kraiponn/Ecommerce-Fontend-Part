import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import useAuth from '../../../store/hooks/auth';


const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuth, profile } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuth && profile.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;