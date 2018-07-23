import {
  REGISTER_USER,
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA
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
          username: 'admin',
          firstName: 'Lorem',
          secondName: 'Ipsum',
          avatar: './img/users/default.png',
          email: 'admin@example.com'
        }
      });
    }, 3000);
  }
}
