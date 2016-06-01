import React from "react";
import { render } from "react-dom";
import { Meteor } from "meteor/meteor";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import MainPage from "../imports/ui/main-page.jsx";
import EducationPage from "../imports/ui/containers/education.jsx";

Meteor.startup(() => {
  render((
  <Router history={browserHistory}>
    <Route path="/" component={MainPage} />
    <Route path="/education" component={EducationPage} />
  </Router>),document.getElementById('render-app'))
});
