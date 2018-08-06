import _isEmpty from 'lodash/isEmpty';

import {
  MOVE_TICKET,
  RESET_TICKETS,
  REQUEST_TICKETS,
  RECEIVE_TICKETS,
  SAVE_TICKETS,
  CREATE_NEW_ITEM,
  OPEN_ITEM_CARD,
  CLOSE_ITEM_CARD
} from '../constants/ActionTypes';

const initialState = {
  showCardModal: false,
  isFetching: false,
  nextId: 1,
  discuss: {
    name: 'Discuss',
    values: []
  },
  toDo: {
    name: 'To do',
    values: []
  },
  inProgress: {
    name: 'In progress',
    values: []
  },
  testing: {
    name: 'Testing',
    values: []
  },
  done: {
    name: 'Done',
    values: []
  },
}

export default function tickets(state = initialState, action) {
  switch (action.type) {
    case OPEN_ITEM_CARD:
      const {itemId, columnName} = action.payload;
      const values = state[columnName] && state[columnName].values;
      const itemToModity = values
                          && !_isEmpty(values)
                          && values.filter(o => o.id === itemId)[0];

      return { ...state, showCardModal: true, itemToModity }

    case CREATE_NEW_ITEM:
      return {...state, showCardModal: true, itemToModity: undefined }

    case CLOSE_ITEM_CARD:
      return {...state, showCardModal: false, itemToModity: undefined }

    case MOVE_TICKET:
      const { source, destination } = action.payload;

      let srcValues = [...state[source.name].values];
      const item = srcValues.splice(source.position, 1)[0];
      item.status = destination.name;

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

    case REQUEST_TICKETS:
      return {
        ...state,
        isFetching: true
      }

    case SAVE_TICKETS:
      return {
        ...state,
        saveAt: action.payload
      }

    case RESET_TICKETS:
    case RECEIVE_TICKETS:
      return {
        ...state,
        isFetching: false,
        discuss: {
          ...state.discuss,
          values: action.payload.discuss || []
        },
        toDo: {
          ...state.toDo,
          values: action.payload.toDo || []
        },
        inProgress: {
          ...state.inProgress,
          values: action.payload.inProgress || []
        },
        testing: {
          ...state.testing,
          values: action.payload.testing || []
        },
        done: {
          ...state.done,
          values: action.payload.done || []
        }
      }
    default:
      return state;
  }
}
