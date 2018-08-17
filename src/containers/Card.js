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

    this.statusSelectData = [
      { key: 'discuss', name: 'Discuss' },
      { key: 'toDo', name: 'To do' },
      { key: 'inProgress', name: 'In progress' },
      { key: 'testing', name: 'Testing'},
      { key: 'done', name: 'Done'}
    ];

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

    const { deadline, statusName, priority, assignee, subtasks, comments } = this.state;

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
                <select
                  value={statusName}
                  onChange={(e) => this.updateStatus(e.target.value)}>
                  {this.statusSelectData.map((item, i) => (
                    <option
                      key={i}
                      value={item.key}
                    >{item.name}</option>
                  ))}
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
    saveItem: bindActionCreators(TicketsActions, dispatch).updateTodoList
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
