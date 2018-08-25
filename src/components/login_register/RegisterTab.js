import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideLoginLabel: false,
      hidePasswordLabel: false,
      hideSecondPasswordLabel: false,
      agreed: false
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

  handleUserAgreed(agreed) {
    this.setState({
      agreed
    });
  }

  handleSubmit() {
    const {
      loginField,
      passwordField,
      secondPasswordField,
      termsAgreementCheckbox
    } = this.refs;

    const { agreed } = this.state;

    const submitAvailable = loginField.value
                            && passwordField.value
                            && secondPasswordField.value
                            && agreed
                            && passwordField.value === secondPasswordField.value;

    if (submitAvailable) {
      this.props.handleSubmit(loginField.value, passwordField.value);

    } else {
      let elem;
      let message;

      if (!loginField.value) {
        elem = loginField;
        message = 'Login should not be empty';

      } else if (!passwordField.value) {
        elem = passwordField;
        message = 'Password should not be empty';

      } else if (!secondPasswordField.value) {
        elem = secondPasswordField;
        message = 'Second password should not be empty';

      } else if (passwordField.value !== secondPasswordField.value) {
        elem = secondPasswordField;
        message = 'Password does not match the confirm password';

      } else {
        elem = termsAgreementCheckbox;
        message = 'Agree, please :)';
      }

      this.setState({
        showMessage: true
      });

      this.props.handleError(elem, message);
    }
  }

  render() {
    const { onInputClick } = this.props;
    const {
      hideLoginLabel,
      hidePasswordLabel,
      hideSecondPasswordLabel,
      agreed
     } = this.state;

    const loginSpanClass = "input-label" + (hideLoginLabel ? " input-label--up" : "");
    const passwordSpanClass =  "input-label" + (hidePasswordLabel ? " input-label--up" : "")
    const repeatPasswordSpanClass =  "input-label" + (hideSecondPasswordLabel ? " input-label--up" : "");

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
        <p className="form-text-label">
          <span className="form-text-label__aside">
            <FontAwesomeIcon icon="exclamation-circle"/>
          </span>
          <span>It's just a frontend demo without server, data is not collecting anywhere but your browser's storage... So type anything!</span></p>
        <label className="checkbox-container" ref="termsAgreementCheckbox">
          <span className="checkbox-container__aside">
            <FontAwesomeIcon icon={agreed ? "check" : ["far", "square"]}/>
          </span>
          <span> Agree</span>
          <input
            type="checkbox"
            value={agreed}
            onClick={(e) => this.handleUserAgreed(e.target.checked)}/>
        </label>
        <button
          className="btn btn-primary login-form__submit"
          onClick={this.handleSubmit}
        >Let's start!</button>
      </div>
    )
  }
}

export default RegisterTab;
