import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//SCSS files

// CUSTOM COMPONENTS
import PageHeader from './components/root-ui/PageHeader';
import NavBar from './components/root-ui/nav-bar';

export default class App extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className="root">
                <PageHeader />
                <NavBar />
                {this.props.children}
            </div>
        );
    }
}
