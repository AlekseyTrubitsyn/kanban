import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ModalContainer from './ModalContainer';
import PrioritySelector from './PrioritySelector';

class Card extends Component {
  constructor(props) {
    super(props);

    const {
      title,
      text,
      deadline,
      priority
    } = this.props.item;

    this.state = {
      title,
      text,
      deadline,
      priority
    }

    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
  }

  handleSaveClick() {
    this.props.onSaveClick();
  }

  handleCloseClick() {
    this.props.onCloseClick();
  }

  handlePriorityChange(num) {
    this.setState({
      priority: num
    })
  }

  render() {
    const { item } = this.props;

    const {
      id,
      project,
      reporter,
      assignee,
      creationDate
    } = item;

    const {
      title,
      text,
      deadline,
      priority
    } = this.state;

    return (
      <ModalContainer
        onCloseClick={this.handleCloseClick}
      >
        <div className="card">
          <p className="card__info">Project: {project.name} ({project.key})</p>
          <p className="card__info">Task number: {id}</p>
          <p className="card__info">
            <span>Created:</span>
            <span> {moment(creationDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
          </p>
          <p className="card__info">
            <span>Reporter:</span>
            <span> {reporter.firstName} {reporter.secondName}</span>
            <span> ({reporter.userName})</span>
          </p>
          <div className="card__priority-selector">
            <span>Priority: </span>
            <PrioritySelector
              value={priority}
              onChange={this.handlePriorityChange}
            />
          </div>
          <input type="text" defaultValue={title}/>
          <textarea rows="5" defaultValue={text}/>
          <input type="text" defaultValue={deadline}/>
          <div className="card__buttons">
            <button className="btn btn-primary" onClick={this.handleSaveClick}>Save</button>
            <button className="btn btn-primary" onClick={this.handleCloseClick}>Cancel</button>
          </div>
        </div>
      </ModalContainer>
    )
  }
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
