import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

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
      isFetching: false,
      isDraging: false
    };
  }

  render() {
    const { data, isEmpty, isFetching } = this.state;
    const { discuss, toDo, inProgress, testing, done } = data;

    if (isFetching) return ( <Loader /> );
    console.log('K', data);

    return (
      <div className="kanban-board">
        <DragDropContext>
          <KanbanColumn
            droppableId="discuss"
            key="discuss"
            data={data.discuss}
          />
          <KanbanColumn
            droppableId="toDo"
            key="toDo"
            data={data.toDo}
          />
          <KanbanColumn
            droppableId="inProgress"
            key="inProgress"
            data={data.inProgress}
          />
          <KanbanColumn
            droppableId="testing"
            key="testing"
            data={data.testing}
          />
          <KanbanColumn
            droppableId="done"
            key="done"
            data={data.done}
          />
        </DragDropContext>
      </div>
    );
  }

}

export default KanbanBoard;
