import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { Link } from 'react-router';
import Radium from 'radium';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { bubble as Menu } from 'react-burger-menu';
injectTapEventPlugin();

//SCSS files

// CUSTOM COMPONENTS
import PageHeader from './components/root-ui/PageHeader';
import NavBar from './components/root-ui/nav-bar';

let RadiumLink = Radium(Link);

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            menuOpen: false
        }
    }

    isMenuOpen() {
        const {menuOpen} = this.state;
        this.setState({
            menuOpen: !menuOpen
        })
    }

    render() {
        const {menuOpen} = this.state;
        return (
            <div className="root">
                <div  id="outer-container">
                    <Menu noOverlay isOpen={menuOpen} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                        <NavBar />
                    </Menu>
                    <button className="nav-btn-open" onClick={this.isMenuOpen.bind(this)}> >> </button>
                    <div id="page-wrap">
                        <PageHeader />
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
