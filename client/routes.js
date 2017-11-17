import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import history from './history'

import { Main } from './components'
import { SignUp } from './components'

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/students" component={SignUp}/>
          <Route exact path="/instructors" component={SignUp}/>
        </Switch>
      </Router>
    )
  }
}
