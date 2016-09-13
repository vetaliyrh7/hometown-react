import React, { PropTypes, Component } from "react";
import { browserHistory, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaSearch from 'react-icons/lib/fa/search';
import _ from 'lodash';

//SCSS files
import './root.scss';

//Custom components
import AuthContainer from './PageHeader/AuthContainer';

//API imports
import { User } from '../../../api';

class PageHeader extends Component {

    constructor() {
        super();
        this.state = {
            openSearch: false,
            showLogin: false
        };
    }

    //const isDynamic = window.pageYOffset > 154;

    toggleSearch() {
        const { openSearch } = this.state;
        this.setState({
            openSearch: !openSearch
        });
    }

    toggleLogin() {
        const { showLogin } = this.state;
        this.setState({
            showLogin: !showLogin
        });
    }

    render() {
        const { openSearch, showLogin } = this.state;
        const { user, isLoggedIn } = this.props;
        const open = openSearch ? 'open' : '';
        const loginToggle = !!showLogin ? 'show-auth' : '';

        return (
            <div className="root-head">
                <h2 className="header-text">
                    <span>Home</span>
                    <span className="secondary-text">Town</span>
                    <div className="search-box">
                        <input className={`search-posts ${open}`} type="text" placeholder="Search..."/>
                        <FaSearch className="search-ico" onClick={this.toggleSearch.bind(this)} />
                    </div>
                    <div className="auth-nav">
                        { isLoggedIn
                            ? user.name
                            : <span className={`sign-in ${loginToggle}`} onClick={this.toggleLogin.bind(this)}>Sign In</span> }
                        <AuthContainer rootClass={ loginToggle } changeLogInClass={ this.toggleLogin.bind(this) } />
                    </div>
                </h2>
            </div>
        );
    }
}

PageHeader.propTypes = {
    user: PropTypes.object,
    isLoggedIn: PropTypes.any
};

export default createContainer(() => {
    const { get, isLoggedIn } = User;
    const posts = Meteor.subscribe('posts');
    return {
        user: get(),
        isLoggedIn: isLoggedIn()
    };
}, PageHeader);
