import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LabeledInput from '../labeled-input';
 
class LoginTab extends Component {
  constructor(props) {
    super(props);

    //TODO stateless component

    this.invalidFieldsIds = [];
    this.loginFieldRef = React.createRef();
    this.passwordFieldRef = React.createRef();

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
          password: this.passwordFieldRef.current.value || '',
        })
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
      defaultLogin,
      defaultPassword
    } = this.props;

    return (
      <div className="login-tab" id="login-tab">
        <LabeledInput
          id="loginField"
          type="text"
          placeholder="Login"
          inputRef={this.loginFieldRef}
          defaultValue={defaultLogin}
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
          defaultValue={defaultPassword}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />
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
