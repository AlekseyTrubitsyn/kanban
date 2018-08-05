import {
  SHOW_SIDE_MENU,
  HIDE_SIDE_MENU
} from '../constants/ActionTypes';

export const showSideMenu = () => {
  return {
    type: SHOW_SIDE_MENU
  }
}

export const hideSideMenu = () => {
  return {
    type: HIDE_SIDE_MENU
  }
}
