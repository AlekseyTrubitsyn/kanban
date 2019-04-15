import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  parentClassName: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  strikeout: PropTypes.bool,
  modifier: PropTypes.func,
  onChange: PropTypes.func.isRequired,
}

const defaultProps = {
  parentClassName: '',
  defaultValue: '',
  placeholder: '',
  rows: 1,
  strikeout: false,
  modifier: null
}

class EditableText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
      editable: !props.defaultValue.length
    }

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp(e) {
    if (e.keyCode !== 27) return;

    this.setState({
      value: this.props.defaultValue,
      editable: false
    });
  }

  handleChange(value) {
    const { modifier } = this.props;

    let modifiedValue = modifier ? modifier(value) : value;

    this.setState({
      value: modifiedValue
    });
  }

  handleFocus() {
    this.setState({
      editable: true
    });

    document.addEventListener('keyup', this.handleKeyUp)
  }

  handleBlur() {
    const { onChange } = this.props;
    const { value } = this.state;

    document.removeEventListener('keyup', this.handleKeyUp);

    this.setState({
      editable: !value.length
    })

    onChange(value);
  }

  render() {
    const {
      parentClassName,
      placeholder,
      rows,
      strikeout
    } = this.props;

    const {
      editable,
      value
    } = this.state;

    if (!editable) {
      return (
        <label
          className={`editable-text ${parentClassName}`.trim()}
          onClick={this.handleFocus}
        >
          <span
            className={
              `editable-text__text ${strikeout ? 'editable-text__text--strikeout' : ''}`.trim()
            }
          >
            {value}
          </span>
        </label>
      );
    }

    return (
      <label className={`editable-text ${parentClassName}`.trim()}>
        {rows > 1
          ? (
            <textarea
              className="editable-text__input"
              placeholder={placeholder}
              value={value}
              onChange={(e) => this.handleChange(e.target.value)}
              onBlur={this.handleBlur}
              rows={rows}
            />
          ) : (
            <input
              className="editable-text__input"
              placeholder={placeholder}
              value={value}
              onChange={(e) => this.handleChange(e.target.value)}
              onBlur={this.handleBlur}
            />
          )
        }
      </label>
    )
  }
}

EditableText.propTypes = propTypes;
EditableText.defaultProps = defaultProps;
export default EditableText;