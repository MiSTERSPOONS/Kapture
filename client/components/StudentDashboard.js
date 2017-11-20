import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveStudentThunk } from '../store';

class StudentDashboard extends Component {
  componentDidMount() {
    this.props.getStudentEmotion();
  }
  render() {
    return (
      <div>
        <h1>Hello, {this.props.currentStudent.firstName}!</h1>
        <table>
          <thead>
            <tr>
              <th>Anger</th>
              <th>Contempt</th>
              <th>Disgust</th>
              <th>Fear</th>
              <th>Happiness</th>
              <th>Neutral</th>
              <th>Sadness</th>
              <th>Surprise</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.currentStudent.emotions ?
              this.props.currentStudent.emotions.map(emoData => {
                return (
                <tr key={emoData.id}>
                  <td>{emoData.anger}</td>
                  <td>{emoData.contempt}</td>
                  <td>{emoData.disgust}</td>
                  <td>{emoData.fear}</td>
                  <td>{emoData.happiness}</td>
                  <td>{emoData.neutral}</td>
                  <td>{emoData.sadness}</td>
                  <td>{emoData.surprise}</td>
                </tr>
                )
              })
              :
              null
          }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentStudent: state.currentStudent
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const studentId = ownProps.match.params.id;
  return {
    getStudentEmotion: () => {
      dispatch(retrieveStudentThunk(studentId));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentDashboard));
