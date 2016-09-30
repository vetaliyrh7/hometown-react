import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../imports/ui/app';
import MainPage from '../imports/ui/containers/main-page';
import EducationPage from '../imports/ui/containers/education';
import FilmsPage from '../imports/ui/containers/films';
import NotImplemented from '../imports/ui/containers/NotImplemented';
import SightsPage from '../imports/ui/containers/sights';
import Dashboard from '../imports/ui/containers/dashboard';
import PostsList from '../imports/ui/components/dash/posts';
import SinglePost from '../imports/ui/components/dash/single-post';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={MainPage} />
        <Route path='/education' component={EducationPage} />
        <Route path='/films' component={FilmsPage} />
        <Route path='/sights' component={SightsPage} />
        <Route path='/dashboard' component={Dashboard}>
            <IndexRoute component={PostsList} />
            <Route path='/dashboard/posts' component={PostsList} />
            <Route path='/dashboard/posts/:postID' component={SinglePost} />
            <Route path='/dashboard/users' component={PostsList} />
            <Route path='/dashboard/theme' component={PostsList} />
            <Route path='/dashboard/my-account' component={PostsList} />
            <Route path='*' component={NotImplemented} />
        </Route>
      </Route>
    </Router>), document.getElementById('render-app'));
});
