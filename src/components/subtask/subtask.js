import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EditableText from '../editable-text';

export const subtaskPropTypes = {
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const propTypes = {
  ...subtaskPropTypes,
  parentClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  parentClassName: ''
};

const Subtask = (props) => {
  const {
    parentClassName,
    id,
    done,
    text,
    onChange
  } = props;

  return (
    <div className={`${parentClassName} ${done ? 'subtask--done' : ''} subtask`.trim()}>
      <label className="subtask__checkbox subtask-checkbox">
        <input
          className="subtask-checkbox__input checkbox"
          type="checkbox"
          defaultChecked={done}
          onChange={(e) => onChange({ id, text, done: e.target.checked })}
        />
        <span className="subtask-checkbox__icon checkbox-icon checkbox-icon--checked">
          <FontAwesomeIcon icon="check" />
        </span>
        <span className="subtask-checkbox__icon checkbox-icon checkbox-icon--unchecked">
          <FontAwesomeIcon icon={["far", "square"]} />
        </span>
      </label>
      <EditableText
        parentClassName="subtask__text"
        rows={2}
        defaultValue={text}
        strikeout={done}
        onChange={(value) => onChange({ id, text: value, done })}
      />
    </div>
  )
}

Subtask.propTypes = propTypes;
Subtask.defaultProps = defaultProps;
export default Subtask;
