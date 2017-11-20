import React, { Component } from 'react';
// import { connect } from 'react-redux'
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './history';

import { Welcome, Main, Snapshot, StudentDashboard } from './components';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/students" render={(routeProps) => <Main {...routeProps} />} />
          <Route exact path="/students/:id" component={StudentDashboard} />
          <Route exact path="/instructors" component={Main} />
          <Route exact path="/snapshot" component={Snapshot} />
        </Switch>
      </Router>
    );
  }
}
