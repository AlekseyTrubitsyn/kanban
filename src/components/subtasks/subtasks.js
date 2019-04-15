import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SubtaskConstructor from '../subtask-constructor';
import Subtask, { subtaskPropTypes } from '../subtask';

const propTypes = {
  subtasks: PropTypes.arrayOf(
    PropTypes.shape(subtaskPropTypes)
  ),
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  subtasks: []
};

class Subtasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subtasks: props.subtasks
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(subtask) {
    const { subtasks } = this.state;

    const newSubtasks = subtasks.slice();
    const subtaskIndex = newSubtasks.findIndex(item => item.id === subtask.id);

    if (subtaskIndex === -1) throw new Error(`Wrong subtask id ${subtask.id}`);

    newSubtasks[subtaskIndex] = subtask;

    this.setState({
      subtasks: newSubtasks
    });

    this.props.onChange(newSubtasks);
  }

  handleCreate(value) {
    const { subtasks } = this.state;

    const maxId = subtasks.length
      ? Math.max.apply(null, subtasks.map(subtask => subtask.id))
      : -1;

    const newSubtask = {
      id: maxId + 1,
      text: value,
      done: false
    };

    const newSubtasks = subtasks.concat(newSubtask);

    this.setState({
      subtasks: newSubtasks
    });

    this.props.onChange(newSubtasks);
  }

  handleDelete(id) {
    const { subtasks } = this.state;
    const newSubtasks = subtasks.slice();
    newSubtasks.splice(newSubtasks.findIndex(subtask => subtask.id === id), 1);

    this.setState({
      subtasks: newSubtasks
    });

    this.props.onChange(newSubtasks);
  }

  render() {
    const { subtasks } = this.state;

    return (
      <div className="subtasks">
        <ul className="subtasks__list subtasks-list">
          {subtasks.map(({ id, text, done }, index) => (
            <li
              className="subtasks-list__item subtasks-list-item"
              key={id}
            >
              <Subtask
                parentClassName="subtasks-list-item__subtask"
                id={id}
                done={done}
                text={text}
                onChange={this.handleChange}
              />
              <button
                className="subtasks-list-item__delete-button btn btn-inline btn-primary"
                title="Delete subtask"
                onClick={() => this.handleDelete(id)}
              >
                <FontAwesomeIcon icon="times" />
              </button>
            </li>
          ))}
        </ul>
        <SubtaskConstructor
          parentClassName="subtasks__constructor"
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

Subtasks.propTypes = propTypes;
Subtasks.defaultProps = defaultProps;
export default Subtasks;