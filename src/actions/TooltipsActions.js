import {
  SHOW_TOOLTIPS,
  HIDE_TOOLTIPS
} from '../constants/ActionTypes';

export const showTooltips = (tooltips) => {
  return {
    type: SHOW_TOOLTIPS,
    tooltips
  }
}

export const hideTooltips = () => {
  return {
    type: HIDE_TOOLTIPS
  }
}
