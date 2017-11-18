import React from 'react';
import { connect } from 'react-redux';

const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email: </label>
          <input type="text" name="email" />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  )
}

export default Login;