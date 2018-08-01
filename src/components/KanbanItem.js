import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const KanbanItem = (props) => {
  const { item, rf, ...deafultProps } = props;
  const developerAvatar = `${process.env.PUBLIC_URL}/${item.developer.avatar}`;

  const deadlineDate = new Date(item.deadline);
  const deadlineExpired = item.deadline && deadlineDate < new Date();
  const deadlineIsClose = !deadlineExpired
                          && item.deadline
                          && deadlineDate <= moment().add(12, 'hours').toDate();

  let deadlineClassName = "kanban-board-item__deadline";

  if (deadlineExpired) {
    deadlineClassName += " kanban-board-item__deadline--expired";
  } else if (deadlineIsClose) {
    deadlineClassName += " kanban-board-item__deadline--soon";
  } else {
    deadlineClassName += " translucent";
  }

  return (
    <div
      className="kanban-board-item"
      ref={rf}
      {...deafultProps}
    >
      <div className={"kanban-board-item__header" + (deadlineExpired ? " expired" : "") + (deadlineIsClose ? " warning" : "")}>
        <span>
          {(item.projectKey || '') + ' #' + item.id}
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
      <div className={deadlineClassName}>
        { item.deadline ?
          <Fragment>
            <span>deadline: </span>
            <span>{moment(item.deadline).format('LL')} </span>
            <span>({moment(item.deadline).fromNow()})</span>
          </Fragment>
          :
          <Fragment>
            <span>No deadline!</span>
          </Fragment>
        }
      </div>
      <p className="kanban-board-item__title">
        {item.title}
      </p>
      <p className="kanban-board-item__text">
        {item.text}
      </p>
      <div className="kanban-board-item__footer">
        <div className="kanban-board-item__priority-stars">
          {item.priority && Array.from(new Array(item.priority)).map(() =>
            <FontAwesomeIcon icon="star" />
          )}
        </div>
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
    deadline: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
      PropTypes.string
    ]),
    creationDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
      PropTypes.string
    ]).isRequired
  }),
  rf: PropTypes.func.isRequired
}

export default (KanbanItem);
