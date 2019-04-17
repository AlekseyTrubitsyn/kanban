import _clone from 'lodash/clone';

import {
  MOVE_TICKET,
  CREATE_TICKET,
  SAVE_TICKET,
  OPEN_TICKET_MODAL,
  CLOSE_TICKET_MODAL,
  CLOSE_MODAL_AFTER_SAVE,
  REQUEST_TICKETS,
  RECEIVE_SUCCESS,
  RESET_TICKETS,
  RECEIVE_TICKETS,
  CHANGE_FILTER
} from '../constants/ActionTypes';

const initialState = {
  showCardModal: false,
  isFetching: false,
  filter: 'all',
  filterId: 0,
  filters: ['all', 'free', 'my', 'deadline'],
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
  archive: {
    name: 'Archive',
    values: []
  }
}

class Ticket {
  constructor() {
    this.id = -1;
    this.title = '';
    this.description = '';
    this.reporterId = -1;
    this.assigneeId = null;
    this.projectId = 1;
    this.project = {
      "id": 1,
      "name": "My first project",
      "key": "test",
      "default": true
    };
    this.deadline = null;
    this.creationDate = (new Date()).toISOString();
    this.statusName = 'discuss';
    this.priority = 1;
  }
}

export default function tickets(state = initialState, action) {
  const moveTicket = (state, payload) => {
    const {
      source,
      destination
    } = payload;

    const sourceArray = state[source.name].values.slice();
    const ticket = sourceArray.splice(source.position, 1)[0];

    if (source.name === destination.name) {
      sourceArray.splice(destination.position, 0, ticket);

      return {
        ...state,
        [source.name]: {
          ...state[source.name],
          values: sourceArray
        }
      }
    }

    const destinationValues = state[destination.name].values.slice();
    const clonedTicket = _clone(ticket);

    clonedTicket.statusName = destination.name;
    destinationValues.splice(destination.position, 0, clonedTicket);

    return {
      ...state,
      [source.name]: {
        ...state[source.name],
        values: sourceArray
      },
      [destination.name]: {
        ...state[destination.name],
        values: destinationValues
      }
    }
  }

  const createTicket = (state, reporter) => {
    const newTicket = state.newTicket || new Ticket();
    newTicket.reporterId = reporter.id;
    newTicket.reporter = reporter;

    return ({
      ...state,
      newTicket,
      ticketToModify: newTicket,
      showTicketModal: true
    })
  }

  const saveTicket = (state, ticket) => {
    const {
      previousStatus = '',
      statusName
    } = ticket;

    const move = previousStatus && (statusName !== previousStatus);

    const sourceArray = (move ? state[previousStatus] : state[statusName]).values.slice();
    const sourcePosition = sourceArray.findIndex(item => item.id === ticket.id);
    const sourceKey = move ? previousStatus : statusName;

    let destinationColumnData = {};

    if (move) {
      sourceArray.splice(sourcePosition, 1);

      destinationColumnData = {
        [statusName]: {
          ...state[statusName],
          values: state[statusName].values.slice().concat(ticket)
        }
      }
    } else {
      sourceArray.splice(sourcePosition, 1, ticket);
    }

    return {
      ...state,
      isFetching: false,
      [sourceKey]: {
        ...state[sourceKey],
        values: sourceArray
      },
      ...destinationColumnData,
      newTicket: null,
      ticketToModify: ticket
    };
  };

  switch (action.type) {
    case MOVE_TICKET:
      return moveTicket(state, action.payload);

    case CREATE_TICKET:
      return createTicket(state, action.userData);

    case SAVE_TICKET:
      return saveTicket(state, action.payload);

    case OPEN_TICKET_MODAL:
      return ({
        ...state,
        showTicketModal: true,
        ticketToModify: state[action.columnName].values
          .find(ticket => ticket.id === action.itemId)
      })

    case CLOSE_TICKET_MODAL:
      return ({
        ...state,
        showTicketModal: false,
        ticketToModify: null
      });

    case CLOSE_MODAL_AFTER_SAVE:
      return ({
        ...state,
        newTicket: null,
        showTicketModal: false,
        isFetching: true
      });

    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.filter,
        filterId: action.filterId
      }

    case REQUEST_TICKETS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_SUCCESS:
      return {
        ...state,
        isFetching: false
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
        },
        archive: {
          ...state.archive,
          values: action.payload.archive || []
        }
      }

    default:
      return state;
  }
}
