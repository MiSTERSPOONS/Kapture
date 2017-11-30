import React, { Component } from 'react'
import { makeHighchart } from './Highcharts';
import socket from '../socket';

export default class LineGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      currentStyle: null,
      currentElement: null
    }
  }

  componentDidMount() {
    makeHighchart(this.props.emotions)
  }

  componentWillReceiveProps(nextEmotions) {
    makeHighchart(nextEmotions.emotions)
    socket.emit('doneKapturing')
  }

  render() {
    let backDrop = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.75)'
    };

    return (
      <div>
        <div id='graphContainer'>
          {
            [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} id={`container${i}`} onClick={(event) => {
                const target = event.currentTarget;
                const style = Object.assign({}, target.style);
                target.style.position = "fixed";
                target.style.top = "50%";
                target.style.left = "50%";
                target.style.transform = "translate(-50%, -50%)";
                target.style.zIndex = "9999";
                target.style.backgroundColor = "grey";
                this.setState({
                  isModalOpen: true,
                  currentElement: target,
                  currentStyle: style
                })
              }} />)
            )
          }
        </div>
        {
          this.state.isModalOpen &&
          <div style={backDrop} onClick={(event) => {
            this.state.currentElement.style = this.state.currentStyle;
            this.setState({
              isModalOpen: false
            })
          }} />
        }
      </div>
    )
  }
}
