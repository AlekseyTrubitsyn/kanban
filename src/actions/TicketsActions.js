import {
  MOVE_TICKET
} from '../constants/ActionTypes';

export const moveTicket = (payLoad) => {
  return {
    type: MOVE_TICKET,
    payLoad
  }
}
