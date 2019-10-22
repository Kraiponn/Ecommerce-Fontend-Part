import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import useAuth from '../../store/hooks/auth';


const isActive = (history, path) => {
  if(history.location.pathname === path){
    return {color: "#ff9900"};
  }else{
    return {color: "#ffffff"};
  }
};


const Menu = ({ history }) => {
  const { isAuth, profile } = useAuth();

  return(
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link 
          className="nav-link" 
          style={isActive(history, '/')}
          to="/">
          Home
        </Link>
      </li>

      {isAuth && profile.role === 0 && (
        <li className="nav-item">
          <Link 
            className="nav-link" 
            style={isActive(history, '/user/dashboard')}
            to="/user/dashboard">
            Dashboard
          </Link>
        </li> 
      )}

      {isAuth && profile.role === 1 && (
        <li className="nav-item">
          <Link 
            className="nav-link" 
            style={isActive(history, '/admin/dashboard')}
            to="/admin/dashboard">
            Dashboard
          </Link>
        </li> 
      )}

      {!isAuth && (
        <React.Fragment>
          <li className="nav-item">
            <Link 
              className="nav-link" 
              style={isActive(history, '/signup')}
              to="/signup">
              SignUp
            </Link>
          </li>

          <li className="nav-item">
            <Link 
              className="nav-link" 
              style={isActive(history, '/signin')}
              to="/signin">
              SignIn
            </Link>
          </li>
        </React.Fragment>
      )}

      {isAuth && (
        <li className="nav-item">
          <Link 
            className="nav-link" 
            style={isActive(history, '/signout')}
            to="/signout">
            SignOut
          </Link>
        </li>
      )}
    </ul>
  );
};

export default withRouter(Menu);