import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as TicketsActions from '../actions/TicketsActions';
import * as SideMenuActions from '../actions/SideMenuActions';

const SideMenu = (props) => {
  const {
    discuss,
    toDo,
    inProgress,
    testing,
    done,
    setTickets,
    show,
    hideSideMenu
  } = props;

  const onSaveClick = () => {
    setTickets({
      discuss: discuss.values,
      toDo: toDo.values,
      inProgress: inProgress.values,
      testing: testing.values,
      done: done.values
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
