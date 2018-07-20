import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { DragDropContext } from 'react-beautiful-dnd';

import * as TicketsActions from '../actions/TicketsActions';

// import Loader from './Loader';
import KanbanColumn from '../components/KanbanColumn';

const KanbanBoard = (props) => {
  const {
    discuss,
    toDo,
    inProgress,
    testing,
    done,
    isEmpty,
    isFetching,
    moveTicket
  } = props;

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    moveTicket({
      source: {
        name: source.droppableId,
        position: source.index
      },
      destination: {
        name: destination.droppableId,
        position: destination.index
      },
      draggableId
    });
  }

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        <KanbanColumn
          droppableId="discuss"
          key="discuss"
          data={discuss}
        />
        <KanbanColumn
          droppableId="toDo"
          key="toDo"
          data={toDo}
        />
        <KanbanColumn
          droppableId="inProgress"
          key="inProgress"
          data={inProgress}
        />
        <KanbanColumn
          droppableId="testing"
          key="testing"
          data={testing}
        />
        <KanbanColumn
          droppableId="done"
          key="done"
          data={done}
        />
      </DragDropContext>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isFetching : state.tickets.isFetching,
    isEmpty : state.tickets.isEmpty,
    discuss : state.tickets.discuss,
    toDo : state.tickets.toDo,
    inProgress : state.tickets.inProgress,
    testing : state.tickets.testing,
    done : state.tickets.done,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveTicket: bindActionCreators(TicketsActions, dispatch).moveTicket,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
