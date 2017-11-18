import React, { Component } from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';

class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
    };
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageSrc });
  }

  render() {
    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
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

export default connect(mapStateToProps, null)(Snapshot);
