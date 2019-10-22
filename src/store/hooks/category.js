import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionTypes from '../actions/action-type';
import ajax from '../../shares/axios-ecomm';


const useCategory = () => {
  const dispatch = useDispatch();
  const { auth, category } = useSelector(({auth, category}) => {
    return {
      auth,
      category
    }
  });

  // console.log('auth nanan ', auth)
  // console.log('Category nanan ', category)

  /**
   * Clear all state in category
   */
  const clearCategory = useCallback(() => {
    dispatch({
      type: actionTypes.CLEAR_CATEGORY
    });
  }, [dispatch]);


  /**
   * Created new category
   */
  const addCategory = useCallback((name, token) => {
    dispatch({ type: actionTypes.START_PROCESSS_CATEGORY });
    ajax.post('/category', name,
      {
        headers: {
          'x-auth-token': 'Bearer ' + token,
        }
      })
      .then(resp => {
        const { msg, data } = resp.data;
        console.log(data, msg);

        dispatch({
          type: actionTypes.CREATE_CATEGORY_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        const { errors } = error.response.data;
        console.log(errors);
        dispatch({ 
          type: actionTypes.PROCESS_CATEGORY_FAIL,
          payload: errors.msg
        });
      });
  }, [dispatch]);


  /**
   * Fetch all categories
   */
  const fetchAllCategory = useCallback(() => {
    dispatch({ type: actionTypes.START_PROCESSS_CATEGORY });
    ajax.get('/category')
      .then(resp => {
        const { data } = resp.data;
        // console.log('category result ', data);

        dispatch({
          type: actionTypes.FETCH_CATEGORY_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        const { errors } = error.response.data;
        console.log(errors);
        dispatch({ 
          type: actionTypes.PROCESS_CATEGORY_FAIL,
          payload: errors.msg
        });
      });
  }, [dispatch]);

  return {
    profile: auth.profile,
    addCategory,
    fetchAllCategory,
    clearCategory,
    error: category.error,
    isLoading: category.isLoading,
    success: category.success,
    data: category.data
  } 

}

export default useCategory;