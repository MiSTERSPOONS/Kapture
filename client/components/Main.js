import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import SignUp from './SignUp';

const Main = props => (
  <div id="flextest">
      <SignUp />
      <Login />
    </div>
);

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Main);
