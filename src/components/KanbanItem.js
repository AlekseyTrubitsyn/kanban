import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const KanbanItem = (props) => {
  const { item, rf, ...deafultProps } = props;
  const developerAvatar = `${process.env.PUBLIC_URL}/${item.developer.avatar}`;
  const authorAvatar = `${process.env.PUBLIC_URL}/${item.author.avatar}`;

  return (
    <div
      className="kanban-board-item"
      ref={rf}
      {...deafultProps}
    >
      <p className="kanban-board-item__title">
        <span>
          {item.name || item.projectCode + ' #' + item.id}
        </span>
        <span className="kanban-board-item__developer-username">
          {item.developer.userName}
        </span>
        <div className="kanban-board-item__developer-avatar">
          <img
            src={developerAvatar}
            alt={item.developer.userName}
            width="30"
            height="auto"
          />
        </div>
      </p>
      <p className="kanban-board-item__text">{item.text}</p>
      <p className="kanban-board-item__developer">{item.developer.userName}</p>
      <p className="kanban-board-item__deadline">{moment(item.deadline).format('LL')}</p>
      <div className="kanban-board-item__footer">
        Created <span>{moment(item.creationDate).fromNow()}</span> by <span>{item.author.userName}</span>
      </div>

    </div>
  )
};

/*KanbanItem.propTypes = {
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    developer: PropTypes.string.isRequired,
  })
}*/

export default KanbanItem;
