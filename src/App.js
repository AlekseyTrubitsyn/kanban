import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './assets/styles_css/normalize.css';
import './assets/styles_css/App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt, faStar, faTimesCircle, faInfoCircle, faChevronCircleLeft, faBars } from '@fortawesome/free-solid-svg-icons';

import LoginRegisterForm from './containers/LoginRegisterForm';
import KanbanBoardContainer from './containers/KanbanBoardContainer';
import Header from './containers/Header';
import SideMenu from './containers/SideMenu';

library.add(fab, faSignOutAlt, faStar, faTimesCircle, faInfoCircle, faChevronCircleLeft, faBars);

const App = (props) => {
  const {showLoginForm} = props;

  return (
    <div className="App">
      {showLoginForm && <LoginRegisterForm />}
      {!showLoginForm && (
        <Fragment>
          <SideMenu />
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
