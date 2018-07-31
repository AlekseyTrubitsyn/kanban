import _groupBy from 'lodash/groupBy';
import _isEmpty from 'lodash/isEmpty';

import { loadFromLS, saveToLS } from '../localStorage';

import projects from './defaultData/projects.json';
import users from './defaultData/users.json';
import tickets from './defaultData/tickets.json';

/**
** 'Back in front': server emulation.
**/
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

const _projects = loadFromLS('projects') || projects;
const _users = loadFromLS('users') || users;

const mapTicketsFromJSON = (arr, projectId) => {
  arr.map(item => {
    item.author = _users.filter(subitem => subitem.id === item.authorId)[0] || {};
    item.developer = _users.filter(subitem => subitem.id === item.developerId)[0] || {};
    item.project = _projects.filter(subitem => subitem.id === projectId)[0] || {};

    return item;
  })

  return _groupBy(arr, 'status');
}

const getProjects = () => _projects;
const getUsers = () => _users;
const getDefaultTickets = (projectId) => mapTicketsFromJSON(tickets, 1);

const getTickets = (projectId) => {
  let arr = loadFromLS('tickets') || tickets;

  if (!Array.isArray(arr) || !arr.length) return [];

  return mapTicketsFromJSON(arr, projectId);
};

const setProjects = (data) => !!saveToLS('projects', data);
const setUsers = (data) => !!saveToLS('users', data);
const setTickets = (data) => {
  if (_isEmpty(data)) return !!saveToLS('tickets', []);

  let arr = Object.keys(data).reduce((result, item) => result.concat(data[item]), []);

  return !!saveToLS('tickets', arr);
}
