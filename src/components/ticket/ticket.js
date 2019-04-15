import React from 'react'
import PropTypes from 'prop-types'

import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';

import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';

import { getFormatedDate } from '../../utilities/date';
import { subtaskPropTypes } from '../subtask';
import { commentPropTypes } from '../comment';

import ModalContainer from '../modal-container';
import EditableText from '../editable-text';
import PrioritySelect from '../priority-select';
import TicketStatusSelect from '../ticket-status-select';
import Subtasks from '../subtasks';
import Comments from '../comments';
import DeadlineSelect from '../deadline-select';

export const ticketPropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reporter: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    surname: PropTypes.string,
  }).isRequired,
  assignee: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }),
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  }).isRequired,
  deadline: PropTypes.string,
  creationDate: PropTypes.string.isRequired,
  statusName: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  subtasks: PropTypes.arrayOf(
    PropTypes.shape(subtaskPropTypes).isRequired
  ),
  comments: PropTypes.arrayOf(
    PropTypes.shape(commentPropTypes).isRequired
  ),
};

const propTypes = {
  item: PropTypes.shape(ticketPropTypes),
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveAndClose: PropTypes.func.isRequired,
}


const Ticket = (props) => {
  const {
    item,
    userData,
    onSave,
    onClose,
    onSaveAndClose
  } = props;

  const {
    id,
    title,
    description,
    reporter,
    assignee,
    project,
    deadline,
    creationDate,
    statusName,
    priority,
    subtasks,
    comments,
  } = item;

  const statusNames = {
    discuss: 'Discuss',
    toDo: 'To do',
    inProgress: 'In progress',
    testing: 'Testing',
    done: 'Done',
    archive: 'Archive',
  };

  const unsavedTicketData = _cloneDeep(item);

  unsavedTicketData.previousStatus = item.statusName;

  const updateTitle = title => {
    unsavedTicketData.title = title;
  }

  const updateDescription = description => {
    unsavedTicketData.description = description;
  }

  const updateDeadline = deadline => {
    unsavedTicketData.deadline = deadline;
  }

  const updatePriority = priority => {
    unsavedTicketData.priority = priority;
  }

  const updateStatus = status => {
    unsavedTicketData.statusName = status;
  }

  const updateComments = comments => {
    unsavedTicketData.comments = comments;
  }

  const updateSubtasks = subtasks => {
    unsavedTicketData.subtasks = subtasks;
  }

  const handleSave = () => {
    onSave({ ...unsavedTicketData });
  };

  const handleSaveAndClose = () => {
    onSaveAndClose({ ...unsavedTicketData });
  }

  const priorityValues = ['Minor', 'Normal', 'Important'];

  return (
    <ModalContainer
      onCloseClick={onClose}
    >
      <div className="ticket">
        <div className="ticket__header ticket-header">
          <p className="ticket-header__project">
            {`${project.name} / ${project.key} ${id !== -1 ? '#' + id : ''}`}
          </p>
          <EditableText
            parentClassName="ticket-header__title"
            defaultValue={title}
            placeholder="Ticker title"
            onChange={updateTitle}
          />
        </div>
        <aside className="ticket__aside ticket-aside">
          <div className="ticket-aside__item ticket-aside-item">
            <button
              className="btn btn-primary btn-inline ticket-aside-item__action-button"
              onClick={handleSave}
            >
              {'Save'}
            </button>
            <button
              className="btn btn-primary btn-inline ticket-aside-item__action-button"
              onClick={handleSaveAndClose}
            >
              {'Save and close'}
            </button>

            <button
              className="btn btn-primary btn-inline ticket-aside-item__action-button"
              onClick={onClose}
            >
              {'Cancel'}
            </button>
          </div>
          <div className="ticket-aside__item ticket-aside-item">
            <h3 className="ticket-aside-item__title ticket__subtitle">
              {'Change status to'}
            </h3>
            <TicketStatusSelect
              parentClassName="ticket-aside-item__action"
              status={statusName}
              onChange={updateStatus}
            />
          </div>
          <div className="ticket-aside__item">
            <h3 className="ticket-aside-item__title ticket__subtitle">
              {'Change deadline'}
            </h3>
            <DeadlineSelect
              deadline={deadline}
              onChange={updateDeadline}
            />
          </div>
          <div className="ticket-aside__item">
            <h3 className="ticket-aside-item__title ticket__subtitle">
              {'Change priority'}
            </h3>
            <PrioritySelect
              parentClassName="ticket-aside-item__action"
              priority={priority}
              onChange={updatePriority}
            />
          </div>
          <div className="ticket-aside__item">
            <h3 className="ticket-aside-item__title ticket__subtitle">
              {'Subtasks'}
            </h3>
            <PerfectScrollbar>
              <Subtasks
                parentClassName="ticket-aside-item__action ticket__subtitle"
                subtasks={subtasks}
                onChange={updateSubtasks}
              />
            </PerfectScrollbar>
          </div>
        </aside>
        <div className="ticket__details ticket-details">
          <h3 className="ticket__subtitle">
            {'Details'}
          </h3>
          <PerfectScrollbar>
            <p className="ticket-details__item ticket-details-item">
              <span className="ticket-details-item__key">
                {'Status:'}
              </span>
              <span className="ticket-details-item__value">
                {statusNames[statusName]}
              </span>
            </p>
            <p className="ticket-details__item ticket-details-item">
              <span className="ticket-details-item__key">
                {'Priority:'}
              </span>
              <span className="ticket-details-item__value">
                {priorityValues[priority]}
              </span>
            </p>
            <p className="ticket-details__item ticket-details-item">
              <span className="ticket-details-item__key">
                {'Reporter:'}
              </span>
              <span className="ticket-details-item__value">
                {` ${reporter.firstName} ${reporter.surname ? reporter.surname : ''}`}
              </span>
            </p>
            <p className="ticket-details__item ticket-details-item">
              <span className="ticket-details-item__key">
                {'Created:'}
              </span>
              <span className="ticket-details-item__value">
                {getFormatedDate(creationDate)}
              </span>
            </p>
            <p className="ticket-details__item ticket-details-item">
              <span className="ticket-details-item__key">
                {'Deadline:'}
              </span>
              <span className="ticket-details-item__value">
                {deadline ? getFormatedDate(deadline) : 'No deadline'}
              </span>
            </p>
            <p className="ticket-details__item ticket-details-item">
              <span className="ticket-details-item__key">
                {'Assignee:'}
              </span>
              <span className="ticket-details-item__value">
                {_isEmpty(assignee)
                  ? 'No assignee'
                  : `${assignee.firstName} ${assignee.surname}`
                }
              </span>
            </p>
          </PerfectScrollbar>
        </div>
        <div className="ticket__description ticket-description">
          <h3 className="ticket__subtitle ticket-description__title">
            {'Description'}
          </h3>
          <PerfectScrollbar>
            <EditableText
              parentClassName="ticket-description__editable-text"
              defaultValue={description}
              rows={10}
              placeholder="Describe all information about your problem"
              onChange={updateDescription}
            />
          </PerfectScrollbar>
        </div>
        <div className="ticket__comments ticket-comments">
          <h3 className="ticket__subtitle">
            {'Comments'}
          </h3>
          <PerfectScrollbar>
            <Comments
              comments={comments}
              username={userData.username}
              onChange={updateComments}
            />
          </PerfectScrollbar>
        </div>
      </div>
    </ModalContainer>
  )
}

Ticket.propTypes = propTypes;
export default Ticket;