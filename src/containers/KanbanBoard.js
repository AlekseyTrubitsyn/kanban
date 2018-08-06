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

    new Promise (resolve => {
      getProjects();
      resolve();
    })
    .then(() => getTickets());
  }

  render() {
    const { isFetching, showCardModal, showSideMenu } = this.props;

    if (isFetching) return <Loader />
    return (
      <Fragment>
        {showCardModal && <Card/>}
        {showSideMenu && <SideMenu />}
        <Header />
        <KanbanColumnsContainer />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  const isFetching = state.projects.isFetching || state.tickets.isFetching;

  return {
    showCardModal: state.tickets.showCardModal,
    showSideMenu: state.sideMenu.show,
    isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProjects: bindActionCreators(ProjectsActions, dispatch).getProjects,
    getTickets: bindActionCreators(TicketsActions, dispatch).getTickets,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
