import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  parentClassName: PropTypes.string,
  onCreate: PropTypes.func.isRequired,
};

const defaultProps = {
  parentClassName: '',
};

class SubtaskConstructor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      enabled: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    this.setState({
      value,
      enabled: !!value.length
    });
  }

  handleSubmit() {
    const {
      value,
      enabled
    } = this.state;

    if (!enabled) return;

    this.setState({
      value: '',
      enabled: false
    });

    this.props.onCreate(value)
  }

  render() {
    const { parentClassName } = this.props;

    const {
      value,
      enabled
    } = this.state;

    return (
      <div className={`${parentClassName} subtask-constructor`.trim()}>
        <textarea
          className="subtask-constructor__input"
          placeholder="Split your task into a few small subtasks"
          value={value}
          onChange={(e) => this.handleChange(e.target.value)}
          rows={2}
        />
        <button
          className={`subtask-constructor__submit btn btn-inline btn-primary ${enabled ? '' : 'disabled'}`.trim()}
          title={`${enabled ? 'Create subtask' : 'Type some text to create a new subtask'}`}
          onClick={this.handleSubmit}
          disabled={!enabled}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    )
  }
}

SubtaskConstructor.propTypes = propTypes;
SubtaskConstructor.defaultProps = defaultProps;
export default SubtaskConstructor;