import React, { Component } from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
import { withRouter } from 'react-router-dom';
import { enrollKairosCapture } from '../store/signup';

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
    this.props.sendCapture(imageSrc, this.props.studentInfo.id)
  }

  render() {
    console.log("This is this.props! ", this.props)
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

const mapStateToProps = (state) => ({
    studentInfo: state.signup
  });

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendCapture: (imageSrc, id) => {
      const who = ownProps.match.url.slice(1)
      dispatch(enrollKairosCapture(imageSrc, who, id));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshot));
