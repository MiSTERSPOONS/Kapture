import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveUserThunk } from '../store';
import { Snapshot } from '../components';
import Spinner from './Spinner';
import Graphs from './Graphs';

import socket from '../socket';

class StudentDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: null,
      answer: null,
      isSetIntervalOn: false
    }
  }
  componentDidMount() {
    this.props.getStudentEmotion(this.props.userType || 'students', this.props.match.params.id);
    socket.on('sendQuiz', (payload) => {
      this.setState({
        quiz: payload,
      })
    })
  }

  render() {
    let student = this.props.currentUser;
    return (
      <div id="student-container">
        {
          !!this.state.quiz &&
          <div className="answerForm">
            <h1>Title: {this.state.quiz.title}</h1>
            <h3>Question:</h3>
            <p>{this.state.quiz.question}</p>
            <form onSubmit={(event) => {
              event.preventDefault();
              const answer = event.target.answer.value;
              socket.emit('submitAnswer', {studentId: this.props.currentUser.id, answer, title: this.state.quiz.title });
              this.setState({
                quiz: null,
                answer,
              });
            }}>
              <div className="form-group">
                <label htmlFor="answer">Answer:</label>
                <textarea className="form-control" name="answer" placeholder="Type your answer...."></textarea>
              </div>
              <button className="submit-answer-button" type="submit">Create</button>
            </form>
          </div>
        }
        {
          !!this.state.quiz &&
          <div className="backdrop" />
        }
        <div>
          <Snapshot display="none" />
          <h1>Hello, {student.firstName}!</h1>
          {
            student.emotions &&
            <Graphs emotions={student.emotions}/>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.userType,
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudentEmotion: (type, id) => {
      dispatch(retrieveUserThunk(type, id));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentDashboard));
