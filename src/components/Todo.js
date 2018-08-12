import React, { Component } from "react";
import PropTypes from 'prop-types';

import TodoLine from './todo/TodoLine';
import TodoCreate from './todo/TodoCreate';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedId: -1
    }

    this.handleTextClick = this.handleTextClick.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleItemChange(key, index, value) {
    const { items, onItemsUpdate } = this.props;

    switch (key) {
      case 'text':
        onItemsUpdate([
          ...items.slice(0, index),
          {
            ...items[index],
            text: value
          },
          ...items.slice(index + 1)
        ]);

        this.setState({
          focusedId: -1
        })
        break;

      case 'checkbox':
        onItemsUpdate([
          ...items.slice(0, index),
          { ...items[index], checked: value },
          ...items.slice(index + 1)
        ]);

        this.setState({
          focusedId: -1
        })

        break;
      default:
        console.log('wrong key "${key}"');
    }
  }

  handleCreate(value) {
    const { items, onUpdate } = this.props;

    onUpdate([
      ...items,
      {
        text: value,
        checked: false
      }
    ])
  }

  handleTextClick(id) {
    this.setState({
      focusedId: id
    })
  }

  render() {
    const { items } = this.props;
    const { focusedId } = this.state;

    return (
      <div className="todo-list">
        {items.map((item, index) => (
          <TodoLine
            key={index}
            item={item}
            focused={index === focusedId}
            onTextClick={() => this.handleTextClick(index)}
            onItemBlured={() => this.handleTextClick(-1)}
            onTextChange={(v) => this.handleItemChange('text', index, v)}
            onCheckboxChange={(v) => this.handleItemChange('checkbox', index, v)}
          />
        ))}
        <TodoCreate
          placeholder="Split your task into a few smaller tasks"
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

Todo.propTypes = {
  items: PropTypes.array.isRequired,
  onItemsUpdate: PropTypes.func.isRequired
}

export default Todo;
