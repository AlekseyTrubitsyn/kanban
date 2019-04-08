import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as UserSettingsActions from '../actions/UserSettingsActions';
import * as TooltipsActions from '../actions/TooltipsActions';

import Loader from '../components/Loader';
import LoginRegisterForm from '../components/login-register-form';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  showTooltips: PropTypes.func.isRequired,
  hideTooltips: PropTypes.func.isRequired,
  tooltipsCount: PropTypes.number
}

const defaultProps = {
  tooltipsCount: 0
}

const LoginRegisterFormContainer = (props) => {
  const {
    isFetching,
    login,
    register,
    tooltipsCount,
    hideTooltips,
    showTooltips
  } = props;

  const handleHideTooltips = () => {
    if (!tooltipsCount) return;

    hideTooltips();
  }

  if (isFetching) return (<Loader />);

  return (
    <LoginRegisterForm
      onLoginSubmit={login}
      onRegisterSubmit={register}
      onShowTooltips={showTooltips}
      onHideTooltips={handleHideTooltips}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.userSettings.isFetching,
    tooltipsCount: state.tooltips.count
  }
}

const mapDispatchToProps = (dispatch) => {
  const bindedUserSettingsActions = bindActionCreators(UserSettingsActions, dispatch);
  const bindedTooltipActions = bindActionCreators(TooltipsActions, dispatch);

  return {
    login: bindedUserSettingsActions.login,
    register: bindedUserSettingsActions.register,
    showTooltips: bindedTooltipActions.showTooltips,
    hideTooltips: bindedTooltipActions.hideTooltips,
  }
}

LoginRegisterFormContainer.propTypes = propTypes;
LoginRegisterFormContainer.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterFormContainer);
