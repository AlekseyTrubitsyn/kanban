import {
  MOVE_TICKET,
  RESET_TICKETS,
  RECEIVE_TICKETS,
  RECEIVE_TICKETS_ERROR,
  REQUEST_TICKETS,
  SAVE_TICKETS,
  CREATE_NEW_ITEM,
  OPEN_ITEM_CARD,
  CLOSE_ITEM_CARD,
  REQUEST_TICKET_SAVE,
  CHANGE_ASSIGNEE_FILTER
} from '../constants/ActionTypes';

import { axiosWrapper } from '../utilities/axiosWrapper';
import { toastError, toastInfo } from '../utilities/toastify';

export const createNewItem = (userData) => {
  return {
    type: CREATE_NEW_ITEM,
    userData
  }
}

export const openItemCard = (payload) => {
  return {
    type: OPEN_ITEM_CARD,
    payload
  }
}

export const closeItemCard = () => {
  return {
    type: CLOSE_ITEM_CARD
  }
}

export const saveItem = (payload) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TICKET_SAVE
    });

    return axiosWrapper({
              url: '/Ticket',
              method: 'post',
              data: payload
            })
            .then(response => {
              toastInfo('Saved');

              dispatch(getTickets());
            })
            .catch(e => {
              dispatch({
                type: RECEIVE_TICKETS_ERROR,
                payload: e
              });
            });
  }
}

export const moveTicket = (payload) => {
  return {
    type: MOVE_TICKET,
    payload
  }
}

export const setTickets = (payload) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TICKETS
    });

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
    dispatch({
      type: REQUEST_TICKETS
    });

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

export const changeAssigneeFilter = (filter) => {
  return {
    type: CHANGE_ASSIGNEE_FILTER,
    filter
  }
}
