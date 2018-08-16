import _groupBy from 'lodash/groupBy';
import _isEmpty from 'lodash/isEmpty';

import { loadFromLS, saveToLS } from '../localStorage';

import projects from './defaultData/projects.json';
import users from './defaultData/users.json';
import tickets from './defaultData/tickets.json';

/**
**
** 'Back in front': server emulation.
**
**/
let nextProjectId = 3;
let nextUserId = 5;
let nextTicketId = 7;

const _projects = loadFromLS('projects') || projects;
const _users = loadFromLS('users') || users;

/**
 * Join user and project data with tickets array
 *
 * @param   {array} arr tickets array
 * @param   {number} projectId id of the project
 *
 * @returns {array} array of tickets with actual information about project and users
 */
const mapTicketsFromJSON = (arr, projectId) => {
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
const getProjects = () => _projects;

/**
 * Users getter
 *
 * @returns {array} array of users
 */
const getUsers = () => _users;

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
 * @returns {array} array of tickets
 */
const getTickets = (projectId) => {
  let arr = loadFromLS('tickets') || tickets;

  if (!Array.isArray(arr) || !arr.length) return [];

  return mapTicketsFromJSON(arr, projectId);
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
 * and report a result
 *
 * @param   {array} data to save
 *
 * @returns {boolean} true if succeed
 */
const setUsers = (data) => !!saveToLS('users', data);

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
 * Main setter
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

    case 'Users':
      return setUsers(data || []);

    case 'Tickets':
      return setTickets(data || []);

    default:
      return null;
  }
}
