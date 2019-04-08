import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password']),
  defaultValue: PropTypes.string,
  modifier: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

const defaultProps = {
  type: 'text',
  defaultValue: '',
  modifier: null,
  onChange: null,
  onFocus: null,
  onBlur: null
};

class LabeledInput extends Component {
  constructor(props) {
    super(props);

    const value = this.props.defaultValue;

    this.state = {
      lift: value.length,
      value
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(value) {
    const {
      id,
      modifier,
      onChange
    } = this.props;

    const modifiedValue = modifier ? modifier(value) : value;

    this.setState({
      value: modifiedValue
    });

    if (onChange) {
      onChange({ id, value });
    }
  }

  handleFocus() {
    const { 
      id,
      onFocus 
    } = this.props;    

    this.setState({
      lift: true
    });

    if (onFocus) {
      onFocus(id);
    }
  }
  
  handleBlur() {
    const {
      id,
      onBlur
    } = this.props;

    const { value } = this.state;

    this.setState({
      lift: value || value.length
    });

    if (onBlur) {
      onBlur(id, value);
    }
  }

  render() {
    const {
      inputRef,
      type,
      placeholder
    } = this.props;

    const { 
      lift,
      value
    } = this.state;

    return (
      <label className="labeled-input">
        <span className={`labeled-input__label noselect ${lift ? 'labeled-input__label--lifted' : ''}`.trim()}>
          {placeholder}
        </span>
        <input
          className="labeled-input__input-field"
          type={type}
          ref={inputRef}
          value={value}
          onChange={(e) => this.handleChange(e.target.value)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </label>
    );
  }
}

LabeledInput.propTypes = propTypes;
LabeledInput.defaultProps = defaultProps;
export default LabeledInput;