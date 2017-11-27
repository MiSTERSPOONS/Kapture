import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store, { setSnapshotType, registerUserWithAPI, loginUserWithAPI } from '../store';
import socket from '../socket'

// const kapture = (sendCapture, userType, currentUser, snapshotType) => {
//   const video = document.getElementById('video');
//   const canvas = document.getElementById('canvas');
//   let context = canvas.getContext('2d');
//   context.drawImage(video, 0, 0, 320, 240); // Taking photo
//   const imageBase64 = canvas.toDataURL(); // Base64
//   sendCapture(
//     imageBase64,
//     userType || 'students',
//     currentUser || null,
//     snapshotType || 'login'
//   )
// }


class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.capture = this.capture.bind(this);
  }
  
  componentDidMount() {
    socket.on('kaptureImage', () => {
      // console.log('hitting from Snapshot after all that shit')
      // return new Promise((resolve, reject) => {
      //   try {
      //     this.capture()
      //     console.log('this should fire before worked')
      //     resolve('SUCCESS')
      //   } catch(e) {
      //     reject(e) 
      //   }
      // })
      // .then(() => {
      //   socket.emit('doneKapturing')
      //   console.log('workeddddddd')
      // })
      const that = this;
      
      const asyncFunc = async function promise() {
        try {
          await that.interval = setTimeout(() => {
            console.log("Hi I am here");
          }, 3000);
          console.log("are you waiting");
        } catch(e) {
          throw new Error("Something is wrong");
        }
      }
      asyncFunc()
      .then(() => {
        console.log('hitting socket.emit after async')
        socket.emit('doneKapturing')
      })
    })
    const videoBox = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        videoBox.src = window.URL.createObjectURL(stream);
        videoBox.play();
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }
  
  capture() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 320, 240); // Taking photo
    const imageBase64 = canvas.toDataURL(); // Base64
    this.props.sendCapture(
      imageBase64,
      this.props.userType || 'students',
      this.props.currentUser || null,
      this.props.snapshotType || 'login'
    )
  }
  
  // captureInterval() {
    //   var video = document.getElementById('video');
    //   var canvas = document.getElementById('canvas');
    //   var context = canvas.getContext('2d');
    //   context.drawImage(video, 0, 0, 320, 240); // Taking photo
    //   var imageBase64 = canvas.toDataURL(); // Base64
    
    //   const kaptureTimer = () => {
      //     context.drawImage(video, 0, 0, 320, 240);
      //     console.log(canvas.toDataURL().slice(0, 30));
      //   }
      //   setInterval(kaptureTimer, this.props.interval);
      
      //   this.props.sendCapture(
        //     imageBase64,
        //     this.props.userType || 'students',
        //     this.props.currentUser.id,
        //     this.props.setSnapshotType || 'login'
        //   )
        // }
        
        render() {
          return (
            <div id="snapshot-container">
            <div className="center">
            <video id="video" width="640" height="480" autoPlay style={{ display: this.props.display }} />
            </div>
        <div className="center">
          <button className="kapture-button" id="snap" onClick={this.capture}>Kapture Myself</button>
        </div>
        <canvas id="canvas" width="640" height="480" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser,
    userType: state.userType,
    snapshotType: state.snapshotType,
    display: ownProps.display,
    interval: 3000 // INTERVAL SETTING FROM INSTRUCTOR LATER?
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendCapture: (imageBase64, userType, userInfo, snapshotType) => {
      if (snapshotType === 'signup') {
        dispatch(setSnapshotType('login'));
        dispatch(registerUserWithAPI(imageBase64, userType, userInfo));
      }
      if (snapshotType === 'login') dispatch(loginUserWithAPI(imageBase64, userType))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshot));
