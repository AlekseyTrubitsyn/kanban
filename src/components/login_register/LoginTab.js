import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liftLoginLabel: !!props.defaultLogin.length,
      liftPasswordLabel: !!props.defaultPassword.length
    }

    this.invalidFieldsIds = [];
    this.loginFieldRef = React.createRef();
    this.passwordFieldRef = React.createRef();

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
          password: this.passwordFieldRef.current.value || '',
        })
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
        return 'liftLoginLabel'
      
      case 'passwordField':
        return 'liftPasswordLabel';

      default:
        return null;
    }
  }

  getInvalidFields() {
    let invalidFieldsIds = Object.keys(this.fields).filter(fieldId => {
      let field = this.fields[fieldId];

      return field.ref.current && !field.check();
    });

    this.invalidFieldsIds = invalidFieldsIds.reduce((result, item) => ({...result, [item]: true }), {});

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
    const key = LoginTab.getLabelKey(inputId);

    if (!key) return;

    this.setState({
      [key]: true
    });
  }

  handleInputBlur(inputId, value) {
    const key = LoginTab.getLabelKey(inputId);

    this.setState({
      [key]: !!value.length
    });
  }

  handleInputChange(id, value) {
    if (!(value.length && this.invalidFieldsIds[id])) return;
    
    let invalidFields = this.getInvalidFields();

    this.updateTooltips(invalidFields);
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
      liftPasswordLabel
    } = this.state;

    const {
      defaultLogin,
      defaultPassword
    } = this.props;

    return (
      <div className="login-tab" id="login-tab">
        <label className="input-container">
          <input
            id="loginField"
            type="text"
            ref={this.loginFieldRef}            
            defaultValue={defaultLogin}
            onChange={(e) => this.handleInputChange('loginField', e.target.value)}
            onFocus={() => this.handleInputFocus('loginField')}
            onBlur={(e) => this.handleInputBlur('loginField', e.target.value)}
          />
          <span className={`input-label noselect ${liftLoginLabel ? 'input-label--up' : ''}`.trim()}>
            {'Login'}
          </span>
        </label>
        <label className="input-container">
          <input
            id="passwordField"
            type="password"
            ref={this.passwordFieldRef}
            defaultValue={defaultPassword}
            onChange={(e) => this.handleInputChange('passwordField', e.target.value)}
            onFocus={() => this.handleInputFocus('passwordField')}
            onBlur={(e) => this.handleInputBlur('passwordField', e.target.value)}
          />
          <span className={`input-label noselect ${liftPasswordLabel ? 'input-label--up' : ''}`.trim()}>
            {'Password'}
          </span>
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

LoginTab.propTypes = {
  defaultLogin: PropTypes.string,
  defaultPassword: PropTypes.string, 
  onSubmit: PropTypes.func.isRequired,
  showTooltips: PropTypes.func.isRequired,
  hideTooltips: PropTypes.func.isRequired,
}

LoginTab.defaultProps = {
  defaultLogin: '',
  defaultPassword: ''
}

export default LoginTab;
