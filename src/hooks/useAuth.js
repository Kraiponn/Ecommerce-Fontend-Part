import { useCallback, useReducer } from 'react';

import axios from 'axios';
import api from '../shares/api-config';


const initState = {
  error: null,
  loading: false,
  success: false,
  data: null,
  isAuthenticated: null
};

const authReducer = (state, action) => {
  switch(action.type){
    case 'START_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      }
    case 'SIGNIN_SUCCESS':
        // console.log('after sigin ', action.token, action.user)
        return {
          ...state,
          loading: false,
          success: true,
          isAuthenticated: action.token,
          data: {
            msg: action.msg,
            user: action.user
          }
        }
    case 'SIGNUP_SUCCESS':
        return {
          ...state,
          error: null,
          loading: false,
          success: true,
          data: {
            msg: action.payload.msg,
            user: action.payload.data
          }
        }
    case 'SIGNOUT':
      return {
        ...state,
        ...initState
      }
    case 'REQUEST_FAIL':
        return {
          ...state,
          error: action.error.msg,
          loading: false,
          success: false
        }
    case 'REQUEST_TOKEN':
      return {
        ...state, 
        isAuthenticated: action.token
      }
    case 'CLEAR_REQUEST':
      return initState;
    default: 
      return state;
  }
}


const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initState);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR_REQUEST' });
  }, []);

  const requestToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if(token){
      dispatch({ type: 'REQUEST_TOKEN', token: token });
    }else{
      dispatch({ type: 'REQUEST_TOKEN', token: null });
    }
  }, []);

  const requestSignup = useCallback(user => {
    dispatch({ type: 'START_REQUEST' });
    axios.post(api + '/auth/signup', user)
      .then(resp => {
        dispatch({ type: 'SIGNUP_SUCCESS', payload: resp.data });
        console.log(resp);
      })
      .catch(err => {
        const { errors } = err.response.data;

        dispatch({ type: 'REQUEST_FAIL', error: errors.data });
        console.log(errors.data);
      });
  }, []);


  const requestSignin = useCallback(user => {
    dispatch({ type: 'START_REQUEST' });
    axios.post(api + '/auth/signin', user)
      .then(resp => {
        const { data: {token, refreshToken, msg, user} } = resp.data;
        console.log('Signin success ', resp.data);

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ 
          type: 'SIGNIN_SUCCESS', 
          user: user, 
          msg: msg, 
          token: token 
        });
      })
      .catch(err => {
        const { errors } = err.response.data;

        dispatch({ type: 'REQUEST_FAIL', error: errors });
        console.log('Some thing went wrong.', errors);
      });
  }, []);


  const requestSignout = useCallback(() => {
    localStorage.clear();
    dispatch({ type: 'SIGNOUT' });
  }, []);


  return {
    error: state.error,
    loading: state.loading,
    success: state.success,
    data: state.data,
    requestSignin: requestSignin,
    requestSignup: requestSignup,
    requestSignout: requestSignout,
    requestToken: requestToken,
    isAuth: state.isAuthenticated,
    clear: clear
  }
}

export default useAuth;