import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liftLoginLabel: false,
      liftPasswordLabel: false,
      liftSecondPasswordLabel: false,
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

    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getLabelKey(inputId) {
    switch (inputId) {
      case 'loginField':
        return 'liftLoginLabel';

      case 'passwordField':
        return 'liftPasswordLabel';

      case 'secondPasswordField':
        return 'liftSecondPasswordLabel';

      default:
        return null;
    }
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

  handleInputFocus(inputId) {
    const key = RegisterTab.getLabelKey(inputId);

    if (!key) return;

    this.setState({
      [key]: true
    })
  }

  handleInputBlur(inputId, value) {
    const valueIsEmpty = !value.length;
    const key = RegisterTab.getLabelKey(inputId);

    if (!key) return;

    this.setState({
      [key]: !valueIsEmpty
    })
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
      liftLoginLabel,
      liftPasswordLabel,
      liftSecondPasswordLabel,
      agreed
    } = this.state;

    return (
      <div className="register-tab" id="register-tab">
        <label className="input-container">
          <input
            id="loginField"
            type="text"
            ref={this.loginFieldRef}            
            onChange={(e) => this.handleInputChange('loginField', e.target.value)}
            onFocus={() => this.handleInputFocus('loginField')}
            onBlur={(e) => this.handleInputBlur('loginField', e.target.value)}
          />
          <span className={`input-label noselect ${(liftLoginLabel ? 'input-label--up' : '')}`.trim()}>
            {'Login'}
          </span>
        </label>
        <label className="input-container">
          <input
            id="passwordField"
            type="password"
            ref={this.passwordFieldRef}            
            onChange={(e) => this.handleInputChange('passwordField', e.target.value)}
            onFocus={() => this.handleInputFocus('passwordField')}
            onBlur={(e) => this.handleInputBlur('passwordField', e.target.value)}
          />
          <span className={`input-label noselect ${(liftPasswordLabel ? 'input-label--up' : '')}`.trim()}>
            {'Password'}
          </span>
        </label>
        <label className="input-container">
          <input
            id="secondPasswordField"
            type="password"
            ref={this.secondPasswordFieldRef}
            onChange={(e) => this.handleInputChange('secondPasswordField', e.target.value)}
            onFocus={() => this.handleInputFocus('secondPasswordField')}
            onBlur={(e) => this.handleInputBlur('secondPasswordField', e.target.value)}
          />
          <span className={`input-label ${(liftSecondPasswordLabel ? 'input-label--up' : '')}`.trim()}>
            {'...and again'}
          </span>
        </label>
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
