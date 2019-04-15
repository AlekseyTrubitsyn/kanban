import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as UserSettingsActions from '../actions/UserSettingsActions';
import * as SideMenuActions from '../actions/SideMenuActions';
import * as TicketsActions from '../actions/TicketsActions';

import Header from '../components/header';

const propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    secondName: PropTypes.string
  }).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
  showSideMenu: PropTypes.func.isRequired,
  createNewTicket: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filterId: PropTypes.number
}

const defaultProps = {
  filterId: 0,
}

const HeaderContainer = (props) => {
  const {
    userData,
    logout,
    filterId,
    filters,
    showSideMenu,
    createNewTicket,
    changeFilter
  } = props;

  const {
    username,
    firstName,
    secondName
  } = userData;

  const user = (firstName && secondName)
    ? `${firstName} ${secondName.slice(0, 1)}`
    : username;

  return (
    <Header
      user={user}
      filters={filters}
      filterId={filterId}
      onShowSideMenu={showSideMenu}
      onCreateNewTicket={() => createNewTicket(userData)}
      onLogout={logout}
      onSelectFilter={changeFilter}
    />
  );
}

function mapStateToProps(state) {
  const {
    filter,
    filterId,
    filters
  } = state.tickets;

  return {
    userData: state.userSettings.userData,
    filter,
    filterId,
    filters
  }
}

function mapDispatchToProps(dispatch) {
  const {
    changeFilter,
    createNewTicket
  } = bindActionCreators(TicketsActions, dispatch);

  return {
    logout: bindActionCreators(UserSettingsActions, dispatch).logout,
    showSideMenu: bindActionCreators(SideMenuActions, dispatch).showSideMenu,
    changeFilter,
    createNewTicket,
  }
}

HeaderContainer.propTypes = propTypes;
HeaderContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
