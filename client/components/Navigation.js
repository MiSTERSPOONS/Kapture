import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store'
import PropTypes from 'prop-types';


const Navigation = (props) => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Kapture</Link>
      {
        props.currentUser.id ?
          <a href="#" onClick={props.handleClick}>Logout</a>
          :
          null
      }
      </nav>
      {
        props.children
      }
      </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));

Navigation.propTypes = {
  children: PropTypes.array
}
