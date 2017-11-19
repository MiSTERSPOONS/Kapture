import React, { Component } from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
import { withRouter } from 'react-router-dom';
import { enrollKairosCapture } from '../store/signup';
import { loginKairosCapture } from '../store/login';

class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const imageSrc = this.webcam.getScreenshot().slice(22);
    this.props.sendCapture(imageSrc, this.props.studentInfo.userType, this.props.studentInfo.id, this.props.snapshotType)
  }

  render() {
    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/png"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshot));
