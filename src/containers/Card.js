import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import _isEmpty from 'lodash/isEmpty';

import * as TicketsActions from '../actions/TicketsActions';

import 'react-datepicker/dist/react-datepicker.css';

import ModalContainer from '../components/ModalContainer';
import PrioritySelector from '../components/PrioritySelector';
import Todo from '../components/Todo';

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
      deadline: moment(deadline),
      priority
    }

    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
  }

  handleSaveClick() {
    console.log('save click');
    this.props.onCloseClick();
  }

  handlePriorityChange(num) {
    this.setState({
      priority: num
    })
  }

  handleDeadlineChange(date) {
    this.setState({
      deadline: moment.utc(date)
    });
  }

  render() {
    const { title, text, deadline, priority } = this.state;
    const { item, currentProject, userData, onCloseClick } = this.props;

    const { id, assignee, creationDate } = item;

    const project = item.project || currentProject;
    const reporter = item.reporter || userData;

    /*TODO create title of the ModalContainer like "new item" or "edit item @title"*/
    return (
      <ModalContainer
        onCloseClick={onCloseClick}
      >
        <div className="card">
          <div className="card__left">
            <label className="card__info-label" htmlFor="title">Title:</label>
            <input className="card__info" id="title" type="text" defaultValue={title}/>
            <label className="card__info-label" htmlFor="text">Description:</label>
            <textarea className="card__info" id="text"  rows="5" defaultValue={text}/>
            <label className="card__info-label" htmlFor="deadline">Deadline:</label>
            <DatePicker
              selected={this.state.deadline}
              onChange={this.handleDeadlineChange}
              showTimeSelect
              dateFormat="LLL"
              id="deadline"
            />
          </div>
          <div className="card__right">
            <div className="card__info-container card__info-container--texts">
              <p className="card__info">Project: {project.name} ({project.key})</p>
              {!!id && <p className="card__info">Task number: {id}</p>}
              <p className="card__info">
                <span>Created:</span>
                <span> {moment(creationDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
              </p>
              <p className="card__info">
                <span>Reporter:</span>
                <span> {reporter.firstName} {reporter.secondName}</span>
                <span> ({reporter.userName})</span>
                <img
                  className="card__avatar"
                  height="20"
                  width="auto"
                  src={reporter.avatar}
                  alt="reporter"
                />
              </p>
              <div className="card__info">
                <span>Assignee:</span>
                {_isEmpty(assignee)
                  ? <button>assign to me</button>
                  : (
                    <Fragment>
                      <span> {assignee.firstName} {assignee.secondName}</span>
                      <span> ({assignee.userName})</span>
                      <img
                        className="card__avatar"
                        height="20"
                        width="auto"
                        src={assignee.avatar}
                        alt="assignee"
                      />
                    </Fragment>
                  )
                }
              </div>
            </div>
            <div className="card__info-container">
              <div className="card__info card__priority-selector">
                <span>Priority: </span>
                <PrioritySelector
                  value={priority}
                  onChange={this.handlePriorityChange}
                />
              </div>
              <div className="card__info">
                <span>Change status: </span>
                <select>
                  <option value="discuss">Discuss</option>
                  <option value="todo">To do</option>
                  <option value="inProgress">In progress</option>
                  <option value="testing">Testing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="card__info">
                <button className="btn btn-inline btn-secondary">Assign to me</button>
                <button className="btn btn-inline btn-secondary">Move to archive</button>
              </div>
            </div>
            <div className="card__info card__info--large card__subtasks">
              {/*TODO connect subtasks to redux*/}
              <h3>Subtasks: </h3>
              <Todo />
            </div>
            <div className="card__info card__info--large card__comments">
              {/*TODO list of comments*/}
              <h3>Comments: </h3>
              <div className="card__subtask todo-item">
                <textarea type="text" placeholder="Type your comment here"/>
                <button className="btn btn-inline btn-primary">+</button>
              </div>
            </div>
          </div>
          <div className="card__buttons">
            <button className="btn btn-primary" onClick={this.handleSaveClick}>Save</button>
            <button className="btn btn-primary" onClick={onCloseClick}>Cancel</button>
          </div>
        </div>
      </ModalContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    item: state.tickets.itemToModity,
    currentProject: state.projects.currentProject,
    userData: state.userSettings.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseClick: bindActionCreators(TicketsActions, dispatch).closeItemCard,
  }
}

Card.defaultProps = {
  item: {
    id: 0,
    title: '',
    text: '',
    creationDate: new Date(),
    priority: 1
  }
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    reporter: PropTypes.shape({
      userName: PropTypes.string,
      avatar: PropTypes.string
    }),
    assignee: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }),
    project: PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string
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
  // onSaveClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
