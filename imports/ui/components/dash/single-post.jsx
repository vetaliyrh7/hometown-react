import React, { PropTypes, Component } from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
  Posts
} from '../../../api';


class SinglePost extends Component {

  constructor(props) {
    super(props);
    console.log("DATA", props);

  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

renderContent() {
  const { post } = this.props;
  return (
      <div style={{paddingTop: 8, paddingBottom: 8}}>
        <Card>
          <CardHeader children={<span className="go-back" onClick={() => this.props.history.goBack()}><MdArrowBack /></span>}/>
          <CardMedia className="media-overlay">
            <img style={{height: 110}} src={post.cover}/>
          </CardMedia>
          <CardTitle title={post.title} subtitle={post.subtitle}/>
          <CardText>
            {post.shortText}
          </CardText>
          <CardActions>
            <RaisedButton labelColor="white" className="save" label="Save changes" />
            <RaisedButton labelColor="white" className="discard" label="Discard changes" />
          </CardActions>
        </Card>
      </div>
    );
  }
  render() {
     return this.props.loaded
         ? this.renderContent()
         : <div className="container center-align spinned">
               <CircularProgress size={1} />
           </div>;
   }
}

SinglePost.propTypes = {
  post: PropTypes.object,
  loaded: PropTypes.bool
};


SinglePost.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default createContainer((SinglePost) => {
    const posts = Meteor.subscribe('posts');
    const loaded = posts.ready();

    const { postID } = SinglePost.params;

    return {
      post: Posts.findOne({_id: postID}),
      loaded: loaded
    };
}, SinglePost);
