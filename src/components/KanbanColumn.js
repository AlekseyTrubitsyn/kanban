import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

const KanbanColumn = ({data}) => {
  return (
    <div className="kanban-board__column">
      {!_isEmpty(data) && (
        <Fragment>
          <h2 className="kanban-board__column-title">{data.name}</h2>
          {!_isEmpty(data.values) && data.values.map(item => (
            <div className="kanban-board-item">
              <h3 className="kanban-board-item__title">{item.title}</h3>
              <p className="kanban-board-item__text">{item.text}</p>
              <p className="kanban-board-item__author">{item.author}</p>
              <p className="kanban-board-item__developer">{item.developer}</p>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
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
