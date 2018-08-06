import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import moment from 'moment';
import DatePicker from 'react-datepicker';

import * as TicketsActions from '../actions/TicketsActions';

import 'react-datepicker/dist/react-datepicker.css';

import ModalContainer from '../components/ModalContainer';
import PrioritySelector from '../components/PrioritySelector';

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

    return (
      <ModalContainer
        onCloseClick={onCloseClick}
      >
        <div className="card">
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
          <p>Deadline:</p>
          <DatePicker
            selected={this.state.deadline}
            onChange={this.handleDeadlineChange}
            showTimeSelect
            dateFormat="LLL"
          />
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
