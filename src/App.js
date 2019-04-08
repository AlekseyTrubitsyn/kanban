import React from 'react';
import { connect } from 'react-redux';

import 'react-toastify/dist/ReactToastify.min.css'
import './App.scss';

import { ToastContainer } from 'react-toastify';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt, faStar, faTimes, faTimesCircle, faInfoCircle, faChevronCircleLeft, faChevronRight, faChevronLeft, faBars, faPlus, faCheck, faPen, faExpand, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from  '@fortawesome/free-regular-svg-icons';

import LoginRegisterForm from './containers/LoginRegisterForm';
import KanbanBoard from './containers/KanbanBoard';
import Tooltips from './containers/tooltips';

library.add(fab, faSignOutAlt, faStar, faTimes, faTimesCircle, faInfoCircle, faChevronCircleLeft, faChevronRight, faChevronLeft, faBars, faPlus, faCheck, faSquare, faPen, faExpand, faExclamationCircle);

//TODO use session ID from cookies to skip login

const App = (props) => {
  const { showLoginForm } = props;

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      {showLoginForm
        ? <LoginRegisterForm />
        : <KanbanBoard />
      }
      <Tooltips/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginForm: !state.userSettings.userData
  }
}

export default connect(mapStateToProps)(App);
