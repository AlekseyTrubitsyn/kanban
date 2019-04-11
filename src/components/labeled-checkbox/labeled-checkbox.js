import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  parentClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  onChange: PropTypes.func,
  labelText: PropTypes.string
}

const defaultProps = {
  parentClassName: '',
  onChange: null
}

const LabeledCheckbox = (props) => {
  const {
    parentClassName,
    id,
    containerRef,
    inputRef,
    onChange,
    labelText,
  } = props;

  return (
    <label
      className={`${parentClassName} labeled-checkbox`}
      ref={containerRef}
    >
      <input
        className="labeled-checkbox__checkbox checkbox"
        id={id}
        ref={inputRef}
        type="checkbox"
        onChange={(e) => onChange({ id, value: e.target.checked })}
      />
      <span className="labeled-checkbox__icon checkbox-icon checkbox-icon--checked">
        <FontAwesomeIcon icon="check" />
      </span>
      <span className="labeled-checkbox__icon checkbox-icon checkbox-icon--unchecked">
        <FontAwesomeIcon icon={["far", "square"]} />
      </span>
      <span className="labeled-checkbox__text noselect">
        {labelText}
      </span>
    </label>
  )
}

LabeledCheckbox.propTypes = propTypes;
LabeledCheckbox.defaultProps = defaultProps;
export default LabeledCheckbox;