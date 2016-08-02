import React, { PropTypes, Component } from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class MainPageNews extends Component {

  constructor() {
    super();
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

render() {
  const { post } = this.props;
  return (
    <div className="container top-space">
      <Card>
        <CardHeader title={post.creator} subtitle={post.role} avatar="http://lorempixel.com/100/100/nature/"/>
        <CardMedia className="media-overlay">
          <img src={post.cover}/>
        </CardMedia>
        <CardTitle title={post.title} subtitle={post.subtitle}/>
        <CardText>
          {post.shortText}
        </CardText>
        <CardActions>
          <FlatButton label="Read more"/>
        </CardActions>
      </Card>
    </div>
  );
}
}

MainPageNews.propTypes = {
  post: PropTypes.object.isRequired
};


MainPageNews.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
