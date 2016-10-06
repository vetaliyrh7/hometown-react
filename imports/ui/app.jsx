import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//SCSS files

// CUSTOM COMPONENTS
import PageHeader from './components/root-ui/PageHeader';
import NavBar from './components/root-ui/nav-bar';
import './components/root-ui/root.scss';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            menuOpen: false
        }
    }

    render() {
        return (
            <div className="root">
                <NavBar />
                <PageHeader />
                {this.props.children}
            </div>
        );
    }
}
