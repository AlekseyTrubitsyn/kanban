import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as UserSettingsActions from '../actions/UserSettingsActions';
import * as TooltipActions from '../actions/TooltipActions';

import Loader from '../components/Loader';
import LoginTab from '../components/login_register/LoginTab';
import RegisterTab from '../components/login_register/RegisterTab';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginState: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleTabClick(isLoginState) {
    this.setState({
      isLoginState
    });

    this.props.hideTooltip();
  }

  handleSubmit(login, password) {
    this.showMessage = false;
    this.props.hideTooltip();
    this.props.login(login, password);
  }

  handleError(elem, message) {
    this.showMessage = true;
    this.props.showTooltip({elem, message})
  }

  handleClick() {
    if (this.showMessage) {
      this.showMessage = false;
      this.props.hideTooltip();
    }
  }

  render() {
    const { isFetching } = this.props;
    const { isLoginState } = this.state;

    const loginButtonClass = "login-form__tab" + (isLoginState ? " login-form__tab--selected" : "");
    const registerButtonClass = "login-form__tab" + (!isLoginState ? " login-form__tab--selected" : "");

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
              className={loginButtonClass}
              onClick={() => this.handleTabClick(true)}
            >Login</button>
            <button
              className={registerButtonClass}
              onClick={() => this.handleTabClick(false)}
            >Register</button>
          </div>
          <div className="login-register-container" id="loginRegisterContainer" ref="loginRegisterContainer">
            {isLoginState
              ? <LoginTab
                  onInputClick={this.handleClick}
                  handleSubmit={this.handleSubmit}
                  handleError={this.handleError}
                  loginValue="admin"
                  passwordValue="1234"
                />
              : <RegisterTab
                  onInputClick={this.handleClick}
                  handleSubmit={this.handleSubmit}
                  handleError={this.handleError}
                />
            }
          </div>
        </div>
      </Fragment>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isFetching: state.userSettings.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(UserSettingsActions, dispatch).login,
    showTooltip: bindActionCreators(TooltipActions, dispatch).showTooltip,
    hideTooltip: bindActionCreators(TooltipActions, dispatch).hideTooltip,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterForm);
