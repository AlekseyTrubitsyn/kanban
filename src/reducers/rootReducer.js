import { combineReducers } from 'redux';
import userSettings from './userSettings';
import tickets from './tickets';
import sideMenu from './sideMenu';

export default combineReducers({
  userSettings,
  tickets,
  sideMenu
});
