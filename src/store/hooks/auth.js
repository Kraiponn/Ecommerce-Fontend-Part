import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionTypes from '../actions/action-type';

import ajax from '../../shares/axios-ecomm';


const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => ({
    ...state.auth
  }));


  /**
   * Clear all state in auth store
   */
  const clear = useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_AUTH });
    // console.log('clear render')
  }, [dispatch]);


  /**
   * Send Signup data to API
   */
  const reqSignup = useCallback( user => {
    dispatch({ type: actionTypes.START_AUTH });
    ajax.post('/auth/signup', user)
      .then(resp => {
        console.log(resp.data);
        dispatch({ type: actionTypes.SIGN_UP_SUCCESS });
      })
      .catch(error => {
        const { errors } = error.response.data;
        console.log(errors.msg);
        dispatch({
          type: actionTypes.SIGN_UP_FAIL,
          payload: errors.data
        });
      });      
  }, [dispatch]);


  /**
   * Signin to access
   */
  const reqSignin = useCallback(user => {
    // console.log('reqSignin Renderer...');
    dispatch({ type: actionTypes.START_AUTH });
    ajax.post('/auth/signin', user)
      .then(resp => {
        console.log('After signin success: ', resp.data);

        const { token, refreshToken, user } = resp.data.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch({ 
          type: actionTypes.SIGN_IN_SUCCESS,
          payload: user
        });
      })
      .catch(error => {
        const { errors } = error.response.data;
        dispatch({ 
          type: actionTypes.SIGN_IN_FAIL,
          payload: errors.msg
        });
        console.log(errors);
      });
  }, [dispatch]);


  /**
   * Signout from the system
   */
  const reqSignout = useCallback(() => {
    localStorage.clear();
    dispatch({ type: actionTypes.SIGN_OUT });
  }, [dispatch]);


  /**
   * Check current authentication state
   */
  const reqToken = useCallback(() => {
    try{
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      if(token){
        dispatch({
          type: actionTypes.REQUEST_TOKEN,
          payload: { token, refreshToken }
        });
      }
    }catch(error){
      // dispatch({ type })
      console.log('Request token error ', error);
    }
  }, [dispatch]);

  return {
    reqSignup: reqSignup,
    reqSignin: reqSignin,
    clear: clear,
    reqToken: reqToken,
    reqSignout: reqSignout,
    error: auth.error,
    isLoading: auth.isLoading,
    success: auth.success,
    isAuth: auth.isAuth,
    token: auth.token,
    profile: auth.profile
  }
}

export default useAuth;