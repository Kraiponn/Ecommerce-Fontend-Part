import * as actionTypes from '../../store/actions/action-type';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  success: false,
  isAuth: false,
  token: {},
  profile: {}
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.START_AUTH:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        isLoading: false,
        isAuth: false,
        token: {},
        profile: {}
      }
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
        isAuth: true,
        token: {},
        profile: action.payload
      }
    case actionTypes.REQUEST_TOKEN:
      return {
        ...state,
        token: {
          token: action.payload.token,
          refreshToken: action.payload.refreshToken
        }
      }
    case actionTypes.SIGN_UP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
        isAuth: false,
        token: {},
        profile: {}
      }
    case actionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
        isAuth: false,
        token: {},
        profile: {}
      }
    case actionTypes.SIGN_OUT:
      return INITIAL_STATE;
    case actionTypes.CLEAR_AUTH:
      return INITIAL_STATE;
    default: 
      return state;
  }
}

export default authReducer;