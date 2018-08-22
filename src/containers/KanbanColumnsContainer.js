import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import * as TicketsActions from '../actions/TicketsActions';

import KanbanColumn from '../components/KanbanColumn';

class KanbanBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAssigneeId: -1
    }

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onOpenCardClick = this.onOpenCardClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.isFetching) {
      return null;
    }

    return {};
  }

  onDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination) return;

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

  onOpenCardClick(columnName, itemId) {
    this.props.openItemCard({
      itemId,
      columnName
    })
  }

  onAssigneeSelect(id) {
    this.setState({
      selectedAssigneeId: id
    })
  }

  render() {
    const {
      discuss,
      toDo,
      inProgress,
      testing,
      done,
      archive,
      isFetching
    } = this.props;

    const { selectedAssigneeId } = this.state;

    if (isFetching) return (
      <div className="kanban-board__container kanban-board__container--loading">
        <div className="kanban-board">
          {Array.from(new Array(5)).map((item, index) =>
            <div className="kanban-board__column kanban-board__column--loading" key={index}>
              {Array.from(new Array(3)).map((subitem, subindex) => (
                <div className="kanban-board__dummy-item kanban-board-item" key={subindex}></div>
              ))}
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div className="kanban-board__container">
        <div className={"kanban-board" + (selectedAssigneeId !== -1 ? " highlight" : "")}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <KanbanColumn
              droppableId="discuss"
              key="discuss"
              data={discuss}
              selectedAssigneeId={selectedAssigneeId}
              onAssigneeSelect={(id) => this.onAssigneeSelect(id)}
              onItemClick={(id) => this.onOpenCardClick('discuss', id)}
            />
            <KanbanColumn
              droppableId="toDo"
              key="toDo"
              data={toDo}
              selectedAssigneeId={selectedAssigneeId}
              onAssigneeSelect={(id) => this.onAssigneeSelect(id)}
              onItemClick={(id) => this.onOpenCardClick('toDo', id)}
            />
            <KanbanColumn
              droppableId="inProgress"
              key="inProgress"
              data={inProgress}
              selectedAssigneeId={selectedAssigneeId}
              onAssigneeSelect={(id) => this.onAssigneeSelect(id)}
              onItemClick={(id) => this.onOpenCardClick('inProgress', id)}
            />
            <KanbanColumn
              droppableId="testing"
              key="testing"
              data={testing}
              selectedAssigneeId={selectedAssigneeId}
              onAssigneeSelect={(id) => this.onAssigneeSelect(id)}
              onItemClick={(id) => this.onOpenCardClick('testing', id)}
            />
            <KanbanColumn
              droppableId="done"
              key="done"
              data={done}
              selectedAssigneeId={selectedAssigneeId}
              onAssigneeSelect={(id) => this.onAssigneeSelect(id)}
              onItemClick={(id) => this.onOpenCardClick('done', id)}
            />
            <KanbanColumn
              droppableId="archive"
              key="archive"
              data={archive}
              selectedAssigneeId={selectedAssigneeId}
              onAssigneeSelect={(id) => this.onAssigneeSelect(id)}
              onItemClick={(id) => this.onOpenCardClick('archive', id)}
            />
          </DragDropContext>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const isFetching = state.tickets.isFetching || state.projects.isFetching;

  return {
    isFetching,
    discuss: state.tickets.discuss,
    toDo: state.tickets.toDo,
    inProgress: state.tickets.inProgress,
    testing: state.tickets.testing,
    done: state.tickets.done,
    archive: state.tickets.archive
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveTicket: bindActionCreators(TicketsActions, dispatch).moveTicket,
    openItemCard: bindActionCreators(TicketsActions, dispatch).openItemCard,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoardContainer);
