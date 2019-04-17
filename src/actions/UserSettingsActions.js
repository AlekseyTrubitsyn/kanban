import {
  REQUEST_USER_LOGIN,
  RECEIVE_USER_LOGIN_ERROR,
  RECEIVE_USER_DATA,
  RESET_USER_LOGIN,
  REQUEST_USER_REGISTRATION,
  RECEIVE_USER_REGISTRATION_ERROR
} from '../constants/ActionTypes';

import { toastError, toastInfo } from '../utilities/toastify';
import { axiosWrapper } from '../utilities/axiosWrapper';
import { setCookie } from '../utilities/cookies';

import { getProjects } from './ProjectsActions';
import { getTickets } from './TicketsActions';

let sessionKey;

export const register = (login, password) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_USER_REGISTRATION
    });

    const payload = {
      login,
      password
    };

    return axiosWrapper({
              url: '/CreateUser',
              method: 'post',
              data: payload
            })
            .then(response => {
              if (response.errorKey) {
                const message = response.errorText || 'Register error';

                dispatch({
                  type: RECEIVE_USER_REGISTRATION_ERROR,
                  payload: message
                });

                toastError(message);

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
              const message = e || 'Register error';

              dispatch({
                type: RECEIVE_USER_REGISTRATION_ERROR,
                payload: message
              });

              toastError(message);
            });
  }
}

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
                const message = response.errorText || 'Login error';

                dispatch({
                  type: RECEIVE_USER_LOGIN_ERROR,
                  payload: message
                });

                toastError(message);

                return;
              }

              const { sessionTimeout, userData } = response;
              sessionKey = response.sessionKey;

              setCookie('login_session', sessionKey, {
                expires: sessionTimeout - new Date()
              });

              getProjects()(dispatch);
              getTickets()(dispatch);

              dispatch({
                type: RECEIVE_USER_DATA,
                payload: userData
              });
            })
            .catch(e => {
              const message = e || 'Login error';

              dispatch({
                type: RECEIVE_USER_LOGIN_ERROR,
                payload: e
              });

              toastError(message);
            });
  }
}

export const logout = () => {
  setCookie('login_session', sessionKey, {
    expires: -1
  });

  toastInfo('Logout succeed');

  return {
    type: RESET_USER_LOGIN
  }
}
