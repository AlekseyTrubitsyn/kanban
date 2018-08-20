import React, {Component, Fragment} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import KanbanColumnsContainer from './KanbanColumnsContainer';
import Header from './Header';
import SideMenu from './SideMenu';
import Card from './Card';
import Loader from '../components/Loader';

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
    const { showCardModal, showSideMenu } = this.props;

    return (
      <Fragment>
        {showCardModal && <Card/>}
        <SideMenu />
        <Header />
        <KanbanColumnsContainer />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {

  return {
    showCardModal: state.tickets.showCardModal,
    showSideMenu: state.sideMenu.show
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProjects: bindActionCreators(ProjectsActions, dispatch).getProjects,
    getTickets: bindActionCreators(TicketsActions, dispatch).getTickets,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
