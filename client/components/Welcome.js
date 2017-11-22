import React from 'react';
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
      <div>
        <h1>Welcome to Kapture</h1>
        <p>I am a...</p>
        <Link to="/students"><button>Student</button></Link>
        <Link to="/instructors"><button>Instructor</button></Link>
      </div>
  )
}

export default Welcome;
