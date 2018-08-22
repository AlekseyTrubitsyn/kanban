import {
  REQUEST_USER_LOGIN,
  RECEIVE_USER_LOGIN_ERROR,
  RECEIVE_USER_DATA,
  RESET_USER_LOGIN
} from '../constants/ActionTypes';

import { axiosWrapper } from '../utilities/axiosWrapper';
import { setCookie } from '../utilities/cookies';

let sessionKey;

export const login = (login, password) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_USER_LOGIN
    });

    const payload = {
      login,
      password
    };

    return axiosWrapper({
              url: '/User',
              method: 'post',
              data: payload
            })
            .then(response => {
              if (response.errorKey) {
                dispatch({
                  type: RECEIVE_USER_LOGIN_ERROR,
                  payload: response.errorText || 'Login error'
                });

                return;
              }

              const { sessionTimeout, userData } = response;
              sessionKey = response.sessionKey;

              setCookie('login_session', sessionKey, {
                expires: sessionTimeout - new Date()
              });

              dispatch({
                type: RECEIVE_USER_DATA,
                payload: userData
              });
            })
            .catch(e => {
              dispatch({
                type: RECEIVE_USER_LOGIN_ERROR,
                payload: e
              });
            });
  }
}

export const logout = () => {
  setCookie('login_session', sessionKey, {
    expires: -1
  });

  return {
    type: RESET_USER_LOGIN
  }
}
