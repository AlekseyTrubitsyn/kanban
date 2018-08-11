
import React, { Component } from "react";

import CommentsItem from './CommentsItem';
import CommentsCreate from './CommentsCreate';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items || []
    }

    this.handleTextClick = this.handleTextClick.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleItemChange(key, index, value) {
    const { items } = this.state;
    const newItem = {
      ...items[index],
      text: value,
      edited: new Date()
    }

    this.setState({
      items: [
        ...items.slice(0, index),
        newItem,
        ...items.slice(index + 1)
      ],
      focusedId: -1
    })
  }

  handleCreate(value) {
    this.setState({
      items: [
        ...this.state.items,
        {
          author: 'anon',
          text: value,
          created: new Date()
        }
      ]
    });
  }

  handleDelete(index) {
    const { items } = this.state;

    this.setState({
      items: [
        ...items.slice(0, index),
        ...items.slice(index + 1)
      ],
      focusedId: -1
    });
  }

  handleTextClick(id) {
    this.setState({
      focusedId: id
    })
  }

  render() {
    const { items, focusedId } = this.state;

    return (
      <div className="comments">
        {items.map((item, index) => (
          <CommentsItem
            key={index}
            item={item}
            focused={index === focusedId}
            onTextClick={() => this.handleTextClick(index)}
            onItemBlured={() => this.handleTextClick(-1)}
            onTextChange={(v) => this.handleItemChange('text', index, v)}
            onDeleteClick={() => this.handleDelete(index)}
          />
        ))}
        <CommentsCreate
          placeholder="Type your comment here"
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

export default Comments;
