import React, { PropTypes, Component } from "react";
import { browserHistory, Link } from 'react-router';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

// Theme components

export default class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            activated: false
        }
    }


    render() {
        const { activated } = this.state;
        const showed = !!activated ? 'showed' : '';

        return (
            <ul className="nav">
                <li><Link to="/">Main</Link></li>
                <li><Link to="/education">Education</Link></li>
                <li><Link to="/films">Films & Theatres</Link></li>
                <li><Link to="/sights">Sights</Link></li>
                <li>
                    <Link to="/dashboard/posts" className="settings-btn">
                        Settings
                    </Link>
                </li>
            </ul>
        );
    }
}

NavBar.propTypes = {
    title: PropTypes.string
};