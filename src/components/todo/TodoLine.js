import React, { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodoLine = ({ item, focused, onTextClick, onItemBlured, onTextChange, onCheckboxChange }) => (
  <div className={"todo-line" + (item.checked ? " todo-line--checked" : "")}>
    {focused ?
      <Fragment>
        <textarea
          className="todo-line__textarea"
          autoFocus
          defaultValue={item.text}
          onBlur={(e) => onTextChange(e.target.value)} />
        <button
          className="btn btn-inline btn-primary todo-line__confirm"
          onClick={onItemBlured}
        >
          <FontAwesomeIcon icon="check"/>
        </button>
      </Fragment>
      :
      <Fragment>
        <label
          className="todo-line__label"
        >
          <span className="hover-icon">
            <FontAwesomeIcon icon={item.checked ? "chevron-left" : "check"}/>
          </span>
          <span className="done-icon">
            <FontAwesomeIcon icon={item.checked ? "check" : "chevron-right"}/>
          </span>
          <input
            className="todo-line__checkbox"
            type="checkbox"
            defaultChecked={item.checked}
            onChange={(e) => onCheckboxChange(e.target.checked)}
          />
        </label>
        <p
          className="todo-line__text"
          onClick={onTextClick}
        >
          {item.text.length > 33
            ? item.text.slice(0, 30) + '...'
            : item.text
          }
        </p>
      </Fragment>
    }
  </div>
);

export default TodoLine;
