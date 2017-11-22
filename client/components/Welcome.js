import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { setUserType } from '../store';

const Welcome = (props) => {
  return (
      <div>
        <h1>Welcome to Kapture</h1>
        <p>I am a...</p>
        <Link to="/students"><button onClick={ () => {props.setUserType('students')} } >Student</button></Link>
        <Link to="/instructors"><button onClick={ () => {props.setUserType('instructors')} } >Instructor</button></Link>
      </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserType: (userType) => {
      dispatch(setUserType(userType));
    }
  }
};

export default connect(null, mapDispatchToProps)(Welcome);
