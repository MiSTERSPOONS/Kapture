import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieGraphs from './PieGraphs'
import LineGraphs from './LineGraphs'
import socket from '../socket';
import NoData from './NoData'

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      currentStyle: null,
      currentElement: null
    }
  }

  componentWillReceiveProps(nextEmotions) {
    socket.emit('doneKapturing')
  }

  render() {
    return (
      <div>
        {
          this.props.emotions.length > 0 ? (this.props.emotions.length > 1 ? <LineGraphs emotions={this.props.emotions} /> : <PieGraphs emotions={this.props.emotions} />) : <NoData />
        }
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
