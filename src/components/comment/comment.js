import React from 'react'
import PropTypes from 'prop-types'

import { getFormatedDate } from '../../utilities/date';

import EditableText from '../editable-text';

export const commentPropTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  edited: PropTypes.string,
  created: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

const propTypes = {
  ...commentPropTypes,
  parentClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

const defaultProps = {
  parentClassName: '',
  edited: ''
}

const Comment = (props) => {
  const {
    text,
    edited,
    created,
    author,
    editor,
    parentClassName,
    onChange
  } = props;

  const handleChange = (value) => value !== text && onChange(value);

  const dateCreated = getFormatedDate(created);
  const dateEdited = getFormatedDate(edited);

  return (
    <div className={`${parentClassName} comment`.trim()}>
      <p className="comment__created comment-created">
        <strong className="comment-created__author">
          {author}
        </strong>
        <span className="comment-created__date">
          {dateCreated}
        </span>
      </p>
      <EditableText
        parentClassName="comment__text"
        rows={2}
        defaultValue={text}
        onChange={handleChange}
      />
      {edited && (
        <p className="comment__edited">
          {`Edited ${dateEdited} by `}
          <strong className="comment-header__editor">{editor}</strong>
        </p>
      )}
    </div>
  )
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;
export default Comment;
