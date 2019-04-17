import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import KanbanColumn from '../KanbanColumn';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      droppableId: PropTypes.string.isRequired,
      //TODO: fix
      data: PropTypes.object.isRequired,
    }).isRequired
  ).isRequired,
  onTicketMove: PropTypes.func.isRequired,
  onOpenTicket: PropTypes.func.isRequired
};

class KanbanBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAssigneeId: -1,
      filter: 'all'
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

    this.props.onTicketMove({
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
    this.props.onOpenTicket({
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
      isFetching,
      columns
    } = this.props;

    const { selectedAssigneeId } = this.state;

    if (isFetching) return (
      <div className="kanban-board__container kanban-board__container--loading">
        <div className="kanban-board">
          {Array.from(new Array(5)).map((item, index) => (
            <div
              className="kanban-board__column kanban-board__column--loading"
              key={index}
            >
              {Array.from(new Array(3)).map((subitem, subindex) => (
                <div
                  className="kanban-board__dummy-item kanban-board-item"
                  key={subindex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="kanban-board__container">
        <div className={"kanban-board" + (selectedAssigneeId !== -1 ? " highlight" : "")}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {columns.map(column => (
              <KanbanColumn
                droppableId={column.droppableId}
                key={column.droppableId}
                data={column.data}
                selectedAssigneeId={selectedAssigneeId}
                onAssigneeSelect={(id) => this.onAssigneeSelect(id)}
                onItemClick={(id) => this.onOpenCardClick(column.droppableId, id)}
              />
            ))}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

KanbanBoard.propTypes = propTypes;
export default KanbanBoard;
