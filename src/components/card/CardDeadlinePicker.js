import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class CardDeadlinePicker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      startDate: moment(props.date)
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });

    this.props.updateDeadline(date);
  }

  render() {
    return (
      <div className="card__deadline">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          dateFormat="LLL"
          id="deadline"
        />
      </div>
    )
  }
}

export default CardDeadlinePicker;
