import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSnapshotType } from '../store';
import history from '../history';
import { loginEmailPassword } from '../store'

const Login = (props) => (
  <div id="login-container">
    <h1 className="center">Login</h1>
    <div className="login-buttons">
      <button onClick={props.loginWithFace} className="kapture-button">Login with Face</button>
      <button onClick={props.showLoginForm} className="kapture-button email-login-button">Login With Email</button>
    </div>
    <form id="login-form" onSubmit={(event) => props.submitBoringLogin(event, props.userType)}>
      <div>
        <label>Email:
              <input className="form-control" type="email" name="email" required="required" />
        </label>
      </div>
      <div>
        <label>Password:
              <input className="form-control" type="password" name="password" required="required" />
        </label>
      </div>
      <button className="kapture-button" type="submit">Login
      </button>
    </form>
  </div>
);

const mapStateToProps = (state) => ({
  snapshotType: state.snapshotType,
  userType: state.userType
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loginWithFace: () => {
    dispatch(setSnapshotType('login'))
    history.push('/snapshot');
  },
  showLoginForm: () => {
    $('#login-form').toggle('fast');
  },
  submitBoringLogin: (event, userType) => {
    event.preventDefault();
    const email = event.target.email.value.toLowerCase();
    const password = event.target.password.value;
    dispatch(loginEmailPassword(email, password, userType))
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
