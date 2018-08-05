import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PrioritySelector = ({ value, onChange }) => {
  const cn = "priority-selector__star";

  return (
    <div className="priority-selector">
      {Array.from(new Array(3)).map((item, index) =>
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          className={cn + (index + 1 <= value ? ` ${cn}--selected` : "")}
        >
          <FontAwesomeIcon icon="star"/>
        </button>
      )}
    </div>
  )
}

export default PrioritySelector;
