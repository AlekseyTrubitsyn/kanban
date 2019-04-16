import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import _isEmpty from 'lodash/isEmpty';

const propTypes = {
  parentClassName: PropTypes.string,
  highlighted: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    project: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired,
    reporter: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }).isRequired,
    assignee: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string
    }),
    deadline: PropTypes.string,
    creationDate: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired
  }),
  //TODO check
  draggableData: PropTypes.object.isRequired,
  draggableRef: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onAvatarOver: PropTypes.func.isRequired,
}

const defaultProps = {
  parentClassName: ''
};

const KanbanBoardItem = (props) => {
  const {
    parentClassName,
    item,
    draggableRef,
    draggableData,
    highlighted,
    onClick,
    onAvatarOver
  } = props;
  
  const { 
    id,
    title,
    description,
    reporter,
    assignee,
    deadline,
    creationDate,
    priority
  } = item;

  // const assigneeAvatar = assignee ? `${process.env.PUBLIC_URL}/${assignee.avatar}` : '';
  const assigneeAvatar = assignee ? assignee.avatar : '';

  const deadlineDate = new Date(deadline);
  const deadlineWarningTime = moment().add(12, 'hours').toDate();
  const done = item.statusName === 'done';

  const getModifier = () => {
    switch (true) {
      case done:
        return '--done';
      case (deadline && deadlineDate < new Date()):
        return '--expired';
      case (deadline && deadlineDate <= deadlineWarningTime):
        return '--warning';
      default:
        return '';
    }
  }

  const modifier = getModifier();

  return (
    <div
      className={
        `
          kanban-board-item 
          ${parentClassName} 
          ${highlighted ? 'highlighted' : ''} 
          ${modifier ? 'kanban-board-item' + modifier : ''}
        `.trim()
      }
      ref={draggableRef}
      {...draggableData}
      onClick={onClick}
    >
      <div className="kanban-board-item__header">
        <span>
          {'#' + id}
        </span>
        {!_isEmpty(assignee) && (
          <div
            className="kanban-board-item__assignee"
            onMouseOver={() => onAvatarOver((assignee && assignee.id) || -1)}
            onMouseLeave={() => onAvatarOver(-1)}
          >
            <span className="kanban-board-item__assignee-username">
              {assignee && assignee.username}
            </span>
            <div
              className="kanban-board-item__assignee-avatar"
            >
              <img
                src={assigneeAvatar}
                alt={assignee && assignee.username}
                width="30"
                height="auto"
              />
            </div>
          </div>
        )}
      </div>
      <div className="kanban-board-item__deadline">
        { done 
          ? (
            <span>Done!</span>
          ) : deadline ? (
            <Fragment>
              <span>deadline: </span>
              <span>{moment(deadline).format('LL')} </span>
              <span>({moment(deadline).fromNow().split(' ').join('\u00A0')})</span>
            </Fragment>
          ) : (
            <Fragment>
              <span>No deadline!</span>
            </Fragment>
          )
        }
      </div>
      <p className="kanban-board-item__title">
        {title.length > 35 ? title.slice(0, 32) + '...' : title}
      </p>
      <p className="kanban-board-item__description">
        {description.length > 35 ? description.slice(0, 32) + '...' : description}
      </p>
      <div className="kanban-board-item__footer">
        <div className="kanban-board-item__priority-stars">
          {priority && Array.from(new Array(priority)).map((item, index) =>
            <FontAwesomeIcon icon="star" key={index}/>
          )}
        </div>
        <span>Created </span>
        <span> {moment(creationDate).fromNow()}</span>
        <span> by {reporter.username}</span>
      </div>
      <button className="kanban-board-item__edit-button">
        <FontAwesomeIcon icon="info-circle"/>
      </button>
    </div>
  )
};

KanbanBoardItem.propTypes = propTypes;
KanbanBoardItem.defaultProps = defaultProps;
export default (KanbanBoardItem);