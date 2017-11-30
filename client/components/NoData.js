import React, { Component } from 'react'

export default class NoData extends Component {
  render() {
    return (
      <div className="noDataContainer">
        <div className="coast">
          <div className="wave-rel-wrap">
            <div className="wave"></div>
          </div>
        </div>
        <div className="coast delay">
          <div className="wave-rel-wrap">
            <div className="wave delay"></div>
          </div>
        </div>
        <div className="text text-n">n</div>
        <div className="text text-o">o</div>
        <div className="text text-d">d</div>
        <div className="text text-a">a</div>
        <div className="text text-t">t</div>
        <div className="text text-a2">a</div>
      </div>
    )
  }
}
