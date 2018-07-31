import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as UserSettingsActions from '../actions/UserSettingsActions';

import Loader from '../components/Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginState: true,
      loginValue: 'admin',
      passwordValue: 'admin'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const login = this.refs.login;
    const password = this.refs.password;

    this.props.login(login, password);
  }

  render() {
    const { isFetching } = this.props;
    const { loginValue, passwordValue, isLoginState } = this.state;

    if (isFetching) return <Loader />

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
              className={"login-form__tab" + (isLoginState ? " login-form__tab--selected" : "")}
            >Login</button>
            <button
              className={"login-form__tab" + (isLoginState ? "" : " login-form__tab--selected")}
            >Register</button>
          </div>
          <div className="login-register-container">
            {isLoginState && (
              <Fragment>
                <input
                  ref="login"
                  type="text"
                  placeholder="any login"
                  defaultValue={loginValue}
                />
                <input
                  ref="password"
                  type="password"
                  placeholder="any password?"
                  defaultValue={passwordValue}
                />
                <button
                  className="btn btn-primary login-form__submit"
                  onClick={this.handleSubmit}
                >Let's start!</button>
              </Fragment>
            )}
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
    login: bindActionCreators(UserSettingsActions, dispatch).login
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterForm);
