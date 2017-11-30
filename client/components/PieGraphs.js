import React, { Component } from 'react'
import { makePiechart } from './Highcharts';
import socket from '../socket'

export default class PieGraphs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    makePiechart(this.props.emotions)
  }

  componentWillReceiveProps(nextEmotions) {
    makePiechart(nextEmotions.emotions)
    socket.emit('doneKapturing')
  }

  render () {
    return (
      <div id="pieContainer"></div>
    )
  }
}

