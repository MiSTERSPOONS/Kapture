import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSnapshotType } from '../store';
import history from '../history';

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

const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={props.loginWithFace} className="btn btn-success">Login with Face</button>
      <p onClick={props.showLoginForm}>Login like a boring person</p>
      <div id="login-form">
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
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    snapshotType: state.snapshotType,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginWithFace: () => {
      dispatch(setSnapshotType('login'))
      history.push('/snapshot');
    },
    showLoginForm: () => {
      $('#login-form').toggle('fast');
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
