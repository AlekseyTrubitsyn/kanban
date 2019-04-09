import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as UserSettingsActions from '../actions/UserSettingsActions';
import * as SideMenuActions from '../actions/SideMenuActions';
import * as TicketsActions from '../actions/TicketsActions';

const Header = (props) => {
  const {
    userData,
    logout,
    filters,
    filter,
    showSideMenu,
    createNewItem,
    changeFilter
  } = props;

  const username = userData.firstName
                    ? (userData.firstName + ' ' + userData.secondName.slice(0, 1))
                    : userData.username;

  const filterId = filters.indexOf(filter);
  const filtersContainerClass = "header__filters header__filters--" + (filterId === -1 ? 0 : filterId);
  const filtersClass = "header-filters__item";
  const filtersClassSelected = "header-filters__item header-filters__item--selected";

  return (
    <div className="header">
      <div className="header-left">
        <button
          className="btn btn-primary"
          onClick={showSideMenu}
        >
          <FontAwesomeIcon icon="bars" />
        </button>
        <button
          className="btn btn-primary"
          onClick={() => createNewItem(userData)}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
        <div
          className={filtersContainerClass}
          onClick={(e) => changeFilter(e.target.value)}
        >
          {filters.map(item => (
            <label key={item} className={filter === item ? filtersClassSelected : filtersClass}>
              <input type="radio" name="filter" value={item}/>
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="header-logo">Base board</div>
      <div className="header-right">
        <span className="header__user-name">{username}</span>
        <button className="btn btn-primary header__logout" onClick={logout}>
          <FontAwesomeIcon icon="sign-out-alt" />
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.userSettings.userData,
    filters: state.tickets.filters,
    filter: state.tickets.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(UserSettingsActions, dispatch).logout,
    showSideMenu: bindActionCreators(SideMenuActions, dispatch).showSideMenu,
    changeFilter: bindActionCreators(TicketsActions, dispatch).changeFilter,
    createNewItem: bindActionCreators(TicketsActions, dispatch).createNewItem
  }
}

Header.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    secondName: PropTypes.string
  }),
  filters: PropTypes.array.isRequired,
  filter: PropTypes.string,
  logout: PropTypes.func.isRequired,
  showSideMenu: PropTypes.func.isRequired,
  createNewItem: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
