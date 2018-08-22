import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Tooltip = (props) => {
  const {elem, message, type, position} = props;

  const style = getPositionStyles(elem, position);
  const className = `tooltip ${type} tooltip-${position} noselect`;

  return (
    <div className={className} style={style}>
      <p className="tooltip__text">{message}</p>
    </div>
  )
}

function getPositionStyles(elem, position) {
  const { left, top, right, bottom } = elem.getBoundingClientRect();
  const xMiddle = (left + right) / 2;
  const yMiddle = (top + bottom) / 2;
  const margin = 10;

  switch (position) {
    case 'top':
      return {
        left: xMiddle,
        bottom: top + margin
      };
    case 'right':
      return {
        left: right + margin,
        top: yMiddle,
        transform: 'translateY(-50%)'
      };
    case 'bottom':
      return {
        left: xMiddle,
        top: bottom + margin
      };
    case 'left':
      return {
        right: left - margin,
        top: yMiddle
      };
    default:
      return {
        left: '100px',
        top: '100px'
      };

  }
}

Tooltip.propTypes = {
  elem: PropTypes.object,
  message: PropTypes.string,
  type: PropTypes.string,
  position: PropTypes.string
}

Tooltip.defaultProps = {
  message: '',
  type: 'info',
  position: 'right'
}

function mapStateToProps(state) {
  return {
    show: state.tooltip.show,
    message: state.tooltip.message,
    elem: state.tooltip.elem,
  }
}

export default connect(mapStateToProps)(Tooltip);
