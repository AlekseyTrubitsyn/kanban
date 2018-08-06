import React from 'react';
import { connect } from 'react-redux';

import './assets/styles_css/normalize.css';
import './assets/styles_css/App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt, faStar, faTimesCircle, faInfoCircle, faChevronCircleLeft, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';

import LoginRegisterForm from './containers/LoginRegisterForm';
import KanbanBoard from './containers/KanbanBoard';

library.add(fab, faSignOutAlt, faStar, faTimesCircle, faInfoCircle, faChevronCircleLeft, faBars, faPlus);

const App = (props) => {
  const {showLoginForm} = props;

  return (
    <div className="App">
      {showLoginForm
        ? <LoginRegisterForm />
        : <KanbanBoard />
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginForm: !state.userSettings.userData
  }
}

export default connect(mapStateToProps)(App);
