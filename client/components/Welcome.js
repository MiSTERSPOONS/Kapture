import React from 'react';
import { Link } from 'react-router-dom'

const Welcome = () => {
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

export default Welcome;
