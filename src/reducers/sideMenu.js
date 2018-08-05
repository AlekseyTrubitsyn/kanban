import {
  SHOW_SIDE_MENU,
  HIDE_SIDE_MENU
} from '../constants/ActionTypes';

const initialState = {
  show: false
}

export default function sideMenu(state = initialState, action) {
  switch (action.type) {
    case SHOW_SIDE_MENU:
      return {...state, show: true};

    case HIDE_SIDE_MENU:
      return {...state, show: false};

    default:
      return state;
  }
}
