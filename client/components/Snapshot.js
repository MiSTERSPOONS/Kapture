import React, { Component } from 'react';
import { connect } from 'react-redux';
// import api from '../../api_secrets.js';
import Webcam from 'react-webcam';
import { withRouter } from 'react-router-dom';
import { enrollKairosCapture } from '../store/signup';

class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    // this.capture = this.capture.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  handleClick(event, id) {
    const imageSrc = this.webcam.getScreenshot().slice(22);
    this.props.capture(imageSrc, id)
  }

  // capture() {
  //   const imageSrc = this.webcam.getScreenshot().slice(22);
  //   // const kairos = new Kairos(api["api_id"], api["api_key"]);
  //   // const { id } = this.props.studentInfo;
  //   // kairos.enroll(imageSrc, "test", id, (response) => {
  //   //   console.log(JSON.parse(response.responseText));
  //   // });

  //   // kairos.verify(imageSrc, 'test', '1', (response) => {
  //   //   console.log(JSON.parse(response.responseText).images[0].transaction.confidence);
  //   // });
  // }

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
        <button onClick={(event) => this.handleClick(event, this.props.studentInfo.id)}>Capture photo</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    studentInfo: state.signup
  });

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    capture: (imageSrc, id) => {
      const who = ownProps.match.url.slice(1)
      dispatch(enrollKairosCapture(imageSrc, who, id));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshot));
