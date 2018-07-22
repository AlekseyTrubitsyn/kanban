import React, { Component } from 'react';
import './assets/styles_css/normalize.css';
import './assets/styles_css/App.css';

import KanbanBoard from './containers/KanbanBoard'
import Header from './containers/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <KanbanBoard />
      </div>
    );
  }
}

export default App;
