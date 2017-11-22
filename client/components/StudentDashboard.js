import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveUserThunk } from '../store';
import { Snapshot } from '../components';

class StudentDashboard extends Component {
  componentDidMount() {
    this.props.getStudentEmotion(this.props.userType || 'students', this.props.match.params.id);
  }
  render() {
    let student = this.props.currentUser;
    return (
      <div>
        <Snapshot display="none" />
        <h1>Hello, {student.firstName}!</h1>
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
            student.emotions ?
            student.emotions.map(emoData => {
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
    userType: state.userType,
    currentUser: state.currentUser
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
