import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import history from './history'

import { Welcome } from './components'
import { Main } from './components'
import { Snapshot } from './components'

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/students" component={Main}/>
          <Route exact path="/instructors" component={Main}/>
          <Route exact path="/snapshot" component={Snapshot}/>
        </Switch>
      </Router>
    )
  }
}