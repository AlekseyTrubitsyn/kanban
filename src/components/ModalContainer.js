import React, { Fragment } from 'react';
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
    <div className="modal-container__overlay" onClick={onCloseClick}/>
  </Fragment>
);

export default ModalContainer;
