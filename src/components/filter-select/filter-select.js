import React from 'react';
import PropTypes from 'prop-types';

export const propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterId: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
}

const FilterSelect = (props) => {
  const {
    filters,
    filterId,
    onSelect
  } = props;

  return (
    <div 
      className="filter-select"
      style={{ 
        '--filters-count': `${filters.length}`,
        '--filter-id': `${filterId}`
      }}
    >
      {filters.map((filter, index) => {
        const checked = filterId === index;

        return (
          <label
            key={filter}
            className={`filter-select__item ${checked ? 'filter-selector__item--selected' : ''}`.trim()}
            onClick={() => onSelect({ filterId: index, filter })}
          >
            <input
              className="filter-select__input"
              type="radio"
              name="filter"
              value={filter}
              checked={checked}
            />
            <span className="filter-select__fitler-name">
              {filter}
            </span>
          </label>
        )
      })}
    </div>
  )
}

FilterSelect.propTypes = propTypes;
export default FilterSelect;