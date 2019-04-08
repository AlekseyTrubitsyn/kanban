import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginTab from '../login_register/LoginTab';
import RegisterTab from '../login_register/RegisterTab';

const propTypes = {
  defaultLogin: PropTypes.string,
  defaultPassword: PropTypes.string,
  onLoginSubmit: PropTypes.func.isRequired,
  onRegisterSubmit: PropTypes.func.isRequired,
  onShowTooltips: PropTypes.func.isRequired,
  onHideTooltips: PropTypes.func.isRequired,
};

const defaultProps = {
  defaultLogin: "admin",
  defaultPassword: "1234"
}

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginTab: true
    }

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(isLoginTab) {
    this.setState({
      isLoginTab
    });
  }

  render() {
    const {
      defaultLogin,
      defaultPassword,
      onLoginSubmit,
      onRegisterSubmit,
      onShowTooltips,
      onHideTooltips
    } = this.props;

    const { isLoginTab } = this.state;

    return (
      <div className="login-register-form">
        <div className="login-register-form__tabs login-register-form-tabs">
          <button
            className={
              'login-register-form-tabs__button ' +
              (isLoginTab ? 'login-register-form-tabs__button--selected' : '')
            }
            onClick={() => this.handleTabClick(true)}
          >
            {'Login'}
          </button>
          <button
            className={
              'login-register-form-tabs__button ' +
              (isLoginTab ? '' : 'login-register-form-tabs__button--selected')
            }
            onClick={() => this.handleTabClick(false)}
          >
            {'Register'}
          </button>
        </div>
        <div className="login-register-form__content">
          {isLoginTab ? (
            <LoginTab
              onShowTooltips={onShowTooltips}
              onHideTooltips={onHideTooltips}
              onSubmit={({ login, password }) => onLoginSubmit(login, password)}
              defaultLogin={defaultLogin}
              defaultPassword={defaultPassword}
            />
          ) : (
            <RegisterTab
              onShowTooltips={onShowTooltips}
              onHideTooltips={onHideTooltips}
              onSubmit={({ login, password }) => onRegisterSubmit(login, password)}
            />
          )}
        </div>
      </div>
    )
  }
}

LoginRegisterForm.propTypes = propTypes;
LoginRegisterForm.defaultProps = defaultProps;
export default LoginRegisterForm;