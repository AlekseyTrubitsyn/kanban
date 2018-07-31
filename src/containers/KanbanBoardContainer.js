import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import * as TicketsActions from '../actions/TicketsActions';

import Loader from '../components/Loader';
import KanbanColumn from '../components/KanbanColumn';
import StorageButtons from '../components/StorageButtons';

class KanbanBoardContainer extends Component {
  constructor(props) {
    super(props);

    props.getTickets();

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onLoadClick = this.onLoadClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
  }

  onDragEnd(result) {
    const { source, destination, draggableId } = result;

    this.props.moveTicket({
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

  onSaveClick() {
    const {
      discuss,
      toDo,
      inProgress,
      testing,
      done,
      setTickets
    } = this.props;

    setTickets({
      discuss: discuss.values,
      toDo: toDo.values,
      inProgress: inProgress.values,
      testing: testing.values,
      done: done.values
    });
  }

  onLoadClick() {
    this.props.getTickets();
  }

  onResetClick() {
    this.props.resetTickets();
  }

  render() {
    const {
      discuss,
      toDo,
      inProgress,
      testing,
      done,
      isFetching
    } = this.props;

    if (isFetching) return (<Loader/>);

    return (
      <div>
        <StorageButtons
          onSaveClick={this.onSaveClick}
          onLoadClick={this.onLoadClick}
          onResetClick={this.onResetClick}
        />
        <div className="kanban-board">
          <DragDropContext onDragEnd={this.onDragEnd}>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.tickets.isFetching,
    discuss: state.tickets.discuss,
    toDo: state.tickets.toDo,
    inProgress: state.tickets.inProgress,
    testing: state.tickets.testing,
    done: state.tickets.done,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveTicket: bindActionCreators(TicketsActions, dispatch).moveTicket,
    getTickets: bindActionCreators(TicketsActions, dispatch).getTickets,
    setTickets: bindActionCreators(TicketsActions, dispatch).setTickets,
    resetTickets: bindActionCreators(TicketsActions, dispatch).resetTickets,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoardContainer);
