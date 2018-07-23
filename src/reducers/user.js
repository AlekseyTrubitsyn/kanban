import {
  REGISTER_USER,
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA
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

    default:
      return state;
  }
}
