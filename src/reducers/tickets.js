import { MOVE_TICKET } from '../constants/ActionTypes';

import moment from 'moment';
import { getTickets } from '../utilities/backInFront/index';

const ticketsData = getTickets();

const initialState = {
  isFetching: false,
  isEmpty: false,
  discuss: {
    name: 'Discuss',
    values: ticketsData.discuss || []
  },
  toDo: {
    name: 'To do',
    values: ticketsData.toDo || []
  },
  inProgress: {
    name: 'In progress',
    values: ticketsData.inProgress || []
  },
  testing: {
    name: 'Testing',
    values: ticketsData.testing || []
  },
  done: {
    name: 'Done',
    values: ticketsData.done || []
  },
}

export default function tickets(state = initialState, action) {
  switch (action.type) {
    case MOVE_TICKET:
      const { source, destination, draggableId } = action.payLoad;

      let srcValues = [...state[source.name].values];
      const item = srcValues.splice(source.position, 1)[0];

      if (source.name === destination.name) {
        srcValues.splice(destination.position, 0, item);

        return {
          ...state,
          [source.name]: {
            ...state[source.name],
            values: srcValues
          }
        }
      }

      let destValues = [...state[destination.name].values];
      destValues.splice(destination.position, 0, item);

      return {
        ...state,
        [source.name]: {
          ...state[source.name],
          values: srcValues
        },
        [destination.name]: {
          ...state[destination.name],
          values: destValues
        }
      }
    default:
      return state;
  }
}
