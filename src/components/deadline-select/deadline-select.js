import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const propTypes = {
  parentClassName: PropTypes.string,
  deadline: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

const defaultProps = {
  parentClassName: '',
  deadline: null
}

class DeadlineSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: props.deadline ? new Date(props.deadline) : new Date()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });

    this.props.onChange(date.toUTCString());
  }

  render() {
    const { parentClassName } = this.props;
    const { startDate } = this.state;

    // TODO: replace by custom date picker
    return (
      <div className={`${parentClassName } deadline-select`.trim()}>
        <DatePicker
          selected={startDate}
          onChange={this.handleChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy HH:mm"
          id="deadline"
        />
      </div>
    )
  }
}

DeadlineSelect.propTypes = propTypes;
DeadlineSelect.deadline = defaultProps;
export default DeadlineSelect;
