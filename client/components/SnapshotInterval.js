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
    const video = document.getElementById('video');
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    }
  }

  capture() {
    // Elements for taking the snapshot
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, 640, 480); // Taking photo
    var dataURL = canvas.toDataURL(); // Base64

    // Interval for timer photos
    // This works even when browser is minimized!!!
    const kaptureTimer = () => {
      context.drawImage(video, 0, 0, 640, 480);
      console.log(canvas.toDataURL().slice(0, 30));
    }
    setInterval(kaptureTimer, 3000);

    // this.props.sendCapture(dataURL, this.props.studentInfo.userType, this.props.studentInfo.id, this.props.snapshotType)
  }

  render() {
    return (
      <div>
        <video id="video" width="0" height="0" autoPlay />
        <button id="snap" onClick={this.capture}>Kapture Myself</button>
        <canvas id="canvas" width="640" height="480" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentInfo: state.signup,
    snapshotType: state.snapshotType
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
