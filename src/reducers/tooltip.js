import {
  SHOW_TOOLTIP,
  HIDE_TOOLTIP
} from '../constants/ActionTypes';

const initialState = {
  showMessage: false,
  message: '',
  elem: null
}

export default function tooltip (state = initialState, action) {
  switch (action.type) {
    case SHOW_TOOLTIP:
      const { message, elem } = action;

      return {
        showMessage: true,
        message,
        elem
      };

    case HIDE_TOOLTIP:
      return {
        showMessage: false,
        message: '',
        elem: null
      }

    default:
      return state;
  }
}
