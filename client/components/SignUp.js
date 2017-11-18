import React from 'react';
import { connect } from 'react-redux';
import { submitStudentSignup } from '../store/signup';

const SignUp = (props) => {
  const state = {
    name: '',
    email: '',
    password: '',
    confirmPass: ''
  }
  return (
    <div>
      <form onSubmit={(event) => props.handleSubmit(event)}>
        <h1>Sign Up!</h1>
        <div>
          <label>First Name: </label>
          <input type="text" name="first" required="required"/>
        </div>
        <div>
        <label>Last Name: </label>
        <input type="text" name="last" required="required"/>
      </div>
        <div>
          <label>Email: </label>
          <input type="text" name="email" required="required"/>
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" required="required"/>
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="password" name="confirmPass" required="required"/>
        </div>
        <button className="btn btn-success">Kapture Myself</button>
      </form>
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
      event.preventDefault()
      const studentInfo = {
        firstName: event.target.first.value,
        lastName: event.target.last.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }
      dispatch(submitStudentSignup(studentInfo))
      event.target.first.value = '';
      event.target.last.value = '';
      event.target.email.value = '';
      event.target.password.value = '';
      event.target.confirmPass.value = '';
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
