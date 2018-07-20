import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import _isEmpty from 'lodash/isEmpty';

class KanbanColumn extends Component {
  constructor(props) {
    super(props);

    //this.state = {}

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('handleClick');
  }

  static getListClassName(isDraggingOver) {
    return isDraggingOver
      ? "kanban-board__droppable kanban-board__droppable--over"
      : "kanban-board__droppable"
  }

  render() {
    const {droppableId, data} = this.props;

    return (
      <div className="kanban-board__column">
        <h2 className="kanban-board__column-title">{data.name}</h2>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={KanbanColumn.getListClassName(snapshot.isDraggingOver)}
            >
              {!_isEmpty(data.values) && data.values.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="kanban-board-item"
                      onClick={this.handleClick}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                    >
                      <h3 className="kanban-board-item__title">{item.id}</h3>
                      <p className="kanban-board-item__text">{item.text}</p>
                      <p className="kanban-board-item__author">{item.author}</p>
                      <p className="kanban-board-item__developer">{item.developer}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}


KanbanColumn.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        developer: PropTypes.string.isRequired,
      })
    ).isRequired
  })
};


export default KanbanColumn;
