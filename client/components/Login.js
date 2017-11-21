import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { snapshotType } from '../store';
import { Snapshot } from '../components';

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
    props.login ?
    <div>
      <Snapshot display="" />
    </div>
    :
    <div>
      <h1>Login</h1>
      <button onClick={props.loginWithFace} className="btn btn-success">Login with Face</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    login: state.snapshotType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginWithFace: () => {
      dispatch(snapshotType('login'))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
