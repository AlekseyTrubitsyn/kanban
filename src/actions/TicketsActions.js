import {
  MOVE_TICKET,
  RESET_TICKETS,
  RECEIVE_TICKETS,
  RECEIVE_TICKETS_ERROR,
  REQUEST_TICKETS,
  SAVE_TICKETS
} from '../constants/ActionTypes';

import { axiosWrapper } from '../utilities/axiosWrapper';

export const moveTicket = (payload) => {
  return {
    type: MOVE_TICKET,
    payload
  }
}

export const setTickets = (payload) => {
  return (dispatch) => {
    return axiosWrapper({
              url: '/Tickets',
              method: 'post',
              data: payload
            })
            .then(response => {
              dispatch({
                type: SAVE_TICKETS,
                payload: +(new Date())
              })
            })
            .catch(e => {
              dispatch({
                type: RECEIVE_TICKETS_ERROR,
                payload: e
              });
            });
  }
}

export const requestTickets = () => {
  return {
    type: REQUEST_TICKETS
  }
}

export const getTickets = (projectId = 1) => {
  return (dispatch) => {
    dispatch(requestTickets);

    return axiosWrapper({ url: '/Tickets' })
            .then(response => {
              dispatch({
                type: RECEIVE_TICKETS,
                payload: response
              })
            })
            .catch(e => {
              dispatch({
                type: RECEIVE_TICKETS_ERROR,
                payload: e
              });
            });
  }
}

export const resetTickets = () => {
  return (dispatch) => {
    dispatch(requestTickets);

    return axiosWrapper({ url: '/DefaultTickets' })
            .then(response => {
              dispatch({
                type: RESET_TICKETS,
                payload: response
              })
            })
            .catch(e => {
              dispatch({
                type: RECEIVE_TICKETS_ERROR,
                payload: e
              });
            });
    }
}
