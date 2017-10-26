import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {
  state  = {
    change: false,
    date: this.props.item.date,
    trackName: this.props.item.trackName,
  };

  undo() {
      this.trackName.value = this.state.trackName;
      this.trackDate.value = this.state.date;
      this.setState({change: false});
  };


  render() {
    const { item } = this.props;

    item.date = this.state.date;
    item.trackName = this.state.trackName;

    return (
      <div>
        Detail!!
        <input ref={(input) => {this.trackName = input }} type="text" defaultValue={this.state.trackName}
          onChange={e =>
            e.target.value !== this.state.trackName ?
              this.setState({ change: true }) : this.setState({ change: false })}
        />
        <input ref={(input) => {this.trackDate = input }} type="text" defaultValue={this.state.date}
          disabled="disabled" onChange={e =>
            e.target.value !== this.state.date ?
              this.setState({change: true }) : this.setState({ change: false })}
        />
        <button disabled={!this.state.change}
            onClick={() => this.props.onSaveChange(this.state.date, this.trackDate.value, this.trackName.value)}
        >Save</button>
        <button disabled={!this.state.change} onClick={this.undo.bind(this)}>Undo</button>
      </div>
    );
  }
}


export default connect(
    (state, props) => {
        console.log('state', state);
        console.log('props', props);
        return ({
            item: state.filter(item => item.date === props.params.date)[0],
        })
    },
    dispatch => ({
        onSaveChange: (id, newDate, newText) => {
            return dispatch({
                type: 'SAVE_CHANGES',
                payload: {id: id, newDate: newDate, newText: newText}
            })
        }
    })
)(Detail);