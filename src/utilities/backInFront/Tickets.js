import moment from 'moment';
import _groupBy from 'lodash/groupBy';

import { getUsers } from './index.js';
const statuses = ['discuss', 'toDo', 'inProgress', 'testing', 'done'];

class Ticket {
  constructor(props) {
    const {
      title,
      text,
      author,
      developer,
      project,
      statusIndex,
      priority,
      deadline,
      creationDate
    } = props;

    const projectName = project.name || 'Untitled';

    const id = Ticket.counter;

    this.id = id;
    this.name = projectName + ' #' + id;
    this.title = title;
    this.text = text;
    this.author = author;
    this.developer = developer;
    this.projectName = projectName;
    this.deadline = deadline;
    this.creationDate = creationDate;
    this.status = statuses[statusIndex];
    this.priority = priority;
  }

  static get counter() {
    Ticket._counter = (Ticket._counter || 0) + 1;
    return Ticket._counter;
  }
}

export const getDefaultTickets = (project) => {
  const users = getUsers();
  const deadline = moment(moment()).add(1, 'days').toDate();
  const creationDate = moment(moment()).subtract(2, 'days').toDate();

  const arr = [{
    title: 'Example 1',
    text: 'I watched the storm, so beautiful yet terrific.',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    deadline,
    creationDate,
    statusIndex: 0
  }, {
    title: 'Example 2',
    text: 'A red flare silhouetted the jagged edge of a wing',
    authorId: 3,
    developerId: 1,
    projectId: 1,
    deadline,
    creationDate,
    statusIndex: 0
  }, {
    title: 'Example 3',
    text: 'Almost before we knew it, we had left the ground.',
    authorId: 4,
    developerId: 1,
    projectId: 1,
    deadline,
    creationDate,
    statusIndex: 1
  }, {
    title: 'Example 4',
    text: 'A shining crescent far beneath the flying vessel.',
    authorId: 3,
    developerId: 2,
    projectId: 1,
    deadline,
    creationDate,
    statusIndex: 2
  }, {
    title: 'Example 5',
    text: 'Mist enveloped the ship three hours out from port.',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    deadline,
    creationDate,
    statusIndex: 2
  }, {
    title: 'Example 6',
    text: 'She stared through the window at the stars.',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    deadline,
    creationDate,
    statusIndex: 3
  }].map(item => {
    item.author = users.filter(subitem => subitem.id === item.authorId)[0];
    item.developer = users.filter(subitem => subitem.id === item.developerId)[0];
    item.project = project;

    return new Ticket(item);
  });

  return _groupBy(arr, 'status');
}
