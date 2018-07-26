import moment from 'moment';
import _groupBy from 'lodash/groupBy';

/**
** 'Back in front': get/create and combine data.
**/
export const getDefaultTasks = () => {
  const arr = [{
    title: 'Example 1',
    text: 'I watched the storm, so beautiful yet terrific.',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    statusIndex: 0
  }, {
    title: 'Example 2',
    text: 'A red flare silhouetted the jagged edge of a wing',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    statusIndex: 0
  }, {
    title: 'Example 3',
    text: 'Almost before we knew it, we had left the ground.',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    statusIndex: 1
  }, {
    title: 'Example 4',
    text: 'A shining crescent far beneath the flying vessel.',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    statusIndex: 2
  }, {
    title: 'Example 5',
    text: 'Mist enveloped the ship three hours out from port.',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    statusIndex: 2
  }, {
    title: 'Example 6',
    text: 'She stared through the window at the stars.',
    authorId: 2,
    developerId: 1,
    projectId: 1,
    statusIndex: 3
  }].map(item => new Task(item));

  const result = _groupBy(arr, 'status');
  console.log(result);
  return result;
}

const statuses = ['discuss', 'toDo', 'inProgress', 'testing', 'done'];

class Task {
  constructor(props) {
    const {
      title,
      text,
      authorId,
      developerId,
      projectId,
      statusIndex
    } = props;

    const projectCode = 'TEST';
    const author = {
      userId: 2,
      userName: 'Supertester',
      avatar: 'img/default-woman.png'
    };
    const developer = {
      userId: 1,
      userName: 'Lorem I',
      avatar: 'img/default-man.png'
    };
    const id = Task.counter;

    this.id = id;
    this.name = projectCode + ' #' + id;
    this.title = title;
    this.text = text;
    this.author = author;
    this.developer = developer;
    this.projectCode = projectCode;
    this.deadline = moment(moment()).add(1, 'days');
    this.creationDate = moment(moment()).subtract(2, 'days');
    this.status = statuses[statusIndex]
  }

  static get counter() {
    Task._counter = (Task._counter || 0) + 1;
    return Task._counter;
  }
}

class User {
  constructor(props) {
    const {
      userName,
      firstName,
      secondName,
      gender,
      avatar,
      email
    } = props;

    this.id = User.counter;
    this.userName = userName;
    this.firstName = firstName;
    this.secondName = secondName;
    this.gender = gender;
    this.avatar = avatar || (gender === 'MALE'
                              ? User.defaultManImage()
                              : User.defaultWomanImage());
    this.email = email;
  }

  static get counter() {
    User._counter = (User._counter || 0) + 1;
    return User._counter;
  }

  static get defaultManImage() {
    return 'img/default-man.png';
  }

  static get defaultWomanImage() {
    return 'img/default-woman.png';
  }

  static get users() {
    return User._users;
  }

  static addUser(User) {
    User._users.push(User);
  }
}
