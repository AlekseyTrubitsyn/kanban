import {
  SHOW_TOOLTIP,
  HIDE_TOOLTIP
} from '../constants/ActionTypes';

export const showTooltip = ({ elem, message }) => {
  return {
    type: SHOW_TOOLTIP,
    elem,
    message
  }
}

export const hideTooltip = () => {
  return {
    type: HIDE_TOOLTIP
  }
}
