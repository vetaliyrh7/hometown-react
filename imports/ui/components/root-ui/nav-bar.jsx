import React, { PropTypes, Component } from "react";
import { browserHistory, Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MdSettings from 'react-icons/lib/md/settings';
// Theme components
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class NavBar extends Component {

    getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }

    render() {
        return(
          <div className="main-navigation light-blue darken-2 z-depth-1">
            <span className="title">
                <Link to="/" className="white-text">HomeTown</Link>
            </span>
            <div className="nav-list light-blue darken-4">
                <ul className="nav-bar">
                  <li><Link to="/">Main</Link></li>
                  <li><Link to="/education">Education</Link></li>
                  <li><Link to="/films">Films & Theatres</Link></li>
                  <li><Link to="/sights">Sights</Link></li>
                </ul>
            </div>
            <Link to="/dashboard/posts" className="settings-btn">
                <MdSettings className="white-cog" />
            </Link>
          </div>
        );
    }
}

NavBar.propTypes = {
  title: PropTypes.string
};

NavBar.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
