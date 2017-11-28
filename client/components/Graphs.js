import React, { Component } from 'react';
import { connect } from 'react-redux';
import makeHighchart from './Highcharts';
import socket from '../socket';

class Graphs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    makeHighchart(this.props.emotions)
  }
  componentWillReceiveProps(nextEmotions) {
    makeHighchart(nextEmotions.emotions)
    console.log(nextEmotions.emotions);
    socket.emit('doneKapturing')
  }
  render() {
    
    return (
      <div>
        <div id='graphContainer'>
        {
          [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={i} id={`container${i}`}  style={{ width: "50%", height: "300px"}} />)
          )
        } 
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    emotions: ownProps.emotions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    normalizeData: (data, type) => {
      return data.map((inst) => {
        return inst[type]
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphs)
