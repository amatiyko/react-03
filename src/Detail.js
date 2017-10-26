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
      this.trackInfo.value = this.state.trackName;
      this.trackDate.value = this.state.date;
      this.setState({change: false});
  };

  save() {
      this.setState({trackName: this.trackInfo.value, date: this.trackDate.value});
      console.log(this.state);
      this.setState({change: false});
  };

  render() {
    const { item } = this.props;

    item.date = this.state.date;
    item.trackName = this.state.trackName;

    return (
      <div>
        Detail!!
        <input ref={(input) => {this.trackInfo = input }} type="text" defaultValue={this.state.trackName}
          onChange={e =>
            e.target.value !== this.state.trackName ?
              this.setState({ change: true }) : this.setState({ change: false })}
        />
        <input ref={(input) => {this.trackDate = input }} type="text" defaultValue={this.state.date}
          onChange={e =>
            e.target.value !== this.state.date ?
              this.setState({change: true }) : this.setState({ change: false })}
        />
        <button disabled={!this.state.change} onClick={this.save.bind(this)}>Save</button>
        <button disabled={!this.state.change} onClick={this.undo.bind(this)}>Undo</button>
      </div>
    );
  }
}

export default connect((state, props) => {
  // console.log(state, props);
  return ({
    item: state.filter(item => item.date === props.params.date)[0],
  })
})(Detail);
