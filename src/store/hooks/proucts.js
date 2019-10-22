import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionTypes from '../actions/action-type';
import ajax from '../../shares/axios-ecomm';


const useProduct = () => {
  const dispatch = useDispatch();
  const { auth, product } = useSelector(({ auth, product }) => ({
    auth,
    product
  }));


  const clearProduct = useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_PRODUCT });
  }, [dispatch]);

  const createdProduct = useCallback((formData, token) => {
    dispatch({ type: actionTypes.START_PROCESSS_PRODUCT });
    ajax.post('product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': 'bearer ' + token
      }
    })
    .then(resp => {
      dispatch({ type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: resp.data });
      // console.log('Created new product successfully.');
    })
    .catch(error => {
      const { errors } = error.response.data;
      console.log('Error ' + errors)
      dispatch({ type: actionTypes.PROCESS_PRODUCT_FAIL, payload: errors.msg });
    });
  }, [dispatch])


  return {
    profile: auth.profile,
    clear: clearProduct,
    createdProduct,
    error: product.error,
    isLoading: product.isLoading,
    success: product.success
  }
}

export default useProduct;