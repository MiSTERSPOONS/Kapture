import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveUserThunk } from '../store';
import { Snapshot } from '../components';
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
      this.props.getStudentEmotion(this.props.userType || 'instructors', this.props.match.params.id)
    })
  }

  kaptureClassEmotion() {
    socket.emit('kaptureImage')
  }

  displayEmotions() {
    const studentArr = this.props.students.filter(student => {
      return student.id === Number(this.state.studentId);
    })
    const studentEmotion = studentArr[0].emotions;
    return studentEmotion;
  }

  handleChange(event) {
    const studentId = event.target.value;
    this.setState({ studentId });
  }

  render() {
    return (
      <div>
        <button onClick={this.kaptureClassEmotion}>Kapture Class Emotions
        </button>
        <select onChange={this.handleChange}>
          <option>Select a Student</option>
          {
            this.props.students && this.props.students.map(student => {
              return (
                <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
              )
            })
          }
        </select>
        {
          this.state.studentId ?
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
    students: state.currentUser.students
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudentEmotion: (type, id) => {
      dispatch(retrieveUserThunk(type, id));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InstructorDashboard));
