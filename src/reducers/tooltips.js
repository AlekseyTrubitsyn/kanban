import {
  SHOW_TOOLTIPS,
  HIDE_TOOLTIPS
} from '../constants/ActionTypes';

const initialState = {
  tooltips: null,
  tooltipsCount: 0
}

export default function tooltips(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOOLTIPS:
      const { tooltips } = action;

      return {
        tooltips,
        count: tooltips.length
      };

    case HIDE_TOOLTIPS:
      return {
        tooltips: null,
        count: 0
      }

    default:
      return state;
  }
}
