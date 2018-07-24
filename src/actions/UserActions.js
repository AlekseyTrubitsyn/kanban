import {
  REGISTER_USER,
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA,
  RESET_USER
} from '../constants/ActionTypes';

export const login = (login, password) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_USER_DATA
    });

    setTimeout(() => {
      dispatch({
        type: RECEIVE_USER_DATA,
        payload: {
          id: 1,
          username: login,
          firstName: 'Lorem',
          secondName: 'Ipsum',
          avatar: './img/users/default.png',
          email: 'admin@example.com'
        }
      });
    }, 300);
  }
}

export const logout = () => {
  return {
    type: RESET_USER
  }
}
