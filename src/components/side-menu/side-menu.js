import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

const SideMenu = (props) => {
  const {
    show,
    onHide,
    onLoad,
    onSave,
    onReset
  } = props;

  return (
    <Fragment>
      {show && (
        <div
          className="side-menu__overlay overlay"
          onClick={onHide}
        />
      )}
      <div className={"side-menu" + (show ? " opened" : "")}>
        <button
          className="side-menu__close-button"
          onClick={onHide}
        >
          <FontAwesomeIcon icon="chevron-circle-left" />
        </button>
        <button
          className="side-menu__item"
          onClick={onSave}
        >
          {'Save'}
        </button>
        <button
          className="side-menu__item"
          onClick={onLoad}
        >
          {'Load'}
        </button>
        <button
          className="side-menu__item"
          onClick={onReset}
        >
          {'Reset'}
        </button>
      </div>
    </Fragment>
  );
}

SideMenu.propTypes = propTypes;
export default SideMenu;
