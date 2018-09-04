import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as TicketsActions from '../actions/TicketsActions';
import * as SideMenuActions from '../actions/SideMenuActions';

const SideMenu = (props) => {
  const {
    isFetching,
    discuss,
    toDo,
    inProgress,
    testing,
    done,
    archive,
    setTickets,
    show,
    hideSideMenu
  } = props;

  const onSaveClick = () => {
    if (isFetching) return;

    setTickets({
      discuss: discuss.values,
      toDo: toDo.values,
      inProgress: inProgress.values,
      testing: testing.values,
      done: done.values,
      archive: archive.values
    });
  }

  const onCloseClick = () => {
    hideSideMenu();
  }

  const onBoardsClick = () => {
    console.log('more boards!');
  }

  const onLoadClick = () => {
    props.getTickets();
  }

  const onResetClick = () => {
    props.resetTickets();
  }

  return (
    <Fragment>
      {show && <div className="side-menu__overlay overlay" onClick={onCloseClick}></div>}
      <div className={"side-menu" + (show ? " opened" : "")}>
        <button
          className="side-menu__close-button"
          onClick={onCloseClick}>
            <FontAwesomeIcon icon="chevron-circle-left"/>
          </button>
        <button
          className="side-menu__item"
          onClick={onBoardsClick}>Boards</button>
        <button
          className="side-menu__item"
          onClick={onSaveClick}>Save</button>
        <button
          className="side-menu__item"
          onClick={onLoadClick}>Load</button>
        <button
          className="side-menu__item"
          onClick={onResetClick}>Reset</button>
      </div>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    isFetching: state.tickets.isFetching,
    discuss: state.tickets.discuss,
    toDo: state.tickets.toDo,
    inProgress: state.tickets.inProgress,
    testing: state.tickets.testing,
    done: state.tickets.done,
    archive: state.tickets.archive,
    show: state.sideMenu.show
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideSideMenu: bindActionCreators(SideMenuActions, dispatch).hideSideMenu,
    getTickets: bindActionCreators(TicketsActions, dispatch).getTickets,
    setTickets: bindActionCreators(TicketsActions, dispatch).setTickets,
    resetTickets: bindActionCreators(TicketsActions, dispatch).resetTickets,
  }
}

SideMenu.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  discuss: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.array
  }).isRequired,
  toDo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.array
  }).isRequired,
  inProgress: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.array
  }).isRequired,
  testing: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.array
  }).isRequired,
  done: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.array
  }).isRequired,
  archive: PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.array
  }).isRequired,
  hideSideMenu: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
  setTickets: PropTypes.func.isRequired,
  resetTickets: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
