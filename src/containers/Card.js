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
import Comments from '../components/Comments';
import CardInfoBlock from '../components/card/CardInfoBlock';
import CardDeadlinePicker from '../components/card/CardDeadlinePicker';

class Card extends Component {
  constructor(props) {
    super(props);

    const { item } = props;
    const { statusName, deadline, priority, assignee, subtasks, comments } = item;

    this.state = {
      statusName,
      deadline,
      priority,
      assignee,
      subtasks,
      comments
    }

    this.defaultStatus = statusName;

    this.updatePriority = this.updatePriority.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.updateSubtasks = this.updateSubtasks.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.updateDeadline = this.updateDeadline.bind(this);
  }

  updatePriority(priority) {
    this.setState({
      priority
    })
  }

  updateStatus(statusName) {
    this.setState({
      statusName
    })
  }

  updateComments(comments) {
    this.setState({
      comments
    })
  }

  updateSubtasks(subtasks) {
    this.setState({
      subtasks
    })
  }

  updateDeadline(date) {
    this.setState({
      deadline: date.utc().format()
    });
  }

  handleSaveClick() {
    const item = {...this.props.item, ...this.state};
    const shouldMove = this.defaultStatus !== this.state.statusName;
    console.log('saved!');
    // this.props.saveItem({
    //   prevStatusName: this.defaultStatus,
    //   shouldMove,
    //   item
    // })
  }

  render() {
    const { item, onCloseClick } = this.props;
    const { id, title, text, creationDate, project, reporter } = item;

    const { deadline, priority, assignee, subtasks, comments } = this.state;

    return (
      <ModalContainer
        onCloseClick={onCloseClick}
      >
        <div className="card">
          <div className="card__left">
            <label className="card-info__label" htmlFor="title">Title:</label>
            <input className="card-info" id="title" type="text" defaultValue={title}/>
            <label className="card-info__label" htmlFor="text">Description:</label>
            <textarea className="card-info" id="text"  rows="5" defaultValue={text}/>
            <label className="card-info__label" htmlFor="deadline">Deadline:</label>
            <CardDeadlinePicker
              date={item.dealine}
              updateDeadline={this.updateDeadline}
            />
          </div>
          <div className="card__right">
            <CardInfoBlock
              id={id}
              project={project}
              reporter={reporter}
              creationDate={creationDate}
              assignee={assignee}
            />
            <div className="card-info__container">
              <div className="card-info card__priority-selector">
                <span>Priority: </span>
                <PrioritySelector
                  value={priority}
                  onChange={this.updatePriority}
                />
              </div>
              <div className="card-info">
                <span>Change status: </span>
                <select onChange={(e) => this.updateStatus(e.target.value)}>
                  <option value="discuss">Discuss</option>
                  <option value="todo">To do</option>
                  <option value="inProgress">In progress</option>
                  <option value="testing">Testing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="card-info">
                <button className="btn btn-inline btn-secondary">Assign to me</button>
                <button className="btn btn-inline btn-secondary">Move to archive</button>
              </div>
            </div>
            <div className="card-info card-info--large card__subtasks">
              <h3 className="card-info__title">Subtasks: </h3>
              <Todo
                items={subtasks || []}
                onItemsUpdate={this.updateSubtasks}
              />
            </div>
            <div className="card-info card-info--large card__comments">
              <h3 className="card-info__title">Comments: </h3>
              <Comments
                items={comments || []}
                onItemsUpdate={this.updateComments}
              />
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

/*(props) => {
  const {
    item,
    currentProject,
    userData,
    onCloseClick,
    updateDeadline,
    updatePriority,
    updateStatus,
    updateComments,
    updateTodoList,
  } = props;

  const {
    id,
    title,
    text,
    deadline,
    priority,
    assignee,
    creationDate
  } = item;

  const project = item.project || currentProject;
  const reporter = item.reporter || userData;

  return (
    <ModalContainer
      onCloseClick={onCloseClick}
    >
      <div className="card">
        <div className="card__left">
          <label className="card-info__label" htmlFor="title">Title:</label>
          <input className="card-info" id="title" type="text" defaultValue={title}/>
          <label className="card-info__label" htmlFor="text">Description:</label>
          <textarea className="card-info" id="text"  rows="5" defaultValue={text}/>
          <label className="card-info__label" htmlFor="deadline">Deadline:</label>
          <CardDeadlinePicker
            itemId={id}
          />
          <div className="card__deadline">
            <DatePicker
              selected={moment(deadline)}
              onChange={updateDeadline}
              showTimeSelect
              dateFormat="LLL"
              id="deadline"
            />
          </div>
        </div>
        <div className="card__right">
          <div className="card-info__container card-info__container--texts">
            <p className="card-info">Project: {project.name} ({project.key})</p>
            {!!id && <p className="card-info">Task number: {id}</p>}
            <p className="card-info">
              <span>Created:</span>
              <span> {moment(creationDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </p>
            <p className="card-info">
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
            <div className="card-info">
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
          <div className="card-info__container">
            <div className="card-info card__priority-selector">
              <span>Priority: </span>
              <PrioritySelector
                value={priority}
                onChange={updatePriority}
              />
            </div>
            <div className="card-info">
              <span>Change status: </span>
              <select onChange={updateStatus}>
                <option value="discuss">Discuss</option>
                <option value="todo">To do</option>
                <option value="inProgress">In progress</option>
                <option value="testing">Testing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="card-info">
              <button className="btn btn-inline btn-secondary">Assign to me</button>
              <button className="btn btn-inline btn-secondary">Move to archive</button>
            </div>
          </div>
          <div className="card-info card-info--large card__subtasks">
            <h3 className="card-info__title">Subtasks: </h3>
            <Todo
              items={item.subtasks || []}
              onItemsUpdate={updateTodoList}
            />
          </div>
          <div className="card-info card-info--large card__comments">
            <h3 className="card-info__title">Comments: </h3>
            <Comments
              items={item.comments || []}
              onItemsUpdate={updateComments}
            />
          </div>
        </div>
        <div className="card__buttons">
          <button className="btn btn-primary" onClick={this.handleSaveClick}>Save</button>
          <button className="btn btn-primary" onClick={onCloseClick}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  )
}*/

function mapStateToProps(state) {
  return {
    item: state.tickets.itemToModify,
    currentProject: state.projects.currentProject,
    userData: state.userSettings.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseClick: bindActionCreators(TicketsActions, dispatch).closeItemCard,
    updateDeadline: bindActionCreators(TicketsActions, dispatch).updateDeadline,
    updateStatus: bindActionCreators(TicketsActions, dispatch).updateStatus,
    updatePriority: bindActionCreators(TicketsActions, dispatch).updatePriority,
    updateComments: bindActionCreators(TicketsActions, dispatch).updateComments,
    updateTodoList: bindActionCreators(TicketsActions, dispatch).updateTodoList,
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
  currentProject: PropTypes.object,
  userData: PropTypes.object,
  onCloseClick: PropTypes.func.isRequired,
  updateDeadline: PropTypes.func.isRequired,
  updatePriority: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  updateComments: PropTypes.func.isRequired,
  updateTodoList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
