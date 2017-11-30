import React, { Component } from 'react'
import { makePiechart } from './Highcharts';

export default class PieGraphs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    makePiechart(this.props.emotions)
  }

  render () {
    return (
      <div id="pieContainer"></div>
    )
  }
}

