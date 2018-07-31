import {
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA,
  RESET_USER
} from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  userData: null
}

export default function tickets(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_DATA:
      return {
        ...state,
        isFetching: true,
        userData: null
      }
    case RECEIVE_USER_DATA:
      return  {
        ...state,
        isFetching: false,
        userData: action.payload
      }
    case RESET_USER:
      return {
        ...state,
        isFetching: false,
        userData: null
      }
    default:
      return state;
  }
}
