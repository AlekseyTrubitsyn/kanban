import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TodoCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }

  handleTyping(text) {
    this.setState({
      text
    })
  }

  handleSubmit() {
    this.props.onCreate(this.state.text);

    this.setState({
      text: ''
    });
  }

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <div className="todo-create">
        <textarea
          value={text}
          onChange={(e) => this.handleTyping(e.target.value)}
          className="todo-create__textarea"
          rows="3"
          placeholder={placeholder}
        />
        <button
          className={"btn btn-inline btn-primary" + (!text.length ? " disabled" : "")}
          onClick={this.handleSubmit}
          disabled={!text.length}
        >
          <FontAwesomeIcon icon="plus"/>
        </button>
      </div>
    )
  }
}

export default TodoCreate;
