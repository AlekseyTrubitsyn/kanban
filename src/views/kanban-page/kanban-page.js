import React from 'react';

import KanbanBoardContainer from '../../containers/kanban-board-container';
import HeaderContainer from '../../containers/header-container';
import SideMenuContainer from '../../containers/side-menu-container';

const KanbanPage = () => (
  <div className="page login-register-page">
    <SideMenuContainer />
    <HeaderContainer />
    <KanbanBoardContainer />
  </div>
);

export default KanbanPage;