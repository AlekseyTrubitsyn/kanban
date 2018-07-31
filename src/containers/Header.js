import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as UserSettingsActions from '../actions/UserSettingsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  render() {
    const { userData, logout } = this.props;
    const userName = userData.firstName + ' ' + userData.secondName.slice(0, 1);

    return (
      <div className="header">
        <div className="header-left">
          <button className="btn btn-primary">Boards</button>
          <input className="header__search" type="text" placeholder="Search"/>
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
}

function mapStateToProps(state) {
  return {
    userData: state.userSettings.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(UserSettingsActions, dispatch).logout
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
