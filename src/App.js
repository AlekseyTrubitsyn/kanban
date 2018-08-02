import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './assets/styles_css/normalize.css';
import './assets/styles_css/App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt, faStar, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import LoginRegisterForm from './containers/LoginRegisterForm';
import KanbanBoardContainer from './containers/KanbanBoardContainer';
import Header from './containers/Header';

console.log('faTimesCircle', faTimesCircle);
library.add(fab, faSignOutAlt, faStar, faTimesCircle);

const App = (props) => {
  const {showLoginForm} = props;

  return (
    <div className="App">
      {showLoginForm && <LoginRegisterForm />}
      {!showLoginForm && (
        <Fragment>
          <Header />
          <KanbanBoardContainer />
        </Fragment>
      )}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    showLoginForm: !state.userSettings.userData
  }
}

export default connect(mapStateToProps)(App);
