import {
  REQUEST_USER_LOGIN,
  RECEIVE_USER_LOGIN_ERROR,
  RECEIVE_USER_DATA,
  RESET_USER_LOGIN
} from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  userData: null,
  errors: []
}

export default function tickets(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_LOGIN:
      return {
        ...state,
        isFetching: true,
        userData: null,
        errors: null
      }
    case RECEIVE_USER_DATA:
      return  {
        ...state,
        isFetching: false,
        userData: action.payload
      }

    case RESET_USER_LOGIN:
      return {
        ...state,
        isFetching: false,
        userData: null
      }

    case RECEIVE_USER_LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload
      }

    default:
      return state;
  }
}
