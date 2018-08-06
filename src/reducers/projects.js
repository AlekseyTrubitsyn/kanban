import {
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  RECEIVE_PROJECTS_ERROR
} from '../constants/ActionTypes';

const initialState = {
  currentProjectId: 1,
  currentProject: {},
  isFetching: false,
  projects: []
}

export default function projects(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROJECTS:
      return {...state, isFetching: true, projects: []}

    case RECEIVE_PROJECTS:
      return {
        ...state,
        isFetching: false,
        projects: action.payload,
        currentProject: action.payload.filter(o => o.id === state.currentProjectId)[0]
      }

    default:
      return state;
  }
}
