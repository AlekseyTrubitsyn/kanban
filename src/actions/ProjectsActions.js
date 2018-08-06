import {
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  RECEIVE_PROJECTS_ERROR
} from '../constants/ActionTypes';

import { axiosWrapper } from '../utilities/axiosWrapper';

export const requestProjects = () => {
  return {
    type: REQUEST_PROJECTS
  }
}

export const getProjects = () => {
  return (dispatch) => {
    dispatch(requestProjects);

    return axiosWrapper({ url: '/Projects' })
            .then(response => {
              dispatch({
                type: RECEIVE_PROJECTS,
                payload: response
              })
            })
            .catch(e => {
              dispatch({
                type: RECEIVE_PROJECTS_ERROR,
                payload: e
              });
            });
  }
}
