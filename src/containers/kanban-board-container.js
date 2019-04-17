import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import _isEmpty from 'lodash/isEmpty';

import * as TicketsActions from '../actions/TicketsActions';

import KanbanBoard from '../components/kanban-board';
import TicketContainer from './ticket-container';

const columnShape = {
  name: PropTypes.string.isRequired,
  values: PropTypes.array
};

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  columns: PropTypes.shape({
    discuss: PropTypes.shape(columnShape).isRequired,
    toDo: PropTypes.shape(columnShape).isRequired,
    inProgress: PropTypes.shape(columnShape).isRequired,
    testing: PropTypes.shape(columnShape).isRequired,
    done: PropTypes.shape(columnShape).isRequired,
    archive: PropTypes.shape(columnShape).isRequired,
  }).isRequired,
  filter: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  moveTicket: PropTypes.func.isRequired,
  openTicketModal: PropTypes.func.isRequired
};

const KanbanBoardContainer = props => {
  const {
    columns,
    showTicketModal,
    isFetching,
    userId,
    filter,
    moveTicket,
    openTicketModal
  } = props;

  const filterColumn = (filter, userId, column) => {
    const filterUser = (item) => item.assigneeId === userId;
    const filterFree = (item) => _isEmpty(item.assignee);
    const filterDeadline = (item) => item.deadline
      && item.statusName !== 'done'
      && new Date(item.deadline) < new Date();

    switch (filter) {
      case 'my':
        return {
          ...column,
          values: column.values.filter(filterUser)
        };

      case 'free':
        return {
          ...column,
          values: column.values.filter(filterFree)
        };

      case 'deadline':
        return {
          ...column,
          values: column.values.filter(filterDeadline)
        };

      default:
        return column;
    }
  }

  const filteredColumns = Object.keys(columns).map(columnKey => ({
    droppableId: columnKey,
    data: filterColumn(filter, userId, columns[columnKey])
  }));

  return (
    <Fragment>
      {showTicketModal && (
        <TicketContainer />
      )}
      <KanbanBoard
        isFetching={isFetching}
        columns={filteredColumns}
        onTicketMove={moveTicket}
        onOpenTicket={openTicketModal}
      />
    </Fragment>
  );
}

function mapStateToProps(state) {
  const isFetching = state.tickets.isFetching || state.projects.isFetching;

  return {
    columns: {
      discuss: state.tickets.discuss,
      toDo: state.tickets.toDo,
      inProgress: state.tickets.inProgress,
      testing: state.tickets.testing,
      done: state.tickets.done,
      archive: state.tickets.archive,
    },
    isFetching,
    filter: state.tickets.filter,
    userId: state.userSettings.userData.id,
    showTicketModal: state.tickets.showTicketModal
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveTicket: bindActionCreators(TicketsActions, dispatch).moveTicket,
    openTicketModal: bindActionCreators(TicketsActions, dispatch).openTicketModal,
  }
}

KanbanBoardContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoardContainer);
