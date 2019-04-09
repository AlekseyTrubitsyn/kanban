import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FilterSelect, { filterSelectPropTypes } from '../filter-select';

const propTypes = {
  ...filterSelectPropTypes,
  user: PropTypes.string.isRequired,
  onShowSideMenu: PropTypes.func.isRequired,
  onCreateNewItem: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSelectFilter: PropTypes.func.isRequired
};

const Header = (props) => {  
  const {
    user,
    filters,
    filterId,
    onShowSideMenu,
    onCreateNewItem,
    onLogout,
    onSelectFilter
  } = props;

  return (
    <div className="header">
      <div className="header__left">
        <button
          className="header__sidebar-button btn btn-primary"
          title="Open side menu"
          onClick={onShowSideMenu}
        >
          <FontAwesomeIcon icon="bars" />
        </button>
        <button
          className="header__create-ticket-button btn btn-primary"
          title="Create a new task"
          onClick={onCreateNewItem}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
        <FilterSelect
          parentClassName="header__filters"
          filters={filters}
          filterId={filterId}
          onSelect={onSelectFilter}
        />
      </div>
      <div className="header__title">
        {'Base board'}
      </div>
      <div className="header__user">
        <span className="header__user-name">
          {user}
        </span>
        <button 
          className="header__logout-button btn btn-primary"
          title="Logout"
          onClick={onLogout}
        >
          <FontAwesomeIcon icon="sign-out-alt" />          
        </button>
      </div>
    </div>
  );
};

Header.propTypes = propTypes;
export default Header;