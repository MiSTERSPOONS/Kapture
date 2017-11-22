import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Login from './Login';
import SignUp from './SignUp';
import { setUserType } from '../store';

class Main extends Component {

  componentDidMount() {
    this.props.setUserType(this.props.match.url.slice(1));
  }

  render() {
    return (
      <div>
        <div id="flextest">
          <SignUp />
          <Login />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    snapshotType: state.snapshotType
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserType: (userType) => {
      dispatch(setUserType(userType));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
