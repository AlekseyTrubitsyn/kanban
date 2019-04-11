import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  children: PropTypes.object.isRequired,
  onCloseClick: PropTypes.func.isRequired
}

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

ModalContainer.propTypes = propTypes;
export default ModalContainer;
