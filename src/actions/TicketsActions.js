import {
  MOVE_TICKET,
  CREATE_TICKET,
  SAVE_TICKET,
  OPEN_TICKET_MODAL,
  CLOSE_TICKET_MODAL,
  REQUEST_TICKETS,
  RECEIVE_TICKETS_ERROR,
  RESET_TICKETS,
  RECEIVE_TICKETS,
  CHANGE_FILTER
} from '../constants/ActionTypes';

import { axiosWrapper } from '../utilities/axiosWrapper';
import { toastError, toastInfo } from '../utilities/toastify';

export const createNewTicket = (userData) => {
  return {
    type: CREATE_TICKET,
    userData
  }
}

export const openTicketModal = ({ itemId, columnName }) => {
  return {
    type: OPEN_TICKET_MODAL,
    itemId,
    columnName
  }
}

export const closeTicketModal = () => {
  return {
    type: CLOSE_TICKET_MODAL
  }
}

export const saveTicket = payload => {
  return (dispatch) => {
    return axiosWrapper({
      url: '/Ticket',
      method: 'post',
      data: payload
    })
      .then(() => {
        toastInfo('Saved');
      })
      .catch(e => {
        toastError(e);
      })
      .finally(() => {
        dispatch({
          type: SAVE_TICKET,
          payload
        });
      })
  }
}

export const saveTicketAndCloseModal = payload => {
  return (dispatch) => {
    return axiosWrapper({
      url: '/Ticket',
      method: 'post',
      data: payload
    })
      .then(() => {
        toastInfo('Saved');

        dispatch({
          type: CLOSE_TICKET_MODAL
        });

        getTickets()(dispatch);
      })
      .catch(e => {
        toastError(e.message);

        dispatch({
          type: SAVE_TICKET,
          payload
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

export const saveTickets = (payload) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TICKETS
    });

    return axiosWrapper({
              url: '/Tickets',
              method: 'post',
              data: payload
            })
            .then(() => {
              toastInfo('Saved');
            })
            .catch(e => {
              dispatch({
                type: RECEIVE_TICKETS_ERROR,
                payload: e
              });

              toastError(e);
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

              toastError(e);
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

              toastError(e);
            });
    }
}

export const changeFilter = ({ filter, filterId }) => {
  return {
    type: CHANGE_FILTER,
    filter,
    filterId
  }
}
