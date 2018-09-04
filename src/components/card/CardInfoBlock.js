import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
            <span>Assignee: </span>
            {assignee.firstName && assignee.secondName
              ? <Fragment>
                  <span>{assignee.firstName} {assignee.secondName}</span>
                  <span> ({assignee.username})</span>
                </Fragment>
              : <span>{assignee.username}</span>
            }
            {assignee.avatar && (
              <img
                className="card__avatar"
                height="20"
                width="auto"
                src={assignee.avatar}
                alt="assignee"
              />
            )}
          </div>)
        : (
          <div className="card-info">No assignee</div>
        )
       }

    </div>
  );
};

CardInfoBlock.propTypes = {
  id: PropTypes.number,
  project: PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.string
  }),
  reporter: PropTypes.shape({
    username: PropTypes.string.isRequired,
    secondName: PropTypes.string,
    firstName: PropTypes.string
  }),
  creationDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
    PropTypes.string
  ]),
  assignee: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string
  }),
}

export default CardInfoBlock;
