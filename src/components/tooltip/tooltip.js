import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  element: PropTypes.instanceOf(Element).isRequired,  
  message: PropTypes.string.isRequired,
  position: PropTypes.string
}

const Tooltip = (props) => {
  const {
    element,    
    message,
    position = 'right'
  } = props;
 
  const getPositionStyles = (element, position) => {    
    const { 
      left, 
      top, 
      right, 
      bottom 
    } = element.getBoundingClientRect();

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

  const style = getPositionStyles(element, position);

  return (
    <div className={`tooltip noselect tooltip-${position}`} style={ style }>
      <p className="tooltip__text noselect">{ message }</p>
    </div>
  )
}

Tooltip.propTypes = propTypes;
export default Tooltip;