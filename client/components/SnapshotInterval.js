import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { enrollKairosCapture } from '../store/signup';
import { loginKairosCapture } from '../store/login';

class SnapshotInterval extends Component {
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
    const dataURL = canvas.toDataURL(); // Base64

    this.props.sendCapture(dataURL, this.props.studentInfo.userType, this.props.studentInfo.id, this.props.snapshotType)
  }

  captureInterval() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 320, 240); // Taking photo
    var dataURL = canvas.toDataURL(); // Base64

    const kaptureTimer = () => {
      context.drawImage(video, 0, 0, 320, 240);
      console.log(canvas.toDataURL().slice(0, 30));
    }
    setInterval(kaptureTimer, this.props.interval);

    // this.props.sendCapture(dataURL, this.props.studentInfo.userType, this.props.studentInfo.id, this.props.snapshotType)
  }

  render() {
    return (
      <div>
        <video id="video" width="0" height="0" autoPlay />
        <button id="snap" onClick={this.capture}>Kapture Myself</button>
        <canvas id="canvas" width="320" height="240" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentInfo: state.signup,
    snapshotType: state.snapshotType,
    display: ownProps.display,
    interval: 3000// INTERVAL SETTING FROM INSTRUCTOR LATER?
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendCapture: (imageSrc, who, id, snapshotType) => {
      if (snapshotType === 'signup') dispatch(enrollKairosCapture(imageSrc, who, id));
      if (snapshotType === 'login') dispatch(loginKairosCapture(imageSrc, ownProps.match.path.slice(1)))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SnapshotInterval));
