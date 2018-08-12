import React, { Component } from "react";
import PropTypes from 'prop-types';

import CommentsItem from './comments/CommentsItem';
import CommentsCreate from './comments/CommentsCreate';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedId: -1
    }

    this.handleTextClick = this.handleTextClick.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleItemChange(key, index, value) {
    const { items, onItemsUpdate } = this.props;

    onItemsUpdate([
      ...items.slice(0, index),
      {
        ...items[index],
        text: value,
        edited: new Date()
      },
      ...items.slice(index + 1)
    ])
  }

  handleCreate(value) {
    const { items, onItemsUpdate } = this.props;

    onItemsUpdate([
      ...items,
      {
        author: 'anon',
        text: value,
        created: new Date()
      }
    ]);
  }

  handleDelete(index) {
    const { items, onItemsUpdate } = this.props;

    onItemsUpdate([
      ...items.slice(0, index),
      ...items.slice(index + 1)
    ]);
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

Comments.propTypes = {
  items: PropTypes.array.isRequired,
  onItemsUpdate: PropTypes.func.isRequired
}

export default Comments;
