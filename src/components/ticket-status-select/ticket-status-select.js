import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

class TicketStatusSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.status
    }

    this.ticketStatuses = {
      discuss: 'Discuss',
      toDo: 'To do',
      inProgress: 'In progress',
      testing: 'Testing',
      done: 'Done',
      archive: 'Archive',
    }

    this.statusKeys = Object.keys(this.ticketStatuses);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value
    });

    this.props.onChange(value);
  }

  render() {
    const { value } = this.state;

    return (
      <select
        className="ticket-status-select"
        value={value}
        onChange={(e) => this.handleChange(e.target.value)}
      >
        {this.statusKeys.map((key) => (
          <option
            className="ticket-status-select__option"
            key={key}
            value={key}
          >
            {this.ticketStatuses[key]}
          </option>
        ))}
      </select>
    )
  }
}

TicketStatusSelect.propTypes = propTypes;
export default TicketStatusSelect;
