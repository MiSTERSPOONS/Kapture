import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveUserThunk } from '../store';
import { Snapshot } from '../components';
import Graphs from './Graphs';

class InstructorDashboard extends Component {
  render() {
    return (
      <div>
        does this appear???
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InstructorDashboard));
