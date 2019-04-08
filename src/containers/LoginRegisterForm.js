import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as UserSettingsActions from '../actions/UserSettingsActions';
import * as TooltipsActions from '../actions/TooltipsActions';

import Loader from '../components/Loader';
import LoginTab from '../components/login_register/LoginTab';
import RegisterTab from '../components/login_register/RegisterTab';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginTab: true
    }

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
    this.hideTooltips = this.hideTooltips.bind(this);
  }

  handleTabClick(isLoginTab) {
    this.setState({
      isLoginTab
    });

    this.props.hideTooltips();
  }

  handleLoginSubmit(data) {
    this.props.login(data.login, data.password);
  }

  handleRegSubmit(data) {
    this.props.register(data.login, data.password);
  }

  hideTooltips = () => {
    if (!this.props.tooltipsCount) return;

    this.props.hideTooltips();
  }

  render() {
    const { 
      isFetching,
      showTooltips
    } = this.props;
    
    const { isLoginTab } = this.state;

    if (isFetching) return <Loader />;

    return (
      <Fragment>
        <div className="login-form__icons">
          <FontAwesomeIcon icon={["fab", "react"]} />
          <FontAwesomeIcon icon={["fab", "react"]} />
          <FontAwesomeIcon icon={["fab", "react"]} />
        </div>
        <div className="login-form">
          <div className="login-form__tabs">
            <button
              className={`login-form__tab ${isLoginTab ? 'login-form__tab--selected' : ''}`.trim()}
              onClick={() => this.handleTabClick(true)}
            >Login</button>
            <button
              className={`login-form__tab ${isLoginTab ? '' : 'login-form__tab--selected'}`.trim()}
              onClick={() => this.handleTabClick(false)}
            >Register</button>
          </div>
          <div className="login-register-container" id="loginRegisterContainer" ref="loginRegisterContainer">
            {isLoginTab ? (
              <LoginTab
                showTooltips={showTooltips}
                hideTooltips={this.hideTooltips}
                onSubmit={this.handleLoginSubmit}
                defaultLogin="admin"
                defaultPassword="1234"
              />
            ) : (
              <RegisterTab
                showTooltips={showTooltips}
                hideTooltips={this.hideTooltips}
                onSubmit={this.handleRegSubmit}
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isFetching: state.userSettings.isFetching,
    tooltipsCount: state.tooltips.count
  }
}

const mapDispatchToProps = (dispatch) => {
  const bindedUserSettingsActions = bindActionCreators(UserSettingsActions, dispatch);
  const bindedTooltipActions = bindActionCreators(TooltipsActions, dispatch);

  return {
    login: bindedUserSettingsActions.login,
    register: bindedUserSettingsActions.register,
    showTooltips: bindedTooltipActions.showTooltips,
    hideTooltips: bindedTooltipActions.hideTooltips,
  }
}

LoginRegisterForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  showTooltips: PropTypes.func.isRequired,
  hideTooltips: PropTypes.func.isRequired,
  tooltipsCount: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterForm);
