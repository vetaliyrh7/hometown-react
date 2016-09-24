import React, { PropTypes, Component } from "react";
import { browserHistory, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

// SCSS files
import './Auth.scss';

//API imports
import { User, SignUp, SignIn, SignOut } from '../../../../api';

class AuthContainer extends Component {

    constructor() {
        super();
        this.state = {
            userData: {
                username: '',
                email: '',
                password: ''
            },
            register: false
        };
    }

    changeInput(inputName, ev) {
        const { value } = ev.target;
        const newState = _.set(this.state.userData, inputName, value);
        this.setState({ userData: newState });
    }

    toggleRegister() {
        const { register } = this.state;
        this.setState({
            register: !register
        });
    }

    isSuccess(data) {
        if(!!data) {
            this.setState({error: true});
        }
        else {
            this.props.changeLogInClass();
            this.setState({error: false})
        }
    }

    loginUser() {
        const { userData } = this.state;
        SignIn(userData, this.isSuccess.bind(this));
    }

    logoutUser() {
        SignOut();
        this.props.changeLogInClass();
    }

    registerUser() {
        const { userData } = this.state;
        SignUp(userData).then((res) => {
            this.loginUser()
        })
    }

    renderLogInTemplate() {
        const { error, register, userData: { username, password, email } } = this.state;
        return(
            <div className="content">
                { !!register && <input type="text" value={username} placeholder="Enter username..."
                                       onChange={this.changeInput.bind(this, 'username')}/> }
                <input type="text" value={ email } placeholder="Enter Email..."
                       onChange={this.changeInput.bind(this, 'email')} />
                <input type="password" value={password} placeholder="Enter password..."
                       onChange={this.changeInput.bind(this, 'password')}/>
                {!!error && <span className="message-error">User not found!!!</span>}
                <div className="reg-login">
                    { !!register
                        ? <span className="login-btn my-btn" onClick={this.registerUser.bind(this)}>Sign Up</span>
                        : <span className="login-btn my-btn" onClick={this.loginUser.bind(this)}>Sign In</span>}
                    { !!register
                        ? <span className="reg-sign" onClick={this.toggleRegister.bind(this)}>Cancel</span>
                        : <span className="reg-sign" onClick={this.toggleRegister.bind(this)}>Create account</span>}

                </div>
            </div>
        );
    }

    renderLogOutTemplate() {
        return(
            <div className="content">
                <span className="login-btn my-btn" onClick={this.logoutUser.bind(this)}>Sign Out</span>
            </div>
        );
    }

    render() {
        const { rootClass } = this.props;
        return (
            <div className={`auth-container ${rootClass}`}>
                {!!User.id()
                    ? this.renderLogOutTemplate()
                    : this.renderLogInTemplate()}
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
