import * as actionTypes from '../actions/action-type';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  success: false,
  data: []
};


const productReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case actionTypes.START_PROCESSS_PRODUCT:
      return {
        ...state,
        error: null,
        success: false,
        data: [],
        isLoading: true
      }
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true
      }
    case actionTypes.PROCESS_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case actionTypes.CLEAR_PRODUCT:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default productReducer;