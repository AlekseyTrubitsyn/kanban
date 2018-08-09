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
        <p
          className="todo-line__text"
          onClick={onTextClick}
        >
          {item.text.length > 30
            ? item.text.slice(0, 25) + '...'
            : item.text
          }
        </p>
        <label
          className="btn btn-inline todo-line__label"
        >
          {item.checked && <FontAwesomeIcon icon="check"/>}
          <input
            className="todo-line__checkbox"
            type="checkbox"
            defaultChecked={item.checked}
            onChange={(e) => onCheckboxChange(e.target.checked)} />
        </label>
      </Fragment>
    }
  </div>
);

export default TodoLine;
