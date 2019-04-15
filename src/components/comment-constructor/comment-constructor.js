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

class CommentConstructor extends Component {
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

    this.props.onCreate(value);
  }

  render() {
    const { parentClassName } = this.props;

    const {
      value,
      enabled
    } = this.state;

    return (
      <div className={`${parentClassName} comment-constructor`.trim()}>
        <textarea
          className="comment-constructor__input"
          placeholder="Type your comment here"
          value={value}
          onChange={(e) => this.handleChange(e.target.value)}
          rows={2}
        />
        <button
          className={`comment-constructor__submit btn btn-inline btn-primary ${enabled ? '' : 'disabled'}`.trim()}
          title={`${enabled ? 'Create comment' : 'Type some text to create a new comment'}`}
          onClick={this.handleSubmit}
          disabled={!enabled}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    )
  }
}

CommentConstructor.propTypes = propTypes;
CommentConstructor.defaultProps = defaultProps;
export default CommentConstructor;