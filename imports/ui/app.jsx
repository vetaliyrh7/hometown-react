import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// CUSTOM COMPONENTS
import NavBar from './components/root-ui/nav-bar.jsx';
import Footer from './components/root-ui/footer.jsx';

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
