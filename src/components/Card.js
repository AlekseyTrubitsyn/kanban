import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ModalContainer from './ModalContainer';

const Card = ({item, onSaveClick, onCloseClick}) => {
  const {id, title, text, project, reporter, assignee, deadline, creationDate, priority} = item;
  console.log(reporter);
  return (
    <ModalContainer
      onCloseClick={onCloseClick}
    >
      <div className="card">
        <p className="card__info">Project: {project.name} ({project.key})</p>
        <p className="card__info">Task number: {id}</p>
        <p className="card__info">Priority: {priority}</p>
        <p className="card__info">
          <span>Created:</span>
          <span> {moment(deadline).format('MMMM Do YYYY, h:mm:ss a')}</span>
        </p>
        <p className="card__info">
          <span>Reporter:</span>
          <span> {reporter.firstName} {reporter.secondName}</span>
          <span> ({reporter.userName})</span>
        </p>
        <p className="card__info">
          <span>Deadline:</span>
          { deadline
            ? <span> {moment(deadline).format('MMMM Do YYYY, h:mm:ss a')}</span>
            : <span> unset</span>
          }
        </p>

        <input type="text" defaultValue={title}/>
        <textarea rows="5" defaultValue={text}/>
        <input type="text" defaultValue={deadline}/>
        <input type="text" defaultValue={creationDate}/>
        <p type="text" defaultValue={assignee}/>
        <div className="card__buttons">
          <button className="btn btn-primary" onClick={onSaveClick}>Save</button>
          <button className="btn btn-primary" onClick={onCloseClick}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  )
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    reporter: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }).isRequired,
    assignee: PropTypes.shape({
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
    ]).isRequired,
    priority: PropTypes.number.isRequired,
    subtasks: PropTypes.array,
    activity: PropTypes.array
  }),
  onSaveClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired
}

export default Card;
