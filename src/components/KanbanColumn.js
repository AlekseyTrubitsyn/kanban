import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import _isEmpty from 'lodash/isEmpty';

import KanbanItem from './KanbanItem';

const KanbanColumn = (props) => {
  const { droppableId, data, onItemClick } = props;

  const handleClick = (id) => {
    console.log('handleClick', id);
    onItemClick(id);
  }

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
                    onClick={() => handleClick(item.id)}
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
    values: PropTypes.arrayOf(PropTypes.object)
  })
};


export default KanbanColumn;
