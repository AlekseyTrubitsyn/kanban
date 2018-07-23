import { combineReducers } from 'redux';
import user from './user';
import tickets from './tickets';

export default combineReducers({
  user,
  tickets
});
