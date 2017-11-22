import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store, { setSnapshotType, registerUserWithAPI, loginUserWithAPI } from '../store';

class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.capture = this.capture.bind(this);
  }

  componentDidMount() {
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
      this.props.snapshotType || 'login',
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
      <div>
        <video id="video" width="320" height="240" autoPlay style={{ display: this.props.display }} />
        <button id="snap" onClick={this.capture}>Kapture Myself</button>
        <canvas id="canvas" width="320" height="240" />
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
