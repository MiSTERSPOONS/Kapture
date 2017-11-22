import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Kapture</Link>
    </nav>
  )
}

export default Navigation;
