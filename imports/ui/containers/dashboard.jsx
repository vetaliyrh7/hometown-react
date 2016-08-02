import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory, Link } from 'react-router';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import _ from 'lodash';
// Theme components
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// CUSTOM COMPONENTS
import MainPageNews from '../components/main-page/main-page-news.jsx';

export default class Dashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {
        activeLink: 'Posts',
        links: [
            {
                name: 'Posts',
                link: '/dashboard/posts'
            },
            {
                name: 'Users',
                link: '/dashboard/users'
            },
            {
                name: 'Theme Settings',
                link: '/dashboard/theme'
            },
            {
                name: 'My Account',
                link: '/dashboard/my-account'
            }
        ]
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  moveToLink(linkObj) {
      this.setState({
          activeLink: linkObj.name
      });
      browserHistory.push(linkObj.link);
  }

  renderLinks(link, index) {
      const { activeLink } = this.state;
      const isActive = activeLink === link.name ? 'isActive light-blue darken-4' : '';
      return(
         <ListItem key={index} primaryText={link.name} className={`white-text ${isActive}`} onClick={this.moveToLink.bind(this, link)} />
     );
  }

  render() {
    const { links } = this.state;
    return (
      <div className='main-page paddinged'>
        <div className="row card-type light-blue darken-2">
              <div className="col s4 m2 l2 rounded-box no-padding">
                    <List>
                        {_.map(links, this.renderLinks.bind(this))}
                    </List>
              </div>

              <div className="col s8 m10 l10 white">
                  {this.props.children}
              </div>
        </div>
      </div>
    );
  }
}

Dashboard.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
