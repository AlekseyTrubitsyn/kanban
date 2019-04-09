import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  parentClassName: PropTypes.string,
  text: PropTypes.string.isRequired
}

const defaultProps = {
  parentClassName: ''
}

const TextLabel = (props) => {
  const {
    parentClassName,
    text
  } = props;

  // TODO get type from props
  const type = 'exclamation';

  return (
    <p className={`${parentClassName} text-label text-label--${type}`.trim()}>
      <span className="text-label__icon">
        <FontAwesomeIcon icon={`${type}-circle`} />
      </span>
      <span className="text-label__text">
        {text}
      </span>
    </p>
  )
}

TextLabel.propTypes = propTypes;
TextLabel.defaultProps = defaultProps;
export default TextLabel;