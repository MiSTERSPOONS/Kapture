import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { me } from '../store';

export class Welcome extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMe()
  }

  render() {
    return (
      <div className="center" id="welcome-container">
        <img src="/images/logo.png" />
        <div>
          <h1>Welcome to Kapture</h1>
          <p>I am a...</p>
          <div className="welcome-button-container">
            <Link className="welcome-button" to="/students">Student</Link>
            <Link className="welcome-button" to="/instructors">Instructor</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => {
      dispatch(me())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
