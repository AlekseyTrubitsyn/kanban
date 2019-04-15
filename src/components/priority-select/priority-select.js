import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  parentClassName: PropTypes.string,
  priority: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  parentClassName: ''
};

class PrioritySelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      priority: props.priority
    }

    this.arr = Array.from(Array(3)).map(() => Math.floor(Math.random() * 1e6));

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(priority) {
    this.setState({
      priority
    });

    this.props.onChange(priority);
  }

  render() {
    const { parentClassName } = this.props;
    const { priority } = this.state;

    return (
      <div className={`${parentClassName} priority-select`.trim()}>
        {this.arr.map((item, index) => {
          const active = index <= priority;
          const checked = index === priority;

          return (
            <label
              key={item}
              className={`priority-select__label ${active
                ? 'priority-select__label--selected'
                : ''}`.trim()
              }
            >
              <input
                type="radio"
                checked={checked}
                value={index}
                onChange={(e) => this.handleChange(+e.target.value)}
                className="priority-select__radio-input"
              />
              <FontAwesomeIcon icon="star" />
            </label>
          )
        })}
      </div>
    )
  }
}

PrioritySelect.propTypes = propTypes;
PrioritySelect.defaultProps = defaultProps;
export default PrioritySelect;