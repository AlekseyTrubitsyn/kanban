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

  const done = item.statusName === 'done';
  const deadlineMoment = deadline ? moment(deadline) : null;

  const getModifier = () => {
    switch (true) {
      case done:
        return '--done';

      case (deadline && deadlineMoment && deadlineMoment.isBefore(moment())):
        return '--expired';

      case (deadline && deadlineMoment && deadlineMoment.isSameOrBefore(moment().add(24, 'hours'))):
        return '--warning';

      default:
        return '';
    }
  }

  const modifier = getModifier();
  const deadlineString = deadlineMoment
    ? `${deadlineMoment.format('LL')} ${deadlineMoment.fromNow().split(' ').join('\u00A0')}`
    : '';

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
      <div className="kanban-board-item__header kanban-board-item-header">
        <span className="kanban-board-item-header__span kanban-board-item-header__ticket-id">
          {'#' + id}
        </span>
        {!_isEmpty(assignee) && (
          <Fragment>
            <span
              className="kanban-board-item-header__span kanban-board-item-header__assignee-username"
              onMouseOver={() => onAvatarOver(assignee.id)}
              onMouseLeave={() => onAvatarOver(-1)}
              title={`All tickets for ${assignee.username}`}
            >
              {assignee.username}
            </span>
            <img
              className="kanban-board-item-header__span kanban-board-item-header__assignee-avatar"
              src={assignee.avatar}
              alt={assignee.username}
              width="30"
              height="auto"
              onMouseOver={() => onAvatarOver(assignee.id)}
              onMouseLeave={() => onAvatarOver(-1)}
              title={`All tickets for ${assignee.username}`}
            />
          </Fragment>
        )}
        </div>
      <div className="kanban-board-item__deadline kanban-board-item-deadline">
        <span className="kanban-board-item-deadline__text">
          {done && 'Done!'}
          {!done && deadline && `deadline: ${deadlineString}`}
          {!done && !deadline && 'No deadline!'}
        </span>
      </div>
      <p className="kanban-board-item__title">
        {title.length > 35 ? title.slice(0, 32) + '...' : title}
      </p>
      <p className="kanban-board-item__description">
        {description.length > 35 ? description.slice(0, 32) + '...' : description}
      </p>
      <div className="kanban-board-item__footer kanban-board-item-footer">
        <div className="kanban-board-item-footer__priority-stars">
          {priority && Array.from(new Array(priority)).map((item, index) =>
            <FontAwesomeIcon icon="star" key={index} />
          )}
        </div>
        <p className="kanban-board-item-footer__created">
          {`Created ${moment(creationDate).fromNow()} by ${reporter.username}`}
        </p>
      </div>
      <button
        className="kanban-board-item__info-button"
        title={`Show details`}
      >
        <FontAwesomeIcon icon="info-circle" />
      </button>
    </div>
  )
};

KanbanBoardItem.propTypes = propTypes;
KanbanBoardItem.defaultProps = defaultProps;
export default (KanbanBoardItem);