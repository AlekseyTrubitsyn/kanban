import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as UserActions from '../actions/UserActions';

import Loader from '../components/Loader';

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginState: true,
      loginValue: 'admin',
      passwordValue: 'admin'
    }
  }

  handleSubmit() {
    const login = this.refs.login;
    const password = this.refs.password;

    this.props.login(login, password);
  }

  render() {
    const { login, isFetching } = this.props;
    const { loginValue, passwordValue, isLoginState } = this.state;

    if (isFetching) return <Loader />

    return (
      <div className="login-form">
        <div className="login-form__tabs">
          <button
            className="login-form__tab login-form__tab--selected"
          >Login</button>
          <button className="login-form__tab">Register</button>
        </div>
        <div className="login-register-container">
          {isLoginState && (
            <Fragment>
              <input
                type="text"
                placeholder="any login"
                defaultValue={loginValue}
              />
              <input
                type="password"
                placeholder="any password"
                defaultValue={passwordValue}
              />
              <button
                className="btn btn-primary login-form__submit"
                onClick={() => login('admin', '123')}
              >Let's start!</button>
            </Fragment>
          )}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isFetching: state.user.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(UserActions, dispatch).login
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterForm);
