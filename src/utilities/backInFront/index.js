import { getDefaultUsers } from './Users';
import { getDefaultTickets } from './Tickets';

/**
** 'Back in front': get/create and combine data.
**/
const project = {
  id: 1,
  name: 'My first project'
};

export const saveTickets = (tickets) => {
  localStorage.setItem('tickets', JSON.stringify(tickets));
}

export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
}

export const getUsers = () => {
  const u = localStorage.getItem('users');

  if (u) return JSON.parse(u);

  const defaultUsers = getDefaultUsers();
  saveUsers(defaultUsers);

  return defaultUsers;
}

export const getTickets = () => {
  const t = localStorage.getItem('tickets');

  if (t) return JSON.parse(t);

  const defaultTickets = getDefaultTickets(project);
  saveTickets(defaultTickets);

  return defaultTickets;
}
