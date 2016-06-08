import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Router, Route, browserHistory } from 'react-router'

import MainPage from '../imports/ui/main-page.jsx'
import EducationPage from '../imports/ui/containers/education.jsx'
import FilmsPage from '../imports/ui/containers/films.jsx'
import SightsPage from '../imports/ui/containers/sights.jsx'

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path='/' component={MainPage} />
      <Route path='/education' component={EducationPage} />
      <Route path='/films' component={FilmsPage} />
      <Route path='/sights' component={SightsPage} />
    </Router>), document.getElementById('render-app'))
})
