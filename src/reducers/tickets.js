import {
  MOVE_TICKET
} from '../constants/ActionTypes';

import moment from 'moment';
import { getDefaultTasks } from '../utilities/BIF';

const tasks = getDefaultTasks();

const initialState = {
  isFetching: false,
  isEmpty: false,
  discuss: {
    name: 'Discuss',
    values: tasks.discuss
  },
  toDo: {
    name: 'To do',
    values: tasks.toDo
  },
  inProgress: {
    name: 'In progress',
    values: tasks.inProgress
  },
  testing: {
    name: 'Testing',
    values: tasks.testing
  },
  done: {
    name: 'Done',
    values: tasks.done
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
