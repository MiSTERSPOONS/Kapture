import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Login from './Login';
import SignUp from './SignUp';

const Main = props => (
  <div>
    {
      !props.snapshotType ?
        <div id="flextest">
          <SignUp />
          <Login />
        </div>
        :
        <Login />
    }
  </div>
);

const mapStateToProps = state => ({
  snapshotType: state.snapshotType
});

export default withRouter(connect(mapStateToProps)(Main));
