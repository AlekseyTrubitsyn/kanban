import React, { Component } from 'react';

class LoginTab extends Component {
  constructor(props) {
    super(props);

    const { passwordValue,  loginValue } = props;

    this.state = {
      hideLoginLabel: !!loginValue,
      hidePasswordLabel: !!passwordValue,
      submitAvailable: false,
      showMessage: false,
      message: '',
      elem: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  handleInputFocus(e) {
    const k = e.target.id === 'loginField' ? 'hideLoginLabel' : 'hidePasswordLabel';

    if (this.state.showMessage) {
      this.props.onInputClick();
    }

    this.setState({
      [k]: true,
      showMessage: false
    })
  }

  handleInputBlur(e) {
    const valueIsEmpty =  !e.target.value;

    const k = e.target.id === 'loginField' ? 'hideLoginLabel' : 'hidePasswordLabel';

    this.setState({
      [k]: !valueIsEmpty
    })
  }

  handleSubmit() {
    const { loginField, passwordField } = this.refs;
    const submitAvailable = loginField.value && passwordField.value;

    if (submitAvailable) {
      this.props.handleSubmit(loginField.value, passwordField.value);

    } else {
      let elem;
      let message;

      if (!loginField.value) {
        elem = loginField;
        message = 'Login';
      } else {
        elem = passwordField;
        message = 'Password';
      }

      this.setState({
        showMessage: true
      });

      this.props.handleError(elem, message + ' field should not be empty');
    }
  }

  render() {
    const { onInputClick, loginValue, passwordValue } = this.props;
    const { hideLoginLabel, hidePasswordLabel } = this.state;

    const loginSpanClass = "input-label" + (hideLoginLabel ? " input-label--up" : "");
    const passwordSpanClass =  "input-label" + (hidePasswordLabel ? " input-label--up" : "")

    return (
      <div className="login-tab" id="login-tab">
        <label className="input-container">
          <input
            id="loginField"
            ref="loginField"
            type="text"
            defaultValue={loginValue}
            onClick={onInputClick}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          <span className={loginSpanClass}>Login (any)</span>
        </label>
        <label className="input-container">
          <input
            id="passwordField"
            ref="passwordField"
            type="password"
            defaultValue={passwordValue}
            onClick={onInputClick}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          <span className={passwordSpanClass}>Password (any)</span>
        </label>
        <button
          className="btn btn-primary login-form__submit"
          onClick={this.handleSubmit}
        >Let's start!</button>
      </div>
    )
  }
}

export default LoginTab;
