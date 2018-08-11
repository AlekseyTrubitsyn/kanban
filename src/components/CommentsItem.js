import React, { Fragment } from "react";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentsItem = (props) => {
  const { item, focused, onTextClick, onItemBlured, onTextChange, onDeleteClick } = props;

  return (
    <div className={"comments-item" + (focused ? " comments-item--focused" : "")}>
      {focused ?
        <Fragment>
          <textarea
            className="comments__textarea"
            autoFocus
            defaultValue={item.text}
            onBlur={(e) => onTextChange(e.target.value)}
          />
          <button
            className="btn btn-inline btn-primary comments__confirm"
            onClick={onItemBlured}
          >
            <FontAwesomeIcon icon="check"/>
          </button>
        </Fragment>
        :
        <Fragment>
          <p className="comments-item__date">
            {item.edited
              ? "edited: " + moment(item.edited).format('LLL')
              : moment(item.created).format('LLL')
            }
          </p>
          <p
            className="comments__text"
            onClick={onTextClick}
          >
            {item.text}
          </p>
          <p className="comments-item__author">
            <span> - {item.author || "anon"}</span>
          </p>
          <div className="comment-item__buttons">
            <button
              className="btn btn-inline btn-primary comments__edit-button"
              onClick={onTextClick}
            >
              <FontAwesomeIcon icon="pen"/>
            </button>
            <button
              className="btn btn-inline btn-primary comments__confirm"
              onClick={onDeleteClick}
            >
              <FontAwesomeIcon icon="times"/>
            </button>
          </div>
        </Fragment>
      }
    </div>
  );
}

export default CommentsItem;
