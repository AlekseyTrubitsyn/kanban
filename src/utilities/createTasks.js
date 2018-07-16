const createTasks = () => {
  return {
    discuss: {
      name: 'Discuss',
      values: [createTask()]
    },
    toDo: {
      name: 'To do',
      values: [createTask(), createTask()]
    },
    inProgress: {
      name: 'In progress',
      values: [createTask(), createTask(), createTask()]
    },
    testing: {
      name: 'Testing',
      values: []
    },
    done: {
      name: 'Done',
      values: []
    },
  }
}

const createTask = () => {
  if (!this.id) {
    this.id = 1;
  }

  return {
    id: this.id++,
    title: 'Title',
    text: 'Text',
    author: 'User-A',
    developer: 'User-B'
  }
}

export default createTasks;
