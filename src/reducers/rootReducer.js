import { combineReducers } from 'redux';
import userSettings from './userSettings';
import tickets from './tickets';
import sideMenu from './sideMenu';
import projects from './projects';

export default combineReducers({
  userSettings,
  tickets,
  sideMenu,
  projects
});
