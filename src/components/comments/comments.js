import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CommentConstructor from '../comment-constructor';
import Comment, { commentPropTypes } from '../comment';

const propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape(commentPropTypes)
  ),
  username: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  comments: []
};

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: props.comments
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(comment) {
    const { comments } = this.state;

    const newComments = comments.slice();
    const commentIndex = newComments.findIndex(item => item.id === comment.id);

    if (commentIndex === -1) throw new Error(`Wrong comment id ${comment.id}`);

    newComments[commentIndex] = comment;

    this.setState({
      comments: newComments
    });

    this.props.onChange(newComments);
  }

  handleCreate(value) {
    const { username } = this.props;
    const { comments } = this.state;

    const maxId = comments.length
      ? Math.max.apply(null, comments.map(comment => comment.id))
      : -1;

    const newComment = {
      id: maxId + 1,
      text: value,
      author: username,
      created: (new Date()).toISOString()
    };

    const newComments = comments.concat(newComment);

    this.setState({
      comments: newComments
    });

    this.props.onChange(newComments);
  }

  handleDelete(id) {
    const { comments } = this.state;
    const newComments = comments.slice();
    newComments.splice(newComments.findIndex(comment => comment.id === id), 1);

    this.setState({
      comments: newComments
    });

    this.props.onChange(newComments);
  }

  render() {
    const { username } = this.props;
    const { comments } = this.state;

    return (
      <div className="comments">
        <ul className="comments__list comments-list">
          {comments.map(comment => (
            <li
              className="comments-list__item comments-list-item"
              key={comment.id}
            >
              <Comment
                {...comment}
                parentClassName="comments-list-item__comment"
                onChange={(value) => this.handleChange({
                  ...comment,
                  text: value,
                  edited: (new Date()).toISOString(),
                  editor: username
                })}
              />
              {username === comment.author && (
                <button
                  className="comments-list-item__delete-button btn btn-inline btn-primary"
                  title="Delete comment"
                  onClick={() => this.handleDelete(comment.id)}
                >
                  <FontAwesomeIcon icon="times" />
                </button>
              )}
            </li>
          ))}
        </ul>
        <CommentConstructor
          parentClassName="comments__constructor"
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

Comments.propTypes = propTypes;
Comments.defaultProps = defaultProps;
export default Comments;