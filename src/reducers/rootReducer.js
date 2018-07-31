import { combineReducers } from 'redux';
import userSettings from './userSettings';
import tickets from './tickets';

export default combineReducers({
  userSettings,
  tickets
});
