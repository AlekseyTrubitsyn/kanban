import _groupBy from 'lodash/groupBy';
import _isEmpty from 'lodash/isEmpty';

import { loadFromLS, saveToLS } from '../localStorage';

import projects from './defaultData/projects.json';
import users from './defaultData/users.json';
import usersData from './defaultData/usersData.json';
import tickets from './defaultData/tickets.json';

/**
**
** 'Back in front': server emulation.
**
**/

/**
 * Join user and project data with tickets array
 *
 * @param   {array} arr tickets array
 * @param   {number} projectId id of the project
 *
 * @returns {array} array of tickets with actual information about project and users
 */
const mapTicketsFromJSON = (arr, projectId) => {
  const _users = getUsers();
  const _projects = getProjects();

  let resultArr = arr.map(item => {
    item.reporter = _users.filter(subitem => subitem.id === item.reporterId)[0] || {};
    item.assignee = _users.filter(subitem => subitem.id === item.assigneeId)[0] || {};

    item.project = _projects.filter(subitem => subitem.id === projectId)[0] || {};

    return item;
  })

  return _groupBy(resultArr, 'statusName');
}

/**
 * Projects getter
 *
 * @returns {array} array of projects
 */
const getProjects = () => loadFromLS('projects') || projects;

/**
 * Users getter
 *
 * @returns {array} array of users
 */
const getUsers = () => loadFromLS('users') || users;

/**
 * Users data getter
 *
 * @returns {array} array of users
 */
const getUsersData = () => loadFromLS('usersData') || usersData;

/**
 * Default tickets getter (reset board)
 *
 * @returns {array} array of tickets by default
 */
const getDefaultTickets = (projectId) => mapTicketsFromJSON(tickets, 1);

/**
** --- Getters ---
**/

/**
 * Tickets getter: load from the localStorage
 * or return array of tickets by default
 *
 * @returns {object} tickets array groupped by status key
 */
const getTickets = (projectId) => {
  let arr = loadFromLS('tickets') || tickets;

  if (!Array.isArray(arr) || !arr.length) return [];

  return mapTicketsFromJSON(arr, projectId);
};

/**
 * Tickets getter: load from the localStorage
 * or return array of tickets by default
 *
 * @returns {array} array of tickets
 */
const getTicketsArray = (projectId) => {
  let arr = loadFromLS('tickets') || tickets;

  if (!Array.isArray(arr) || !arr.length) return [];

  return arr;
};

/**
** --- Setters ---
**/

/**
 * Projects setter: save data to the localStorage
 * and report a result
 *
 * @param   {array} data to save
 *
 * @returns {boolean} true if succeed
 */
const setProjects = (data) => !!saveToLS('projects', data);

/**
 * Users setter: save data to the localStorage
 * and report result
 *
 * @param   {array} data to save
 *
 * @returns {boolean} true if succeed
 */
const setUsers = (data) => !!saveToLS('users', data);

/**
 * Users data setter: save login & password to
 * the localStorage and report result
 *
 * @param   {array} data to save
 *
 * @returns {boolean} true if succeed
 */
const setUsersData = (data) => !!saveToLS('usersData', data);

/**
 * Tickets setter: save data to the localStorage
 * and report a result
 *
 * @param   {array} data to save
 *
 * @returns {boolean} true if succeed
 */
const setTickets = (data) => {
  if (_isEmpty(data)) return !!saveToLS('tickets', []);

  let arr = Object.keys(data).reduce((result, item) => result.concat(data[item]), []);

  return !!saveToLS('tickets', arr);
}

/**
 * Save changes of the ticket or create
 * a new one, update/put into storage and report result
 *
 * @param   {object} item to save
 *
 * @returns {boolean} true if succeed
 */
const setTicket = (data) => {
  if (_isEmpty(data)) return false;

  let tickets = getTicketsArray(1);
  let newItem = {...data.item};
  newItem.creationDate = new Date().toISOString();

  if (newItem.id === -1) {
    newItem.id = tickets.reduce((result, item) => result > item.id ? result : item.id, 0) + 1;

    return setTickets([...tickets, newItem]);
  }

  return setTickets(tickets.map(item => item.id === newItem.id ? newItem : item ));
}

