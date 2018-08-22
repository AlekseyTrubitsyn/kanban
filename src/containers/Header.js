import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as UserSettingsActions from '../actions/UserSettingsActions';
import * as SideMenuActions from '../actions/SideMenuActions';
import * as TicketsActions from '../actions/TicketsActions';

const Header = (props) => {
  const { userData, logout, showSideMenu, createNewItem } = props;
  const userName = userData.firstName + ' ' + userData.secondName.slice(0, 1);

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
        {/* <input className="header__search" type="text" placeholder="Search"/> */}
      </div>
      <div className="header-logo">Base board</div>
      <div className="header-right">
        <span className="header__user-name">{userName}</span>
        <button className="btn btn-primary header__logout" onClick={logout}>
          <FontAwesomeIcon icon="sign-out-alt" />
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.userSettings.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(UserSettingsActions, dispatch).logout,
    showSideMenu: bindActionCreators(SideMenuActions, dispatch).showSideMenu,
    createNewItem: bindActionCreators(TicketsActions, dispatch).createNewItem
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
