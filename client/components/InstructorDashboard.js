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
      emotions: null,
    }
    this.displayEmotions = this.displayEmotions.bind(this)
    this.kaptureClassEmotion = this.kaptureClassEmotion.bind(this)
  }

  componentDidMount() {
    this.props.getStudentEmotion(this.props.userType || 'instructors', this.props.match.params.id);
    socket.on('doneKapturing', () => {
      this.props.getStudentEmotion(this.props.userType || 'instructors', this.props.match.params.id)
      let id = document.getElementById('students').value
      this.displayEmotions(id)
    })
  }

  kaptureClassEmotion() {
    socket.emit('kaptureImage')
  }

  displayEmotions(id) {
    // const studentId = event.target.students.value
    const studentArr = this.props.students.filter(student => {
      return student.id == id
    })
    const studentEmotion = studentArr[0].emotions
    this.setState({emotions: studentEmotion})
    // this.forceUpdate()
  }
  
  render() {
    return (
      <div>
        <button onClick={this.kaptureClassEmotion}>Kapture Class Emotions
        </button>
        <form ref="refForm" onSubmit={(event) => {
          event.preventDefault()
          this.displayEmotions(event.target.students.value)}}>
        <select name='students' id='students'>
          {
            this.props.students && this.props.students.map(student => {
              return (
                <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
              )
            })
          }
        </select>
        <button id="renderGraph" type='submit'>
          Chart Emotions
        </button>
        </form>
        {
          this.state.emotions ?
          <Graphs emotions={this.state.emotions} /> :
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
