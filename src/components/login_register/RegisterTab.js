import React, { Component } from 'react';

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideLoginLabel: false,
      hidePasswordLabel: false,
      hideSecondPasswordLabel: false,
      hideEmailLabel: false,
      hidePhoneLabel: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  static getK(fieldId) {
    switch (fieldId) {
      case "loginField":
        return "hideLoginLabel";

      case "passwordField":
        return "hidePasswordLabel";

      case "secondPasswordField":
        return "hideSecondPasswordLabel";

      case "emailField":
        return "hideEmailLabel";

      case "phoneField":
        return "hidePhoneLabel";

      default:
        return null;
    }
  }

  handleInputFocus(e) {
    const k = RegisterTab.getK(e.target.id);
    if (!k) return;

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
    const k = RegisterTab.getK(e.target.id);
    if (!k) return;

    this.setState({
      [k]: !valueIsEmpty
    })
  }

  handleSubmit() {
    const {
      loginField,
      passwordField,
      secondPasswordField,
      emailField,
      phoneField
    } = this.refs;

    const submitAvailable = loginField.value
                            && passwordField.value
                            && secondPasswordField.value
                            && emailField.value
                            && phoneField.value;

    if (submitAvailable) {
      this.props.handleSubmit();
    } else {
      let elem;
      let message;

      if (!loginField.value) {
        elem = loginField;
        message = 'Login';
      } else if (!passwordField.value) {
        elem = passwordField;
        message = 'Password';
      } else if (!secondPasswordField.value) {
        elem = secondPasswordField;
        message = 'Second password';
      } else if (!emailField.value) {
        elem = emailField;
        message = 'Email';
      } else if (!phoneField.value) {
        elem = phoneField;
        message = 'Phone';
      }

      this.setState({
        showMessage: true
      });

      this.props.handleError(elem, message + ' field should not be empty');
    }
  }

  render() {
    const { onInputClick } = this.props;
    const {
      hideLoginLabel,
      hidePasswordLabel,
      hideSecondPasswordLabel,
      hideEmailLabel,
      hidePhoneLabel
     } = this.state;

    const loginSpanClass = "input-label" + (hideLoginLabel ? " input-label--up" : "");
    const passwordSpanClass =  "input-label" + (hidePasswordLabel ? " input-label--up" : "")
    const repeatPasswordSpanClass =  "input-label" + (hideSecondPasswordLabel ? " input-label--up" : "");
    const emailSpanClass =  "input-label" + (hideEmailLabel ? " input-label--up" : "")
    const phoneSpanClass =  "input-label" + (hidePhoneLabel ? " input-label--up" : "")

    //TODO fields validation, set flag to phone field
    return (
      <div className="register-tab" id="register-tab">
        <label className="input-container">
          <input
            id="loginField"
            ref="loginField"
            type="text"
            onClick={onInputClick}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          <span className={loginSpanClass}>Login</span>
        </label>
        <label className="input-container">
          <input
            id="passwordField"
            ref="passwordField"
            type="password"
            onClick={onInputClick}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          <span className={passwordSpanClass}>Password</span>
        </label>
        <label className="input-container">
          <input
            id="secondPasswordField"
            ref="secondPasswordField"
            type="password"
            onClick={onInputClick}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          <span className={repeatPasswordSpanClass}>...and again</span>
        </label>
        <label className="input-container">
          <input
            id="emailField"
            ref="emailField"
            type="text"
            onClick={onInputClick}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          <span className={emailSpanClass}>E-mail</span>
        </label>
        <label className="input-container">
          <input
            id="phoneField"
            ref="phoneField"
            type="text"
            onClick={onInputClick}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          <span className={phoneSpanClass}>Phone</span>
        </label>
        <p>It's just a frontend demo without server, data is not collecting anywhere, so type anything.</p>
        <button
          className="btn btn-primary login-form__submit"
          onClick={this.handleSubmit}
        >Let's start!</button>
      </div>
    )
  }
}

export default RegisterTab;
