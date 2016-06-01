import React, { PropTypes, Component } from "react";
import { browserHistory } from 'react-router';

export default class NavBar extends Component {

  constructor() {
    super();
  }

  render() {
    return(
      <div className="main-navigation blue lighten-1 z-depth-2">
        <span className="title">{this.props.title}</span>
        <div className="nav-list blue">
            <ul className="nav-bar">
              <li><a onClick={() => browserHistory.push("/")}>Main</a></li>
              <li><a onClick={() => browserHistory.push("/education")}>Education</a></li>
              <li><a onClick={() => browserHistory.push("/films")}>Films & Theatres</a></li>
              <li><a onClick={() => browserHistory.push("/sights")}>Sights</a></li>
            </ul>
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  title: PropTypes.string
};
