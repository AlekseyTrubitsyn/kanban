import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LabeledInput from '../labeled-input';

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitData: {},
      invalidFieldsIds: {
        loginField: true,
        passwordField: true,
        secondPasswordField: true,
        termsAgreementCheckbox: true,
      },
      tooltipsEnabled: false,
      fieldsVerified: false
    }

    this.loginFieldRef = React.createRef();
    this.passwordFieldRef = React.createRef();
    this.secondPasswordFieldRef = React.createRef();
    this.termsAgreementRef = React.createRef();
    this.termsAgreementCheckboxRef = React.createRef();

    this.fields = {
      loginField: {
        ref: this.loginFieldRef,
        modify: value => value.replace(/[^a-zA-Z0-9]/gi, ''),
        verify: value => !!value.length,
        tooltipData: {
          ref: this.loginFieldRef,
          message: 'Login field should not be empty',
        }
      },
      passwordField: {
        ref: this.passwordFieldRef,
        verify: value => value.length > 3,
        tooltipData: {
          ref: this.passwordFieldRef,
          message: 'Password must be at least 4 symbol',
        }
      },
      secondPasswordField: {
        ref: this.secondPasswordFieldRef,
        verify: (value, password) => value.length > 3 && value === password,
        tooltipData: {
          ref: this.secondPasswordFieldRef,
          message: 'Passwords must match',
        }
      },
      termsAgreementCheckbox: {
        ref: this.termsAgreementCheckboxRef,
        verify: value => !!value,
        tooltipData: {
          ref: this.termsAgreementRef,
          message: 'Agree, please :)',
        }
      }
    }

    this.updateTooltips = this.updateTooltips.bind(this);

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);
    this.handleAgreedChange = this.handleAgreedChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTooltips(invalidFieldsIds) {
    let tooltipsData = Object.keys(invalidFieldsIds)
      .filter(fieldId => !!invalidFieldsIds[fieldId])
      .map(fieldId => {
        const {
          ref,
          message
        } = this.fields[fieldId].tooltipData;

        return ({
          element: ref.current,
          message
        });
      });

    if (!tooltipsData.length) {
      this.props.hideTooltips();

      return;
    }

    this.props.showTooltips(tooltipsData);
  }

  handleLoginChange({ id, value }) {
    this.handleInputChange({
      id,
      name: 'login',
      submitted: true,
      verified: this.fields[id].verify(value),
      value
    });
  }

  handlePasswordChange({ id, value }) {
    this.handleInputChange({
      id,
      name: 'password',
      submitted: true,
      verified: this.fields[id].verify(value),
      value
    });
  }

  handleSecondPasswordChange({ id, value }) {
    const { password } = this.state;

    this.handleInputChange({
      id,
      name: 'secondPassword',
      verified: this.fields[id].verify(value, password),
      value
    });
  }

  handleAgreedChange({ id, value }) {
    this.handleInputChange({
      id,
      name: 'termsAgreement',
      verified: this.fields[id].verify(value),
      value
    });
  }

  handleInputChange(data) {
    const {
      id,
      name,
      submitted,
      value,
      verified
    } = data;

    const {
      submitData,
      fieldsVerified,
      invalidFieldsIds,
      tooltipsEnabled
    } = this.state;

    const newInvalidFieldsIds = {
      ...invalidFieldsIds,
      [id]: !verified
    };

    const getInvalidFiedlsCount = () => Object.keys(newInvalidFieldsIds)
      .filter(fieldId => !!newInvalidFieldsIds[fieldId])
      .length;

    const updatedFieldsVerified = (verified && fieldsVerified) || getInvalidFiedlsCount() === 0;

    const newSubmitData = submitted
      ? { ...submitData, [name]: value }
      : submitData;

    this.setState({
      [name]: value,
      submitData: newSubmitData,
      invalidFieldsIds: newInvalidFieldsIds,
      fieldsVerified: updatedFieldsVerified
    });

    if (tooltipsEnabled && verified && invalidFieldsIds[id]) {
      this.updateTooltips(newInvalidFieldsIds);
    }
  }

  handleSubmit() {
    const {
      submitData,
      fieldsVerified,
      invalidFieldsIds
    } = this.state;

    if (fieldsVerified) {
      this.props.onSubmit(submitData);

      return;
    }

    this.setState({
      tooltipsEnabled: true,
    });

    this.updateTooltips(invalidFieldsIds);
  }

  render() {
    return (
      <div className="register-tab" id="register-tab">
        <LabeledInput
          id="loginField"
          type="text"
          placeholder="Login"
          inputRef={this.loginFieldRef}
          modify={this.fields.loginField.modify}
          onChange={this.handleLoginChange}
        />
        <LabeledInput
          id="passwordField"
          type="password"
          placeholder="Password"
          inputRef={this.passwordFieldRef}
          onChange={this.handlePasswordChange}
        />
        <LabeledInput
          id="secondPasswordField"
          type="password"
          placeholder="...and again"
          inputRef={this.secondPasswordFieldRef}
          onChange={this.handleSecondPasswordChange}
        />
        <p className="form-text-label">
          <span className="form-text-label__aside">
            <FontAwesomeIcon icon="exclamation-circle" />
          </span>
          <span>It's just a frontend demo without server, data is not collecting anywhere but your browser's storage... So type anything!</span></p>
        <label
          className="register-tab__checkbox-container checkbox-container"
          ref={this.termsAgreementRef}
        >
          <input
            className="checkbox-container__checkbox checkbox"
            id="termsAgreementCheckbox"
            ref={this.termsAgreementCheckboxRef}
            type="checkbox"
            onChange={(e) => this.handleAgreedChange({ id: "termsAgreementCheckbox", value: e.target.checked })}
          />
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
