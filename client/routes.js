import React, { Component } from 'react';
// import { connect } from 'react-redux'
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './history';

import { Welcome, Main, Snapshot, StudentDashboard, InstructorDashboard, Navigation, Toast } from './components';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Navigation>
          <Toast />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/students" component={Main} />
            <Route exact path="/students/:id" component={StudentDashboard} />
            <Route exact path="/instructors" component={Main} />
            <Route exact path="/instructors/:id" component={InstructorDashboard} />
            <Route exact path="/snapshot" component={Snapshot} />
          </Switch>
        </Navigation>
      </Router>
    );
  }
}
