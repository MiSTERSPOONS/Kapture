import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveUserThunk } from '../store';
import { showSpinner, removeSpinner } from '../store/spinner';
import { Snapshot } from '../components';
import Spinner from './Spinner';
import Graphs from './Graphs';

import socket from '../socket'

class InstructorDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentId: null,
    }
    this.displayEmotions = this.displayEmotions.bind(this)
    this.kaptureClassEmotion = this.kaptureClassEmotion.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getStudentEmotion(this.props.userType || 'instructors', this.props.match.params.id);
    socket.on('doneKapturing', () => {
      this.props.removeSpinner();
      this.props.getStudentEmotion(this.props.userType || 'instructors', this.props.match.params.id)
    })
  }

  kaptureClassEmotion() {
    this.props.showSpinner();
    socket.emit('kaptureImage')
  }

  displayEmotions() {
      const studentArr = this.props.students.filter(student => {
        return student.id === Number(this.state.studentId);
      })
      const studentEmotion = studentArr[0] && studentArr[0].emotions;
      return studentEmotion;
  }

  handleChange(event) {
    const studentId = event.target.value;
    this.setState({ studentId });
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
      <div id="instructor-container">
        {
          this.props.spinnerStatus &&
          <div>
              <Spinner />
              <div style={backDrop}></div>
          </div>

        }
        <select className="form-control" onChange={this.handleChange}>
          <option value={this.state.studentId}>Select a Student</option>
          {
            this.props.students && this.props.students.map(student => {
              return (
                <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
              )
            })
          }
        </select>
        <div className="center">
          <button className="kapture-button" onClick={this.kaptureClassEmotion}>Kapture Class Emotions
          </button>
        </div>
        {
          this.state.studentId && this.props.currentUser.id ?
          <Graphs emotions={this.displayEmotions()} /> :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.userType,
    currentUser: state.currentUser,
    students: state.currentUser.students,
    spinnerStatus: state.spinner
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudentEmotion: (type, id) => {
      dispatch(retrieveUserThunk(type, id));
    },
    showSpinner: () => {
      dispatch(showSpinner());
    },
    removeSpinner: () => {
      dispatch(removeSpinner());
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InstructorDashboard));
