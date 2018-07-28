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
      <div className="kanban-board-item__header">
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
      </div>
      <div className="kanban-board-item__deadline translucent">
        <span>deadline: </span>
        <span>{moment(item.deadline).format('LL')} </span>
        <span>({moment(item.deadline).fromNow()})</span>
      </div>
      <p className="kanban-board-item__title">
        {item.title}
      </p>
      <p className="kanban-board-item__text">
        {item.text}
      </p>
      <div className="kanban-board-item__footer">
        Created <span>{moment(item.creationDate).fromNow()}</span> by <span>{item.author.userName}</span>
      </div>

    </div>
  )
};

KanbanItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }).isRequired,
    developer: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }),
    projectName: PropTypes.string.isRequired,
    deadline: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
      PropTypes.string
    ]).isRequired,
    creationDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
      PropTypes.string
    ]).isRequired
  }),
  rf: PropTypes.func.isRequired
}

export default KanbanItem;
