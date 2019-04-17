import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';

import _isEmpty from 'lodash/isEmpty';

import KanbanBoardItem from '../kanban-board-item';

const propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.object)
  })
};

const KanbanBoardColumn = (props) => {
  const { droppableId, data, onItemClick, selectedAssigneeId, onAssigneeSelect } = props;

  return (
    <div className="kanban-board-column">
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={
              `kanban-board-column__droppable ${snapshot.isDraggingOver 
                ? 'kanban-board-column__droppable' 
                : ''
              }`.trim()
            }
          >
            <h4 className="kanban-board-column__title">{data.name}</h4>
            <PerfectScrollbar>
              {!_isEmpty(data.values) && data.values.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  { provided => (
                    <KanbanBoardItem
                      parentClassName="kanban-board-column__item"
                      onClick={() => onItemClick(item.id)}
                      draggableRef={provided.innerRef}
                      draggableData={{
                        ...provided.draggableProps, 
                        ...provided.dragHandleProps
                      }}
                      style={provided.draggableProps.style}
                      item={item}
                      highlighted={item.assignee && item.assignee.id === selectedAssigneeId}
                      onAvatarOver={(id) => onAssigneeSelect(id)}
                    />
                  )}
                </Draggable>
              ))}
            </PerfectScrollbar>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

KanbanBoardColumn.propTypes = propTypes;
export default KanbanBoardColumn;
