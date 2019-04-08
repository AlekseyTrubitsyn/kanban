import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LabeledInput from '../labeled-input';

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    //TODO stateless component
    this.state = {
      agreed: false
    }

    this.invalidFieldsIds = [];

    this.loginFieldRef = React.createRef();
    this.passwordFieldRef = React.createRef();
    this.secondPasswordFieldRef = React.createRef();
    this.termsAgreementRef = React.createRef();
    this.termsAgreementCheckboxRef = React.createRef();

    this.fields = {
      loginField: {
        ref: this.loginFieldRef,
        errorMessage: 'Login field should not be empty',
        modifier: value => value.replace(/[^a-zA-Z0-9]/gi, ''),
        check: () => !!this.loginFieldRef.current.value.length,
        getValueToSubmit: () => ({ 
          login: this.loginFieldRef.current.value || '',
        })
      },
      passwordField: {
        ref: this.passwordFieldRef,
        errorMessage: 'Password must be at least 4 symbol',
        check: () => this.passwordFieldRef.current.value.length > 3,
        getValueToSubmit: () => ({
          login: this.passwordFieldRef.current.value || '',
        })
      },
      secondPasswordField: {
        ref: this.secondPasswordFieldRef,
        errorMessage: 'Passwords must match',
        check: () => this.secondPasswordFieldRef.current.value.length > 3
          && this.passwordFieldRef.current.value === this.secondPasswordFieldRef.current.value
      },
      termsAgreementCheckbox: {
        ref: this.termsAgreementRef,
        element: this.termsAgreementRef.current,
        errorMessage: 'Agree, please :)',
        check: () => this.termsAgreementCheckboxRef.current.checked
      }
    }

    this.getInvalidFields = this.getInvalidFields.bind(this);
    this.updateTooltips = this.updateTooltips.bind(this);
    
    this.handleInputChange = this.handleInputChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInvalidFields() {
    let invalidFieldsIds = Object.keys(this.fields).filter(fieldId => {
      let field = this.fields[fieldId];

      return (field.element || field.ref.current) && !field.check();
    });

    this.invalidFieldsIds = invalidFieldsIds.reduce((result, item) => ({ ...result, [item]: true }), {});

    return invalidFieldsIds.map(fieldId => this.fields[fieldId]);
  }

  updateTooltips(invalidFields = []) {
    if (!invalidFields.length) {
      this.props.hideTooltips();

      return;
    }

    let tooltips = invalidFields.map(item => ({
      element: item.ref.current,
      message: item.errorMessage
    }));

    this.props.showTooltips(tooltips);
  }

  handleInputChange(id, value) {
    if (!(value || value.length) || !this.invalidFieldsIds[id]) return;

    let invalidFields = this.getInvalidFields();

    this.updateTooltips(invalidFields);
  }

  handleUserAgreed(agreed) {
    const invalidFields = this.getInvalidFields();
    this.updateTooltips(invalidFields);

    this.setState({
      agreed
    });    
  }

  handleSubmit() {
    let invalidFields = this.getInvalidFields();

    this.updateTooltips(invalidFields);

    if (invalidFields.length) return;
    
    let valuesToSubmit = Object.keys(this.fields).reduce((result, fieldId) => {
      let field = this.fields[fieldId];

      if (!field.hasOwnProperty('getValueToSubmit')) return result;
      
      return Object.assign(result, field.getValueToSubmit())
    }, {});
    
    this.props.onSubmit(valuesToSubmit);
  }

  render() {
    const {
      agreed
    } = this.state;

    return (
      <div className="register-tab" id="register-tab">
        <LabeledInput
          id="loginField"
          type="text"
          placeholder="Login"
          inputRef={this.loginFieldRef}
          modifier={this.fields.loginField.modifier}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />
        <LabeledInput
          id="passwordField"
          type="password"
          placeholder="Password"
          inputRef={this.passwordFieldRef}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />
        <LabeledInput
          id="secondPasswordField"
          type="password"
          placeholder="...and again"
          inputRef={this.secondPasswordFieldRef}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />
        <p className="form-text-label">
          <span className="form-text-label__aside">
            <FontAwesomeIcon icon="exclamation-circle" />
          </span>
          <span>It's just a frontend demo without server, data is not collecting anywhere but your browser's storage... So type anything!</span></p>
        <label className="checkbox-container" ref={this.termsAgreementRef}>
          <span className="checkbox-container__aside">
            <FontAwesomeIcon icon={agreed ? "check" : ["far", "square"]} />
          </span>
          <span>
            {'Agree'}
          </span>
          <input
            id="termsAgreementCheckbox"
            ref={this.termsAgreementCheckboxRef}
            type="checkbox"
            onChange={(e) => this.handleUserAgreed(e.target.checked)} />
        </label>
        <button
          className="btn btn-primary login-form__submit"
          onClick={this.handleSubmit}
        >
          {'Let\'s start!'}
        </button>
      </div>
    )
  }
}

RegisterTab.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showTooltips: PropTypes.func.isRequired,
  hideTooltips: PropTypes.func.isRequired
}

export default RegisterTab;
