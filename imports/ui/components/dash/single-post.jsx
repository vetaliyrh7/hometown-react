import React, { PropTypes, Component } from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import _ from 'lodash';
import { Tracker } from 'meteor/tracker';
import Progress from './ProgressBar.jsx';

import { FS } from 'meteor/cfs:base-package';

import {
  Posts,
  Images, uploadImg
} from '../../../api';


class SinglePost extends Component {

constructor(props) {
  super(props);
  console.log("DATA", props);
  this.state = { ImageId: undefined };
}

getChildContext() {
  return { muiTheme: getMuiTheme(baseTheme) };
}

uploadFile(ev) {
  ev.preventDefault();
  let reader = new FileReader();
  let file = ev.target.files[0];

  const fileM = uploadImg(new FS.File(file));
  // console.log(Images.find().fetch());
  if(fileM) {
    this.setState({ ImageId: fileM._id });
  }

 //  const res = Images.findOne(fileM._id);
 // console.log(res , res.isUploaded());

  // setInterval(() => {
  //   console.log(res.isUploaded());
  // }, 100);

  // Tracker.autorun(function(c) {
  //
  // });

  // reader.onload = () => {
  //
  //
  //   this.setState({
  //     file: file,
  //     imagePreviewUrl: reader.result
  //   });
  // };
  //
  //   reader.readAsDataURL(file);
}

handleSubmit(ev) {
    ev.preventDefault();
    const { file } = this.state;
    console.log("STATE", file);
    uploadImg('shit', file);
}

renderContent() {
  const { post } = this.props;

  console.log(this.state.ImageId)
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
            <br />
            <form onSubmit={this.handleSubmit.bind(this)}>
               <input type="file" placeholder="Load files" onChange={this.uploadFile.bind(this)} />
               <button type="submit" onClick={this.handleSubmit.bind(this)}>Upload Image</button>
            </form>
            <Progress id={this.state.ImageId} />
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
    Meteor.subscribe('images');
    const loaded = posts.ready();

    const { postID } = SinglePost.params;

    return {
      post: Posts.findOne({_id: postID}),
      loaded: loaded
    };
}, SinglePost);
