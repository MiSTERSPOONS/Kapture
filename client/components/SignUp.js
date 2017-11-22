import React from 'react';
import { connect } from 'react-redux';
import { setUser, setSnapshotType, registerUser } from '../store';
import { withRouter } from 'react-router-dom';
import history from '../history';

const SignUp = (props) => {
  return (
    <div>
      <form onSubmit={(event) => props.handleSubmit(event, props.userType)}>
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
    userType: state.userType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (event, userType) => {
      event.preventDefault()
      const userInfo = {
        firstName: event.target.first.value,
        lastName: event.target.last.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }
      if (event.target.confirmPass.value === userInfo.password) {
        event.target.first.value = '';
        event.target.last.value = '';
        event.target.email.value = '';
        event.target.password.value = '';
        event.target.confirmPass.value = '';
        dispatch(setUser(userInfo));
        dispatch(setSnapshotType('signup'));
        history.push('/snapshot');
      } else {
        alert('Passwords do not Match')
      }
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
