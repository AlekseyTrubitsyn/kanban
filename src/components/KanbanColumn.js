import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import _isEmpty from 'lodash/isEmpty';

import KanbanItem from './KanbanItem';

const KanbanColumn = (props) => {
  const handleClick = () => {
    console.log('handleClick');
  }

  const getListClassName = (isDraggingOver) => {
    return isDraggingOver
      ? "kanban-board__droppable kanban-board__droppable--over"
      : "kanban-board__droppable";
  }

  const {droppableId, data} = props;

  return (
    <div className="kanban-board__column">
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={
              snapshot.isDraggingOver
                ? "kanban-board__droppable kanban-board__droppable--over"
                : "kanban-board__droppable"
            }
          >
            <h4 className="kanban-board__column-title">{data.name}</h4>
            {!_isEmpty(data.values) && data.values.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <KanbanItem
                    onClick={this.handleClick}
                    rf={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                    item={item}
                  />
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

KanbanColumn.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired
  })
};


export default KanbanColumn;
