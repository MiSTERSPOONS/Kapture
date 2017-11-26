import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSnapshotType } from '../store';
import history from '../history';
import { loginEmailPassword } from '../store'

// const logInForm = () => {
// console.log('hitting loginform function')
// return (
//   <div>
//   <form>
//   <div>
//     <label>Email: </label>
//     <input type="text" name="email" />
//   </div>
//   <div>
//     <label>Password: </label>
//     <input type="password" name="password" />
//   </div>
//   <button className="btn btn-success">Submit</button>
// </form>
// </div>
// )}

const Login = (props) => (
  <div>
    <h1>Login</h1>
    <button onClick={props.loginWithFace} className="btn btn-success">Login with Face</button>
    <p onClick={props.showLoginForm}>Login like a boring person</p>
    <form id="login-form" onSubmit={(event) => props.submitBoringLogin(event, props.userType)}>
      <div>
        <label>Email:
              <input className="form-control" type="text" name="email" required="required" />
        </label>
      </div>
      <div>
        <label>Password:
              <input className="form-control" type="password" name="password" required="required" />
        </label>
      </div>
      <button type="submit">Login
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
    console.log('Hitting submitBoringLogin')
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(loginEmailPassword(email, password, userType))
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
