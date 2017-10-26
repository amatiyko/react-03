import React, { Component } from 'react';

class Dropdown extends Component {

  state = {
    isOpened: false,
  };

  render() {
    return (
      <div onClick={() => {
        this.setState({
          isOpened: !this.state.isOpened,
        });
      }}>
        Its dropdown baby
        {
          this.state.isOpened  && (
            <div>Here is what is shown in dropdown</div>
          )
        }
      </div>
    );
  }
}

export default Dropdown;
