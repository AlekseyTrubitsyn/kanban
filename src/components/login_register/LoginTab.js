import React, { Component } from 'react';

class LoginTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginValue: '',
      passwordValue: '',
      submitAvailable: false,
      showMessage: false,
      message: '',
      elem: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { loginField, passwordField } = this.refs;
    const submitAvailable = loginField.value && passwordField.value;

    if (submitAvailable) {
      this.props.handleSubmit();
    } else {
      const elem = this.refs[!loginField.value ? 'loginField' : 'passwordField'];

      const message = !loginField.value
                      ? 'Login field should not be empty'
                      : 'Password field should not be empty';

      this.props.handleError(elem, message);
    }
  }

  render() {
    const { onClick } = this.props;
    const { loginValue, passwordValue, showMessage, message, elem } = this.state;

    return (
      <div className="login-tab" id="login-tab">
        <input
          ref="loginField"
          type="text"
          data-tip='custom show'
          data-event='click focus loginSubmitError'
          placeholder="any login"
          defaultValue={loginValue}
          onClick={onClick}
        />
        <input
          ref="passwordField"
          type="password"
          placeholder="any password?"
          defaultValue={passwordValue}
          onClick={onClick}
        />
        <button
          className="btn btn-primary login-form__submit"
          onClick={() => this.handleSubmit(loginValue, passwordValue)}
        >Let's start!</button>
      </div>
    )
  }
}

export default LoginTab;
