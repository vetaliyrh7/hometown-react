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

import {
  Posts,
  Images, uploadImg
} from '../../../api/';


class ProgressBar extends Component {

constructor(props) {
  super(props);
  console.log("DATA", props);
}

renderContent() {
  const { image } = this.props;

  if(image) {
      console.log('image >>', image.isUploaded(), image.uploadProgress());
  }


  return (
      <div>
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

ProgressBar.propTypes = {

};


export default createContainer(({id}) => {
    Meteor.subscribe('images');

    // console.log(id);

    return {
      images: Images.find().fetch(),
      image: Images.findOne(id),
      loaded: true
    };
}, ProgressBar);
