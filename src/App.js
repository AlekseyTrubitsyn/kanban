import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './assets/styles_css/normalize.css';
import './assets/styles_css/App.css';

import LoginRegisterForm from './containers/LoginRegisterForm';
import KanbanBoard from './containers/KanbanBoard';
import Header from './containers/Header';

const App = (props) => {
  const {showLoginForm} = props;

  return (
    <div className="App">
      {showLoginForm && <LoginRegisterForm />}
      {!showLoginForm && (
        <Fragment>
          <Header />
          <KanbanBoard />
        </Fragment>
      )}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    showLoginForm: !state.user.userData
  }
}

export default connect(mapStateToProps)(App);
