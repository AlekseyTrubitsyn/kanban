import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as TicketsActions from '../actions/TicketsActions';

import Ticket, { ticketPropTypes } from '../components/ticket';

const propTypes = {
  item: PropTypes.shape(ticketPropTypes).isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }),
  onSaveAndClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

const TicketContainer = (props) => {
  const {
    item,
    userData,
    onClose,
    onSave,
    onSaveAndClose
  } = props;

  return (
    <Ticket
      item={item}
      userData={userData}
      onClose={onClose}
      onSave={onSave}
      onSaveAndClose={onSaveAndClose}
    />
  )
};

function mapStateToProps(state) {
  return {
    item: state.tickets.ticketToModify,
    currentProject: state.projects.currentProject,
    userData: state.userSettings.userData
  }
}

function mapDispatchToProps(dispatch) {
  const bindedActions = bindActionCreators(TicketsActions, dispatch);

  return {
    onClose: bindedActions.closeTicketModal,
    onSave: bindedActions.saveTicket,
    onSaveAndClose: bindedActions.saveTicketAndCloseModal
  }
}

TicketContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TicketContainer);