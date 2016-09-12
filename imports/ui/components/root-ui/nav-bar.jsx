import React, { PropTypes, Component } from "react";
import { browserHistory, Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MdSettings from 'react-icons/lib/md/settings';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
// Theme components
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            activated: false
        }
    }

    toggleMenu() {
        const { activated } = this.state;
        this.setState({
            activated: !activated
        });
    }

    render() {
        const { activated } = this.state;
        const showed = !!activated ? 'showed' : '';

        return (
            <div className={`left-side-nav ${showed}`} onClick={this.toggleMenu.bind(this)}>
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
                <div className="arrows-block">
                    {!!activated ? <FaAngleLeft /> : <FaAngleRight />}
                </div>
            </div>
        );
    }
}

NavBar.propTypes = {
    title: PropTypes.string
};