import React, { Component } from 'react';

import createTasks from '../utilities/createTasks';

import Loader from './Loader';
import KanbanColumn from './KanbanColumn';

class KanbanBoard extends Component {
  constructor(props) {
    super(props);

    const data = createTasks();

    this.state = {
      data,
      isEmpty: false,
      isFetching: false
    };
  }

  render() {
    const { data, isEmpty, isFetching } = this.state;
    const { discuss, toDo, inProgress, testing, done } = data;

    if (isFetching) return ( <Loader /> );
    console.log('K', data);

    return (
      <div className="kanban-board">
        {Object.keys(data).map(item => (
          <KanbanColumn
            key={item}
            data={data[item]}
          />
        ))}
      </div>
    );
  }

}

export default KanbanBoard;