/**
 * Creates an object of new session data and user settings
 *
 * @param   {number} userId to get user data
 * @param   {userData} object default user data
 *
 * @returns {object} that contains session key and user settings
 */
const getUserSessionData = (userId, userData) => {
  const _users = getUsers();

  return {
    sessionKey: '_' + Math.random().toString(36).substr(2, 9),
    sessionTimeout: +(new Date()) + 2 * 3600 * 1000,
    userData: userData || _users.find(item => item.id === userId)
  }
}

/**
 * User login
 *
 * @param   {object} data to check
 *
 * @returns {object} that contains session key and user settings
 *                   if data is correct, or error message if is not
 */
const loginUser = ({login, password}) => {
  const _usersData = getUsersData();

  const user = _usersData.find(item => item.username === login && item.password === password);
  const u = _isEmpty(user) ? -1 : user.id;

  if (u !== -1) {
    return getUserSessionData(u);
  } else {
    return {
      errorKey: 1,
      errorText: 'Wrong login or password'
    }
  }
}

/**
 * User creation
 *
 * @param   {string} username
 * @param   {string} password
 *
 * @returns {number} id of the new user or -1 in case of error
 */
const createNewUser = (username, password) => {
  const _users = getUsers();
  const _usersData = getUsersData();

  const id = _users.reduce((max, item) => max > item.id ? max : item.id, -1) + 1;

  let newUser = {
    "id": id,
    "username": username,
    "firstName": "",
    "secondName": "",
    "gender": "",
    "avatar": "",
    "email": "",
    "role": "user"
  };

  let setUsersDone = setUsers([..._users, newUser]);
  let setUsersDataDone = setUsersData([..._usersData, { id, username, password }]);

  if (setUsersDone && setUsersDataDone) {
    return id;
  } else {
    return -1;
  };
}

/**
 * User registration
 *
 * @param   {object} data of the new user
 *
 * @returns {object} that contains session key and user settings
 *                   if user has successfully created, or message
 *                   if an error has occurred or user name is reserved
 */
const registerUser = ({login, password}) => {
  const _usersData = getUsersData();

  const user = _usersData.find(item => item.username === login);
  const u = _isEmpty(user) ? -1 : user.id;

  if (u !== -1) {
    if (u.password === password) {
      return getUserSessionData(u);
    } else {
      return {
        errorKey: 1,
        errorText: `Username '${login}' is already exist`
      }
    }
  } else {
    const newUserId = createNewUser(login, password);

    if (newUserId !== -1) {
      return getUserSessionData(newUserId);

    } else {
      return {
        errorKey: 1,
        errorText: 'Something goes wrong. Please try again later.'
      }
    }
  }
}

/**
** --- export ---
**/

/**
 * Main getter
 *
 * @param   {string} url of the fake API that contains model name
 *
 * @returns {array} array of objects
 */
export const _get = (url) => {
  const model = (url.match(/^(\/)([^/?]*)/) || [])[2];

  switch (model) {
    case 'Projects':
      return getProjects();

    case 'Users':
      return getUsers();

    case 'DefaultTickets':
      return getDefaultTickets();

    case 'Tickets':
      const params = (url.match(/^\?.*=(\d)/) || []);
      const projectId = params[1] || 1;

      return getTickets(projectId);

    default:
      return null;
  }
}

/**
 * Post actions
 *
 * @param   {string} url of the fake API that contains model name
 * @param   {array} data array of objects to save
 *
 * @returns {array} array of objects
 */
export const _post = (url, data) => {
  const model = (url.match(/^(\/)([^/?]*)/) || [])[2];

  switch (model) {
    case 'Projects':
      return setProjects(data || []);

    case 'CreateUser':
      return registerUser(data)

    case 'User':
      return loginUser(data || {});

    case 'Users':
      return setUsers(data || []);

    case 'Tickets':
      return setTickets(data || []);

    case 'Ticket':
      return setTicket(data || {});

    default:
      return null;
  }
}
