import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Detail extends Component {
  state  = {
    change: false,
    date: this.props.item.date,
    trackName: this.props.item.trackName,
  };
  undo() {

  }
  render() {
    const { item } = this.props;
    return (
      <div>
        Detail!!
        <input
          type="text"
          defaultValue={this.state.trackName}
          onChange={e =>
            e.target.value !== this.state.trackName ?
              this.setState({ change: true }) : this.setState({ change: false })}
        />
        <input
          type="text"
          defaultValue={this.state.date}
          onChange={e =>
            e.target.value !== this.state.date ?
              this.setState({change: true }) : this.setState({ change: false })}
        />
        <button disabled={!this.state.change}>Save</button>
        <button
          disabled={!this.state.change}
          onClick={this.undo}
        >Undo</button>
      </div>
    );
  }
}

export default connect((state, props) => {
  console.log(state, props);
  return ({
    item: state.filter(item => item.date === props.params.date)[0],
  })
})(Detail);
