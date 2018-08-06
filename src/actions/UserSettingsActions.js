import {
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA,
  RESET_USER
} from '../constants/ActionTypes';

import { getProjects } from './ProjectsActions';
import { getTickets } from './TicketsActions';

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
          userName: 'Lorem',
          firstName: 'Lorem',
          secondName: 'Ipsum',
          gender: 'male',
          avatar: './img/default-man.png',
          email: 'Lorem.Ipsum@example.com'
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
