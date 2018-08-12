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
  UPDATE_DEADLINE,
  UPDATE_STATUS,
  UPDATE_PRIORITY,
  UPDATE_TODO_LIST,
  UPDATE_COMMENTS
} from '../constants/ActionTypes';

import { axiosWrapper } from '../utilities/axiosWrapper';

export const updateDeadline = (payload) => {
  return {
    type: UPDATE_DEADLINE,
    payload
  }
}

export const updateStatus = (payload) => {
  return {
    type: UPDATE_STATUS,
    payload
  }
}

export const updatePriority = (payload) => {
  return {
    type: UPDATE_PRIORITY,
    payload
  }
}

export const updateTodoList = (payload) => {
  return {
    type: UPDATE_TODO_LIST,
    payload
  }
}

export const updateComments = (payload) => {
  return {
    type: UPDATE_COMMENTS,
    payload
  }
}

export const createNewItem = () => {
  return {
    type: CREATE_NEW_ITEM
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
