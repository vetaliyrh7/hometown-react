import React, { PropTypes, Component } from "react";
import { browserHistory, Link } from 'react-router';
import FaBars from 'react-icons/lib/fa/bars';

// Theme components

export default class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            activated: false
        }
    }

    isMenuOpen() {
        const {activated} = this.state;
        this.setState({
            activated: !activated
        })
    }

    render() {
        const { activated } = this.state;
        const showed = activated ? 'showed' : '';

        return (
            <ul className={`nav ${showed}`}>
                <li><Link to="/">Main</Link></li>
                <li><Link to="/education">Education</Link></li>
                <li><Link to="/films">Films & Theatres</Link></li>
                <li><Link to="/sights">Sights</Link></li>
                <li>
                    <Link to="/dashboard/posts" className="settings-btn">
                        Settings
                    </Link>
                </li>
                <div className="open-menu-trigger" onClick={this.isMenuOpen.bind(this)}>
                    <FaBars />
                </div>
            </ul>
        );
    }
}

NavBar.propTypes = {
    title: PropTypes.string,
    isShowed: PropTypes.bool
};