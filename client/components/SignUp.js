import React from 'react';
import { connect } from 'react-redux';
import { submitStudentSignup } from '../store';
import Login from './Login';

const SignUp = (props) => {
  console.log('props', props)
  return (
    <div id='flextest'>
      <form onSubmit={(event) => props.handleSubmit(event)}>
        <h1>Sign Up!</h1>
        <div>
          <label>Name: </label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Email: </label>
          <input type="text" name="email" />
        </div>
        <div>
          <label>Password: </label>
          <input type="text" name="password" />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="text" name="confirmPass" />
        </div>
        <button className="btn btn-success">Kapture Myself</button>
      </form>
      <Login />
    </div>
  )
};

// STILL NEED TO FIGURE OUT WHAT TO DO WITH CONFIRM PASSWORD

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      const studentInfo = {
        name: event.name.target.value,
        email: event.email.target.value,
        password: event.password.target.value,
      }
      console.log('studentinfo***', studentInfo)
      console.log('dispatching submitStudent........')
      dispatch(submitStudentSignup(studentInfo))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
