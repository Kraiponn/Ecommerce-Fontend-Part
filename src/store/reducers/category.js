import * as actionTypes from '../actions/action-type';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  success: false,
  data: []
};


const categoryReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case actionTypes.START_PROCESSS_CATEGORY:
      return {
        ...state,
        error: null,
        success: false,
        data: [],
        isLoading: true
      }
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true
      }
    case actionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        data: action.payload
      }
    case actionTypes.PROCESS_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case actionTypes.CLEAR_CATEGORY:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default categoryReducer;