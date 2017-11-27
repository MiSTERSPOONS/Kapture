import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveUserThunk } from '../store';
import { Snapshot } from '../components';
import Graphs from './Graphs';

import socket from '../socket';

class StudentDashboard extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getStudentEmotion(this.props.userType || 'students', this.props.match.params.id);
  }

  
  render() {
    let student = this.props.currentUser;
    return (
      <div>
      <Snapshot display="none" />
      <h1>Hello, {student.firstName}!</h1>
      {
        student.emotions &&
        <Graphs emotions={student.emotions}/>
      }
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
