import React from 'react';
import { connect } from 'react-redux';
import { submitPersonSignup } from '../store/signup';
import { withRouter } from 'react-router-dom';
import { Snapshot } from '../components';
import { snapshotType } from '../store';

const SignUp = (props) => {
  return (
      props.signup.id ?
      <div>
        <Snapshot display="" />
      </div>
        :
        <div>
          <form onSubmit={(event) => props.handleSubmit(event)}>
            <h1>Sign Up!</h1>
            <div>
              <label>First Name: </label>
              <input type="text" name="first" required="required" />
            </div>
            <div>
            <label>Last Name: </label>
            <input type="text" name="last" required="required" />
          </div>
            <div>
              <label>Email: </label>
              <input type="text" name="email" required="required" />
            </div>
            <div>
              <label>Password: </label>
              <input type="password" name="password" required="required" />
            </div>
            <div>
              <label>Confirm Password: </label>
              <input type="password" name="confirmPass" required="required" />
            </div>
            <button className="btn btn-success">Kapture Myself</button>
          </form>
        </div>
  )
};

// STILL NEED TO FIGURE OUT WHAT TO DO WITH CONFIRM PASSWORD

const mapStateToProps = (state) => {
  return {
    signup: state.signup
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const who = ownProps.match.url.slice(1)
  return {
    handleSubmit: (event) => {
      event.preventDefault()
      const personInfo = {
        firstName: event.target.first.value,
        lastName: event.target.last.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }
      if (event.target.confirmPass.value === personInfo.password) {
        dispatch(snapshotType('signup'));
        dispatch(submitPersonSignup(personInfo, who))
        event.target.first.value = '';
        event.target.last.value = '';
        event.target.email.value = '';
        event.target.password.value = '';
        event.target.confirmPass.value = '';
      } else {
        alert('Passwords do not Match')
      }
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
