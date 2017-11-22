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
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
