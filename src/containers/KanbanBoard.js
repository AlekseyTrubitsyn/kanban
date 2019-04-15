import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import KanbanBoardContainer from './KanbanBoardContainer';
import HeaderContainer from './header-container';
import SideMenu from './SideMenu';
import TicketContainer from './ticket-container';

import * as TicketsActions from '../actions/TicketsActions';
import * as ProjectsActions from '../actions/ProjectsActions';

class KanbanBoard extends Component {
  constructor(props) {
    super(props);

    const {getProjects, getTickets} = props;

    getProjects();
    getTickets();
  }

  render() {
    const { showTicketModal } = this.props;

    return (
      <Fragment>
        {showTicketModal && <TicketContainer/>}
        <SideMenu />
        <HeaderContainer />
        <KanbanBoardContainer />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    showTicketModal: state.tickets.showTicketModal
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProjects: bindActionCreators(ProjectsActions, dispatch).getProjects,
    getTickets: bindActionCreators(TicketsActions, dispatch).getTickets,
  }
}

KanbanBoard.propTypes = {
  showCardModal: PropTypes.bool,
  getProjects: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
