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
  Images, uploadImg,
  User
} from '../../../api';


class SinglePost extends Component {

constructor(props) {
  super(props);
  this.state = { ImageId: undefined, url: _.get(props.post, 'cover') };
}


getChildContext() {
  return { muiTheme: getMuiTheme(baseTheme) };
}

componentWillReceiveProps(nextProps) {
  if(this.props !== nextProps) {
    this.state = { ImageId: undefined, url: nextProps.post.cover };
  }
}

uploadFile(ev) {
  ev.preventDefault();
  console.log("sadadad");
  let reader = new FileReader();
  let file = ev.target.files[0];
  let self = this;

  console.log("THIS: ", this);
  reader.onloadend = function(event) {
    console.log("EEEVEENT", event);
    self.setState({
      file: file,
      url: this.result
    });
  };

  reader.readAsDataURL(ev.target.files[0]);
  // const fileM = uploadImg(new FS.File(file), User.id());
  // if(fileM) {
  //   this.setState({ ImageId: fileM._id });
  // }
}

renderFileUpload() {
  return(
    <div className="postCover">
       <input type="file" placeholder="Load files"
                          onChange={this.uploadFile.bind(this)}
                          className="fileU" />
       <Progress id={this.state.ImageId} />
    </div>
  );
}

changePostTexts(textType, ev) {
  let textValue = ev.target.value;
  switch (textType) {
    case 'title':
      this.setState({title: textValue});
      break;
    case 'subtitle':
      this.setState({subtitle: textValue});
      break;
    case 'text':
      this.setState({text: textValue});
      break;
    default: console.log(":)");
  }
}

saveChanges() {

}

renderContent() {
  const { post } = this.props;
  const { url } = this.state;
  return (
      <div style={{paddingTop: 8, paddingBottom: 8}}>
        <Card>
          <CardHeader children={<span className="go-back" onClick={() => this.props.history.goBack()}><MdArrowBack /></span>}/>
          <CardMedia className="media-overlay">
            <img style={{height: 110}} src={url}/>
            {this.renderFileUpload.bind(this)()}
          </CardMedia>
          <CardText>
            <b>Post title</b>:
            <input type="text" placeholder="Enter post title"
                               defaultValue={post.title}
                               onChange={this.changePostTexts.bind(this, 'title')} />
            <b>Post subtitle</b>:
            <input type="text" placeholder="Enter post subtitle"
                               defaultValue={post.subtitle}
                               onChange={this.changePostTexts.bind(this, 'subtitle')} />
            <b>Post text</b>:
            <input type="text" placeholder="Enter post text"
                               defaultValue={post.shortText}
                               onChange={this.changePostTexts.bind(this, 'text')} />
          </CardText>
          <CardActions>
            <RaisedButton labelColor="white" className="save"
                          label="Save changes"
                          onClick={this.saveChanges.bind(this)} />
            <RaisedButton labelColor="white" className="discard"
                          label="Discard changes"
                          onClick={() => this.props.history.goBack()} />
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
