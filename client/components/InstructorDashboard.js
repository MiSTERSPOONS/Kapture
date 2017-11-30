import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveUserThunk } from '../store';
import { showSpinner, removeSpinner } from '../store/spinner';
import { Snapshot } from '../components';
import Spinner from './Spinner';
import Graphs from './Graphs';
// import { selectedStudentEmotions } from '../store'

import socket from '../socket'

class InstructorDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentId: null,
      isQuizFormOpen: false,
      quiz: null,
      answers: []
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
    });
    socket.on('submitAnswer', payload => {
      this.setState({
        answers: this.state.answers.concat([payload])
      })
    })
  }

  kaptureClassEmotion() {
    this.props.showSpinner();
    socket.emit('kaptureImage');
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
    return (
      <div id="instructor-container">
        {
          this.state.isQuizFormOpen &&
          <div>
            <div className="backdrop" />
            <div className="questionForm">
              <form onSubmit={(event) => {
                const quiz = {
                  title: event.target.title.value,
                  question: event.target.question.value
                };
                event.preventDefault();
                this.setState(() => {
                  socket.emit('sendQuiz', quiz);
                  return {
                    isQuizFormOpen: false,
                    quiz
                  }
                })
              }}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input className="form-control" type="text" name="title" placeholder="Type a title" />
                </div>
                <div className="form-group">
                  <label htmlFor="question">Question</label>
                  <textarea className="form-control" name="question" placeholder="Create a question"></textarea>
                </div>
                <button className="submit-quiz-button" type="submit">Submit</button>
              </form>
            </div>
          </div>
        }
        {
          this.props.spinnerStatus &&
          <div>
              <Spinner />
              <div className="backdrop" />
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
          <button className="quiz-button" onClick={(_) => {
            this.setState({
              isQuizFormOpen: true
            })
          }}>Create Quiz</button>
        </div>
        {
          this.state.studentId && this.props.currentUser.id ? <Graphs emotions={this.displayEmotions()} /> : <div>NO LENGTH</div>
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
