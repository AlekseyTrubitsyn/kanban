import React, { Component } from 'react';
import './styles_css/normalize.css';
import './styles_css/App.css';

import KanbanBoard from './containers/KanbanBoard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <KanbanBoard />
      </div>
    );
  }
}

export default App;
