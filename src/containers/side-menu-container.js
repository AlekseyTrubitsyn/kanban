import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as TicketsActions from '../actions/TicketsActions';
import * as SideMenuActions from '../actions/SideMenuActions';

import SideMenu from '../components/side-menu';

const propTypes = {
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
  saveTickets: PropTypes.func.isRequired,
  resetTickets: PropTypes.func.isRequired
}

const SideMenuContainer = (props) => {
  const {
    isFetching,
    discuss,
    toDo,
    inProgress,
    testing,
    done,
    archive,
    saveTickets,
    getTickets,
    resetTickets,
    show,
    hideSideMenu
  } = props;

  const handleSave = () => {
    if (isFetching) return;

    saveTickets({
      discuss: discuss.values,
      toDo: toDo.values,
      inProgress: inProgress.values,
      testing: testing.values,
      done: done.values,
      archive: archive.values
    });
  }

  return (
    <SideMenu
      show={show}
      onHide={hideSideMenu}
      onLoad={getTickets}
      onSave={handleSave}
      onReset={resetTickets}
    />
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
  const {
    getTickets,
    saveTickets,
    resetTickets
  } = bindActionCreators(TicketsActions, dispatch);

  return {
    hideSideMenu: bindActionCreators(SideMenuActions, dispatch).hideSideMenu,
    getTickets,
    saveTickets,
    resetTickets
  }
}

SideMenu.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer);
