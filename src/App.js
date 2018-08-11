import React from 'react';
import { connect } from 'react-redux';

import './assets/styles_css/normalize.css';
import './assets/styles_css/App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt, faStar, faTimes, faTimesCircle, faInfoCircle, faChevronCircleLeft, faBars, faPlus, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';

import LoginRegisterForm from './containers/LoginRegisterForm';
import KanbanBoard from './containers/KanbanBoard';

library.add(fab, faSignOutAlt, faStar, faTimes, faTimesCircle, faInfoCircle, faChevronCircleLeft, faBars, faPlus, faCheck, faPen);

const App = (props) => {
  const { showLoginForm, showMessage } = props;

  return (
    <div className="App">
      {showLoginForm
        ? <LoginRegisterForm />
        : <KanbanBoard />
      }
      {showMessage && <Tooltip />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginForm: !state.userSettings.userData,
    showMessage: state.tooltip.showMessage
  }
}

export default connect(mapStateToProps)(App);
