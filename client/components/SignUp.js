import React from 'react';
import { connect } from 'react-redux';
import { setUser, setSnapshotType, setToast } from '../store';
import { withRouter } from 'react-router-dom';
import history from '../history';

const SignUp = (props) => {
  return (
    <div id="signup-container">
      <form onSubmit={(event) => props.handleSubmit(event)}>
        <h1>Sign Up!</h1>
        <div>
          <label>First Name:
            <input className="form-control" type="text" name="first" required="required" />
          </label>
        </div>
        <div>
          <label>Last Name:
            <input className="form-control" type="text" name="last" required="required" />
          </label>
        </div>
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
        <div>
          <label>Confirm Password:
            <input className="form-control" type="password" name="confirmPass" required="required" />
          </label>
        </div>
        <button className="kapture-button">Kapture Myself</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault()
      const userInfo = {
        firstName: event.target.first.value,
        lastName: event.target.last.value,
        email: event.target.email.value.toLowerCase(),
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
        dispatch(setToast({
          errorType: 'Sign Up',
          message: 'Passwords do not Match',
          color: 'yellow'
        }))
      }
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
