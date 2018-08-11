import { combineReducers } from 'redux';
import userSettings from './userSettings';
import tickets from './tickets';
import sideMenu from './sideMenu';
import projects from './projects';
import tooltip from './tooltip';

export default combineReducers({
  userSettings,
  tickets,
  sideMenu,
  projects,
  tooltip
});
