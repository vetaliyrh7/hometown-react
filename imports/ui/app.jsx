import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
// CUSTOM COMPONENTS
import NavBar from './components/nav-bar.jsx';
import Footer from './components/footer.jsx';

export default class App extends Component {
  render () {
      return (
        <div className="root">
          <NavBar title="Main" />
          {this.props.children}
          <Footer />
        </div>
      );
  }
}
