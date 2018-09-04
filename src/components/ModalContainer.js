import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalContainer = ({children, onCloseClick}) => (
  <Fragment>
    <div className="modal-container">
      <button
        className="modal-container__close-button"
        onClick={onCloseClick}
      >
        <FontAwesomeIcon icon="times-circle" />
      </button>
      {children}
    </div>
    <div className="overlay" onClick={onCloseClick}/>
  </Fragment>
);

ModalContainer.propTypes = {
  children: PropTypes.object.isRequired,
  onCloseClick: PropTypes.func.isRequired
}

export default ModalContainer;
