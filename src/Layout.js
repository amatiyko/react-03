import React, { Component } from 'react';
import { Link } from 'react-router';

class Layout extends Component {
  render() {
    console.log('children', this.props.children);
    return (
      <div>
        <div>
          Hello from header!!!
        </div>
        <div>
          <Link to="/">Go to /</Link>
          <br />
          <Link to="/main">Go to main page</Link>
          <br />
          <Link to="/dropdown">Go to dropdown page</Link>
        </div>

        { this.props.children}

        <div>
          Hello from footer!!!
        </div>
      </div>
    );
  }
}

export default Layout;
