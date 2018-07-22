import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-left">
          <button>Boards</button>
          <input type="text" placeholder="Search"/>
        </div>
        <div className="header-logo">My app</div>
        <div className="header-right">Login</div>
      </div>
    );
  }
}

export default Header;
