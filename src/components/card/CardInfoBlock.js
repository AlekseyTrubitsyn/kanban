import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';

const CardInfoBlock = (props) => {
  const {id, project, reporter, creationDate, assignee} = props;

  return (
    <div className="card-info__container card-info__container--texts">
      {project && !_isEmpty(project) &&
        <p className="card-info">Project: {project.name} ({project.key})</p>
      }
      {!!id && id !== -1 &&
        <p className="card-info">Task number: {id}</p>
      }
      <p className="card-info">
        <span>Created:</span>
        {creationDate
          ? <span> {moment(creationDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
          : <span> just now</span>
        }
      </p>
      {reporter &&
        <p className="card-info">
          <span>Reporter:</span>
          <span> {reporter.firstName} {reporter.secondName}</span>
          <span> ({reporter.username})</span>
          <img
            className="card__avatar"
            height="20"
            width="auto"
            src={reporter.avatar}
            alt="reporter"
          />
        </p>
      }
      {!_isEmpty(assignee)
        ? (
          <div className="card-info">
            <span>Assignee:</span>
            <span> {assignee.firstName} {assignee.secondName}</span>
            <span> ({assignee.username})</span>
            <img
              className="card__avatar"
              height="20"
              width="auto"
              src={assignee.avatar}
              alt="assignee"
            />
          </div>)
        : (
          <div className="card-info">No assignee</div>
        )
       }

    </div>
  );
};

export default CardInfoBlock;
