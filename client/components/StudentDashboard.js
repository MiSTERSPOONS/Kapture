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
        <h1>KINDA LOGGED IN!!!</h1>
        {/*need to map*/}
        {/*<tr key={emotion.id}>

        </tr>*/}
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
