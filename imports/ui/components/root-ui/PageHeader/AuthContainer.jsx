import React, { PropTypes, Component } from "react";
import { browserHistory, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaSearch from 'react-icons/lib/fa/search';
import _ from 'lodash';

//SCSS files
import './Auth.scss';

//Custom components

//API imports
import { User } from '../../../../api';

class AuthContainer extends Component {

    constructor() {
        super();
        this.state = {
            register: false
        };
    }

    toggleRegister() {
        const { register } = this.state;
        this.setState({
            register: !register
        });
    }

    render() {
        const { register } = this.state;
        const { rootClass } = this.props;
        return (
            <div className={`auth-container ${rootClass}`}>
                <div className="content">
                    { !!register && <input type="text" placeholder="Enter username..."/> }
                    <input type="text" placeholder="Enter Email..."/>
                    <input type="password" placeholder="Enter password..."/>
                    <div className="reg-login">
                        { !!register
                            ? <span className="login-btn my-btn">Sign Up</span>
                            : <span className="login-btn my-btn">Sign In</span>}
                        { !!register
                            ? <span className="reg-sign" onClick={this.toggleRegister.bind(this)}>Cancel</span>
                            : <span className="reg-sign" onClick={this.toggleRegister.bind(this)}>Create account</span>}

                    </div>
                </div>
            </div>
        );
    }
}

AuthContainer.propTypes = {
    rootClass: PropTypes.string,
    changeLogInClass: PropTypes.func
};

export default createContainer(() => {
    return {
    };
}, AuthContainer);
