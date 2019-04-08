import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LabeledInput from '../labeled-input';
 
class LoginTab extends Component {
  constructor(props) {
    super(props);

    const {
      defaultLogin,
      defaultPassword
    } = props;

    this.loginFieldRef = React.createRef();
    this.passwordFieldRef = React.createRef();

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
      }
    };

    const defaultLoginVerified = this.fields.loginField.verify(defaultLogin);
    const defaultPasswordVerified = this.fields.loginField.verify(defaultPassword);

    const invalidFieldsIds = {
      loginField: !defaultLoginVerified,
      passwordField: !defaultPasswordVerified
    };

    const fieldsVerified = defaultLoginVerified && defaultPasswordVerified;

    this.state = {
      login: defaultLogin,
      password: defaultPassword,
      submitData: {
        login: defaultLogin,
        password: defaultPassword
      },
      invalidFieldsIds,
      fieldsVerified,
      tooltipsEnabled: false,
    }

    this.updateTooltips = this.updateTooltips.bind(this);

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.hideTooltips();
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
          modify={this.fields.loginField.modify}
          onChange={this.handleLoginChange}
        />
        <LabeledInput
          id="passwordField"
          type="password"
          placeholder="Password"
          inputRef={this.passwordFieldRef}
          defaultValue={defaultPassword}
          onChange={this.handlePasswordChange}
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
