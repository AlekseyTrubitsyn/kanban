import {
  MOVE_TICKET
} from '../constants/ActionTypes';

import moment from 'moment';

class Task {
  constructor() {
    this.id = Task.counter;
    this.title = 'Title',
    this.text = 'Text',
    this.author = {
      userId: 2,
      userName: 'Supertester',
      avatar: 'img/default-woman.png'
    },
    this.developer = {
      userId: 1,
      userName: 'Lorem I',
      avatar: 'img/default-man.png'
    },
    this.projectCode = 'TEST',
    this.deadline = moment(moment()).add(1, 'days'),
    this.creationDate = moment(moment()).subtract(2, 'days')
  }

  static get counter() {
    Task._counter = (Task._counter || 0) + 1;
    return Task._counter;
  }
}

const initialState = {
  isFetching: false,
  isEmpty: false,
  discuss: {
    name: 'Discuss',
    values: [(new Task())]
  },
  toDo: {
    name: 'To do',
    values: [(new Task()), (new Task())]
  },
  inProgress: {
    name: 'In progress',
    values: [(new Task()), (new Task()), (new Task())]
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
