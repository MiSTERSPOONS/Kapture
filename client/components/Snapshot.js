import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store, { setSnapshotType, registerUserWithAPI, loginUserWithAPI } from '../store';
import socket from '../socket'
import Spinner from './Spinner';

class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.capture = this.capture.bind(this);
  }


  componentDidMount() {
    socket.on('kaptureImage', () => {
      this.capture()
    })
    const videoBox = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        videoBox.src = window.URL.createObjectURL(stream);
        videoBox.play();
      });
    }
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
      <div id="snapshot-container">
        {
          this.props.spinnerStatus &&
          <div>
              <Spinner />
              <div style={backDrop}></div>
          </div>
        }
        <div className="center">
          <video id="video" width="640" height="480" autoPlay style={{ display: this.props.display }} />
        </div>
        {
          this.props.path.slice(1).startsWith('snap') &&
          <div className="center">
            <button className="kapture-button" id="snap" onClick={this.capture}>Kapture Myself</button>
          </div>
        }
        <canvas id="canvas" width="640" height="480" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    path: ownProps.match.path,
    currentUser: state.currentUser,
    userType: state.userType,
    snapshotType: state.snapshotType,
    display: ownProps.display,
    spinnerStatus: state.spinner
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendCapture: (imageBase64, userType, userInfo, snapshotType) => {
      if (snapshotType === 'signup') {
        dispatch(setSnapshotType('login'));
        dispatch(registerUserWithAPI(imageBase64, userType, userInfo));
      } else {
        dispatch(loginUserWithAPI(imageBase64, userType))
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshot));

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
